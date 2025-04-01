'use client';
import {
  fallbackFrameContext,
  FarcasterFrameContext,
  OnSignatureFunc,
  OnTransactionFunc,
  SignerStateInstance,
} from '@frames.js/render';
import { useAnonymousIdentity, type AnonymousSigner } from '@frames.js/render/identity/anonymous';
import {
  FarcasterSignerInstance,
  useFarcasterFrameContext,
  useFarcasterIdentity,
} from '@frames.js/render/identity/farcaster';
import { useFrame } from '@frames.js/render/use-frame';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import useBasenameChain, { isBasenameSupportedChain } from 'apps/web/src/hooks/useBasenameChain';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useBoolean } from 'usehooks-ts';
import { EstimateGasExecutionError, namehash } from 'viem';
import { useAccount, useChainId, useConfig, useWriteContract } from 'wagmi';
import { sendTransaction, signTypedData, switchChain } from 'wagmi/actions';

export class InvalidChainIdError extends Error {}
export class CouldNotChangeChainError extends Error {}

function isValidChainId(id: string): boolean {
  return id.startsWith('eip155:');
}

export function parseChainId(id: string): number {
  if (!isValidChainId(id)) {
    throw new InvalidChainIdError(`Invalid chainId ${id}`);
  }

  return parseInt(id.split('eip155:')[1]);
}

function removeUrl(urls: string, urlSubstringToRemove: string): string {
  const urlArray = urls.split('|');
  const filteredUrls = urlArray.filter((url) => !url.includes(urlSubstringToRemove));
  return filteredUrls.filter(Boolean).join('|');
}

export type FrameContextValue = {
  currentWalletIsProfileOwner?: boolean;
  frameUrlRecord: string;
  frameConfig: Omit<
    Parameters<typeof useFrame>[0],
    'homeframeUrl' | 'signerState' | 'frameContext'
  > & {
    frameContext: FarcasterFrameContext;
    isConnectModalOpen: boolean;
    closeConnectModal: () => void;
  };
  farcasterSignerState: FarcasterSignerInstance;
  anonSignerState: SignerStateInstance<AnonymousSigner>;
  showFarcasterQRModal: boolean;
  pendingFrameChange: boolean;
  setShowFarcasterQRModal: (b: boolean) => void;
  setFrameRecord: (url: string) => Promise<`0x${string}` | undefined>;
  frameUrls: string[];
  addFrame: (url: string) => Promise<`0x${string}` | undefined>;
  removeFrame: (url: string) => Promise<`0x${string}` | undefined>;
  existingTextRecordsIsLoading: boolean;
};

export const FrameContext = createContext<FrameContextValue | null>(null);

export const useFrameContext = () => {
  const context = useContext(FrameContext);
  if (!context) {
    throw new Error('useFrameContext must be used within a FramesProvider');
  }
  return context;
};

type FramesProviderProps = {
  children: React.ReactNode;
};

