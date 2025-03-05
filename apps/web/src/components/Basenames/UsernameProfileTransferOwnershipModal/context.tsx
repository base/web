'use client';

import { useErrors } from 'apps/web/contexts/Errors';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useWriteContractWithReceipt, {
  WriteTransactionWithReceiptStatus,
} from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { buildBasenameReclaimContract, getTokenIdFromBasename } from 'apps/web/src/utils/usernames';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ContractFunctionParameters, Hash, isAddress, namehash } from 'viem';
import { useAccount } from 'wagmi';
import L2Resolver from 'apps/web/src/abis/L2Resolver';
import BaseRegistrarAbi from 'apps/web/src/abis/BaseRegistrarAbi';
import ReverseRegistrarAbi from 'apps/web/src/abis/ReverseRegistrarAbi';
import {
  USERNAME_BASE_REGISTRAR_ADDRESSES,
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REVERSE_REGISTRAR_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import useWriteContractsWithLogs, {
  BatchCallsStatus,
} from 'apps/web/src/hooks/useWriteContractsWithLogs';

type ProfileTransferOwnershipProviderProps = {
  children?: ReactNode;
};

export enum OwnershipSteps {
  Search = 'search',
  OwnershipOverview = 'ownership-overview',
  WalletRequests = 'wallet-requests',
  Success = 'success',
}

export type OwnershipSettings = {
  id: 'setAddr' | 'reclaim' | 'setName' | 'safeTransferFrom';
  name: string;
  description: string;
  status: WriteTransactionWithReceiptStatus;
  contractFunction: () => Promise<void>;
};

export type ProfileTransferOwnershipContextProps = {
  ownershipSettings: OwnershipSettings[];
  isSuccess: boolean;
  currentOwnershipStep: OwnershipSteps;
  setCurrentOwnershipStep: Dispatch<SetStateAction<OwnershipSteps>>;
  recipientAddress: string;
  setRecipientAddress: Dispatch<SetStateAction<string>>;
  batchTransactionsEnabled: boolean;
  batchCallsStatus: BatchCallsStatus;
  batchCallsIsLoading: boolean;
  ownershipTransactionHash?: Hash;
};

export const ProfileTransferOwnershipContext = createContext<ProfileTransferOwnershipContextProps>({
  ownershipSettings: [],
  isSuccess: false,
  currentOwnershipStep: OwnershipSteps.Search,
  setCurrentOwnershipStep: () => undefined,
  recipientAddress: '',
  setRecipientAddress: () => undefined,
  batchTransactionsEnabled: false,
  batchCallsStatus: BatchCallsStatus.Idle,
  batchCallsIsLoading: false,
  ownershipTransactionHash: undefined,
});

export default function ProfileTransferOwnershipProvider({
  children,
}: ProfileTransferOwnershipProviderProps) {
  // Hooks
  const { address } = useAccount();
  const { profileUsername, canReclaim, canSafeTransferFrom, canSetAddr } = useUsernameProfile();
  const { basenameChain } = useBasenameChain(profileUsername);
  const { logError } = useErrors();

  // States
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [currentOwnershipStep, setCurrentOwnershipStep] = useState<OwnershipSteps>(
    OwnershipSteps.Search,
  );

  // TODO: Validate that it's not a contract recipient
  const isValidRecipientAddress = isAddress(recipientAddress);
  const tokenId = getTokenIdFromBasename(profileUsername);

  // Contract write calls
  const setAddrContract = useMemo(() => {
    if (!isValidRecipientAddress || !profileUsername) return;

    return {
      abi: L2Resolver,
      address: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
      args: [namehash(profileUsername), recipientAddress],
      functionName: 'setAddr',
    } as ContractFunctionParameters;
  }, [basenameChain.id, isValidRecipientAddress, profileUsername, recipientAddress]);

  const reclaimContract = useMemo(() => {
    if (!tokenId || !isValidRecipientAddress) return;
    return buildBasenameReclaimContract(profileUsername, recipientAddress);
  }, [isValidRecipientAddress, profileUsername, recipientAddress, tokenId]);

  const safeTransferFromContract = useMemo(() => {
    if (!tokenId || !isValidRecipientAddress || !address) return;

    return {
      abi: BaseRegistrarAbi,
      address: USERNAME_BASE_REGISTRAR_ADDRESSES[basenameChain.id],
      args: [address, recipientAddress, tokenId],
      functionName: 'safeTransferFrom',
    } as ContractFunctionParameters;
  }, [address, basenameChain.id, isValidRecipientAddress, recipientAddress, tokenId]);

  const setNameContract = useMemo(() => {
    return {
      abi: ReverseRegistrarAbi,
      address: USERNAME_REVERSE_REGISTRAR_ADDRESSES[basenameChain.id],
      args: [''],
      functionName: 'setName',
    } as ContractFunctionParameters;
  }, [basenameChain.id]);

  // Bundled transaction - Experimental
  const {
    initiateBatchCalls,
    batchCallsEnabled,
    batchCallsStatus,
    batchCallsIsLoading,
    batchCallTransactionHash,
  } = useWriteContractsWithLogs({
    chain: basenameChain,
    eventName: 'basename_send_calls_transfer_ownership',
  });

  // The 4 transactions we got to track
  const {
    initiateTransaction: initiateSafeTransferFrom,
    transactionStatus: safeTransferFromStatus,
    transactionHash: safeTransferFromTransactionHash,
  } = useWriteContractWithReceipt({
    chain: basenameChain,
    eventName: 'basename_safe_transfer_from',
  });

  const { initiateTransaction: initiateReclaim, transactionStatus: reclaimStatus } =
    useWriteContractWithReceipt({
      chain: basenameChain,
      eventName: 'basename_reclaim',
    });

  const { initiateTransaction: initiateSetAddr, transactionStatus: setAddrStatus } =
    useWriteContractWithReceipt({
      chain: basenameChain,
      eventName: 'basename_set_addr',
    });

  const { initiateTransaction: initiateSetName, transactionStatus: setNameStatus } =
    useWriteContractWithReceipt({
      chain: basenameChain,
      eventName: 'basename_set_name',
    });

  // One batched transaction
  const updateViaBatchCalls = useCallback(async () => {
    if (!isValidRecipientAddress) return;
    if (!address) return;
    if (!basenameChain) return;
    if (!batchCallsEnabled) return;
    if (setAddrContract && reclaimContract && safeTransferFromContract && setNameContract) {
      await initiateBatchCalls({
        contracts: [setAddrContract, reclaimContract, safeTransferFromContract, setNameContract],
        account: address,
        chain: basenameChain,
      });
    }
  }, [
    address,
    basenameChain,
    batchCallsEnabled,
    initiateBatchCalls,
    isValidRecipientAddress,
    reclaimContract,
    safeTransferFromContract,
    setAddrContract,
    setNameContract,
  ]);

  // The 4 Function with safety checks
  const updateSetAddr = useCallback(async () => {
    if (!setAddrContract) return Promise.reject('Invalid setAddrContract');
    await initiateSetAddr(setAddrContract);
  }, [initiateSetAddr, setAddrContract]);

  const updateReclaim = useCallback(async () => {
    if (!reclaimContract) return Promise.reject('Invalid reclaimContract');
    await initiateReclaim(reclaimContract);
  }, [initiateReclaim, reclaimContract]);

  const updateSafeTransferFrom = useCallback(async () => {
    if (!safeTransferFromContract) return Promise.reject('Invalid safeTransferFromContract');
    await initiateSafeTransferFrom(safeTransferFromContract);
  }, [initiateSafeTransferFrom, safeTransferFromContract]);

  const updateSetName = useCallback(async () => {
    if (!setNameContract) return Promise.reject('Invalid setNameContract');
    await initiateSetName(setNameContract);
  }, [initiateSetName, setNameContract]);

  // Function & status we can track and display the edit rec
  const ownershipSettings: OwnershipSettings[] = useMemo(() => {
    const settings: OwnershipSettings[] = [];

    if (canSetAddr) {
      settings.push({
        id: 'setAddr',
        name: 'Address record',
        description: 'Your Basename will resolve to this address.',
        status: setAddrStatus,
        contractFunction: updateSetAddr,
      });
      settings.push({
        id: 'setName',
        name: 'Name record',
        description: 'Your Basename will no longer be displayed with your address.',
        status: setNameStatus,
        contractFunction: updateSetName,
      });
    }

    if (canReclaim) {
      settings.push({
        id: 'reclaim',
        name: 'Profile editing',
        description: 'Transfer editing rights to this address.',
        status: reclaimStatus,
        contractFunction: updateReclaim,
      });
    }

    if (canSafeTransferFrom) {
      settings.push({
        id: 'safeTransferFrom',
        name: 'Token ownership',
        description: 'Transfer the Basename token to this address.',
        status: safeTransferFromStatus,
        contractFunction: updateSafeTransferFrom,
      });
    }

    return settings;
  }, [
    canSetAddr,
    canReclaim,
    canSafeTransferFrom,
    setAddrStatus,
    updateSetAddr,
    setNameStatus,
    updateSetName,
    reclaimStatus,
    updateReclaim,
    safeTransferFromStatus,
    updateSafeTransferFrom,
  ]);

  const ownershipSettingsAreWaiting = useMemo(() => {
    return ownershipSettings.every((ownershipSetting) => {
      return [
        WriteTransactionWithReceiptStatus.Idle,
        WriteTransactionWithReceiptStatus.Success,
      ].includes(ownershipSetting.status);
    });
  }, [ownershipSettings]);

  useEffect(() => {
    // Only when the wallet request steps is displaying
    if (currentOwnershipStep !== OwnershipSteps.WalletRequests) return;

    // Some transactions are loading / failed: return early
    if (!ownershipSettingsAreWaiting) return;

    // Smart wallet - we can batch calls
    if (batchCallsEnabled) {
      updateViaBatchCalls().catch((error) => {
        setCurrentOwnershipStep(OwnershipSteps.OwnershipOverview);
        logError(error, 'Failed to update via sendCalls');
      });

      return;
    }

    // For each ownership setting / wallet transaction
    for (const ownershipSetting of ownershipSettings) {
      // Get the current index & previous ownership setting (if any)
      const currentIndex = ownershipSettings.indexOf(ownershipSetting);
      const previousOwnershipSetting = ownershipSettings[currentIndex - 1];

      // If the setting transaction is Idle and either
      // - Is the first transaction
      // - Previous transaction is successful
      const canCallfunction =
        ownershipSetting.status === WriteTransactionWithReceiptStatus.Idle &&
        (currentIndex === 0 ||
          previousOwnershipSetting.status === WriteTransactionWithReceiptStatus.Success);

      // then call the wallet request function
      if (canCallfunction) {
        ownershipSetting.contractFunction().catch((error) => {
          logError(error, `Failed contractFunction for ${ownershipSetting.id}`);
        });
        break;
      }
    }
  }, [
    batchCallsEnabled,
    currentOwnershipStep,
    logError,
    ownershipSettings,
    ownershipSettingsAreWaiting,
    updateViaBatchCalls,
  ]);

  const isSuccess = useMemo(
    () =>
      // Smart wallet: One transaction
      batchCallsStatus === BatchCallsStatus.Success ||
      // Other wallet: 4 Transactions are successful
      (ownershipSettings.length > 0 &&
        ownershipSettings.every(
          (ownershipSetting) =>
            ownershipSetting.status === WriteTransactionWithReceiptStatus.Success,
        )),
    [batchCallsStatus, ownershipSettings],
  );

  useEffect(() => {
    if (isSuccess) {
      setCurrentOwnershipStep(OwnershipSteps.Success);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (batchCallsStatus === BatchCallsStatus.Canceled) {
      setCurrentOwnershipStep(OwnershipSteps.OwnershipOverview);
    }
  }, [batchCallsStatus]);

  // Either the batch call hash or the single NFT transaction hash
  const ownershipTransactionHash = batchCallTransactionHash ?? safeTransferFromTransactionHash;

  const value = useMemo(() => {
    return {
      ownershipSettings,
      isSuccess,
      batchTransactionsEnabled: batchCallsEnabled,
      batchCallsStatus,
      batchCallsIsLoading,
      currentOwnershipStep,
      setCurrentOwnershipStep,
      recipientAddress,
      setRecipientAddress,
      ownershipTransactionHash,
    };
  }, [
    ownershipSettings,
    isSuccess,
    batchCallsEnabled,
    batchCallsStatus,
    batchCallsIsLoading,
    currentOwnershipStep,
    recipientAddress,
    ownershipTransactionHash,
  ]);

  return (
    <ProfileTransferOwnershipContext.Provider value={value}>
      {children}
    </ProfileTransferOwnershipContext.Provider>
  );
}

export function useProfileTransferOwnership() {
  const context = useContext(ProfileTransferOwnershipContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