export function FramesProvider({ children }: FramesProviderProps) {
  const [showFarcasterQRModal, setShowFarcasterQRModal] = useState(false);
  const { logEventWithContext } = useAnalytics();
  const { address } = useAccount();
  const { logError } = useErrors();
  const { profileUsername, currentWalletIsProfileOwner } = useUsernameProfile();
  const { existingTextRecords, existingTextRecordsIsLoading, refetchExistingTextRecords } =
    useReadBaseEnsTextRecords({
      username: profileUsername,
      refetchInterval: currentWalletIsProfileOwner ? 1000 * 5 : Infinity,
    });

  const frameUrlRecord = existingTextRecords[UsernameTextRecordKeys.Frames];

  const { frameContext: farcasterFrameContext } = useFarcasterFrameContext({
    fallbackContext: fallbackFrameContext,
  });

  const anonSignerState = useAnonymousIdentity();
  const farcasterSignerState = useFarcasterIdentity({
    signerUrl: '/frames/signer',
    onMissingIdentity() {
      logEventWithContext('basename_profile_frame_farcaster_sign_in_rendered', ActionType.render);
      setShowFarcasterQRModal(true);
    },
  });

  const currentChainId = useChainId();
  const config = useConfig();
  const { value: isConnectModalOpen, setTrue: openConnectModal, setFalse: closeConnectModal } = useBoolean();

  const onTransaction: OnTransactionFunc = useCallback(
    async ({ transactionData, frame }) => {
      if (!address) {
        openConnectModal?.();
        return null;
      }

      const { params, chainId } = transactionData;
      const requestedChainId = parseChainId(chainId);
      try {
        if (currentChainId !== requestedChainId) {
          await switchChain(config, {
            chainId: requestedChainId,
          }).catch((e) => {
            throw new CouldNotChangeChainError(e.message as string);
          });
        }

        const transactionId = await sendTransaction(config, {
          to: params.to,
          data: params.data,
          value: BigInt(params.value ?? 0),
        });
        logEventWithContext('basename_profile_frame_transacted', ActionType.process, {
          context: frame.postUrl ?? frame.title,
        });
        return transactionId;
      } catch (error) {
        if (error instanceof InvalidChainIdError) {
          logEventWithContext('basename_profile_frame_invalid_chain_id', ActionType.error);
        } else if (error instanceof CouldNotChangeChainError) {
          logEventWithContext('basename_profile_frame_could_not_change_chain', ActionType.error);
        } else if (error instanceof EstimateGasExecutionError) {
          logEventWithContext('basename_profile_frame_insufficient_funds', ActionType.error);
        } else {
          logError(error, `${frame.postUrl ?? frame.title} failed to complete a frame transaction`);
        }

        // intentional re-throw to be caught by individual frames
        throw error;
      }
    },
    [address, config, currentChainId, openConnectModal, logEventWithContext, logError],
  );
  const onError = useCallback(
    (e: Error) => {
      logError(e, 'frame error');
    },
    [logError],
  );
  const onSignature: OnSignatureFunc = useCallback(
    async ({ signatureData, frame }) => {
      if (!address) {
        openConnectModal?.();
        return null;
      }

      try {
        const { params, chainId } = signatureData;
        const requestedChainId = parseChainId(chainId);

        if (currentChainId !== requestedChainId) {
          await switchChain(config, {
            chainId: requestedChainId,
          }).catch((e) => {
            throw new CouldNotChangeChainError(e.message as string);
          });
        }

        return await signTypedData(config, params);
      } catch (error) {
        logError(error, `${frame.postUrl ?? frame.title} failed to sign frame data`);
        // intentional re-throw to be caught by individual frames
        throw error;
      }
    },
    [address, openConnectModal, currentChainId, config, logError],
  );

  const { writeContractAsync, isPending: pendingFrameChange } = useWriteContract();
  const { basenameChain } = useBasenameChain(profileUsername);

  const [optimisticFrameUrls, setOptimisticFrameUrls] = useState<string[]>([]);
  useEffect(() => {
    setOptimisticFrameUrls(frameUrlRecord.split('|').filter(Boolean));
  }, [frameUrlRecord]);
  const setFrameRecord = useCallback(
    async (frameUrl: string) => {
      async function doTransaction() {
        if (frameUrl === 'undefined') return;
        if (!address) {
          openConnectModal?.();
          return;
        }
        if (!isBasenameSupportedChain(currentChainId)) {
          await switchChain(config, {
            chainId: basenameChain.id,
          }).catch((e) => {
            throw new CouldNotChangeChainError(e.message as string);
          });
        }
        const nameHash = namehash(profileUsername);
        const result = await writeContractAsync({
          abi: L2ResolverAbi,
          chainId: basenameChain.id,
          address: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
          args: [nameHash, UsernameTextRecordKeys.Frames, frameUrl.trim()],
          functionName: 'setText',
        });
        refetchExistingTextRecords().catch((e) => logError(e, 'failed to refetch text records'));
        return result;
      }
      return doTransaction();
    },
    [
      address,
      currentChainId,
      profileUsername,
      writeContractAsync,
      basenameChain.id,
      refetchExistingTextRecords,
      openConnectModal,
      config,
      logError,
    ],
  );

  const removeFrame = useCallback(
    async (url: string) => {
      const newRecord = removeUrl(frameUrlRecord, url);
      logEventWithContext('basename_profile_frame_removed', ActionType.click, {
        context: url,
      });
      setOptimisticFrameUrls(newRecord.split('|').filter(Boolean));
      return setFrameRecord(newRecord);
    },
    [frameUrlRecord, logEventWithContext, setFrameRecord],
  );

  const addFrame = useCallback(
    async (url: string) => {
      const newUrls = [...optimisticFrameUrls, url];
      const newRecord = newUrls.join('|');
      logEventWithContext('basename_profile_frame_posted', ActionType.click, {
        context: url,
      });
      setOptimisticFrameUrls(newUrls);
      return setFrameRecord(newRecord);
    },
    [logEventWithContext, optimisticFrameUrls, setFrameRecord],
  );

  const value = useMemo(
    () => ({
      currentWalletIsProfileOwner,
      frameUrlRecord,
      anonSignerState,
      farcasterSignerState,
      frameConfig: {
        connectedAddress: address,
        frameActionProxy: '/frames',
        frameGetProxy: '/frames',
        onTransaction,
        onError,
        onSignature,
        onConnectWallet: openConnectModal,
        isConnectModalOpen,
        closeConnectModal,
        frameContext: farcasterFrameContext,
      },
      showFarcasterQRModal,
      setShowFarcasterQRModal,
      pendingFrameChange,
      addFrame,
      removeFrame,
      existingTextRecordsIsLoading,
      frameUrls: optimisticFrameUrls,
    }),
    [
      currentWalletIsProfileOwner,
      frameUrlRecord,
      anonSignerState,
      farcasterSignerState,
      address,
      onTransaction,
      onError,
      onSignature,
      openConnectModal,
      farcasterFrameContext,
      showFarcasterQRModal,
      pendingFrameChange,
      addFrame,
      removeFrame,
      existingTextRecordsIsLoading,
      optimisticFrameUrls,
      isConnectModalOpen,
      closeConnectModal,
    ],
  );

  return <FrameContext.Provider value={value}>{children}</FrameContext.Provider>;
}
