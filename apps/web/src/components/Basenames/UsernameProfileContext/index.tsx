'use client';
import { Basename } from '@coinbase/onchainkit/identity';
import { useErrors } from 'apps/web/contexts/Errors';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import {
  buildBasenameOwnerContract,
  buildBasenameEditorContract,
  formatDefaultUsername,
  getBasenameNameExpires,
} from 'apps/web/src/utils/usernames';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Address } from 'viem';
import { useAccount, useEnsAddress, useReadContract } from 'wagmi';

export enum UsernameProfileSteps {}

export type UsernameProfileContextProps = {
  // Profile details
  profileUsername: Basename;
  profileAddress?: Address;

  // Profile owner
  profileEditorAddress?: Address;
  profileOwnerUsername?: Basename;
  profileRefetch: () => Promise<void>;

  // State
  currentWalletIsProfileEditor: boolean;
  currentWalletIsProfileAddress: boolean;

  // Settings
  showProfileSettings: boolean;
  setShowProfileSettings: Dispatch<SetStateAction<boolean>>;

  currentWalletIsProfileOwner: boolean;

  // Expiration
  msUntilExpiration: number | undefined;

  // Permissions
  canSetAddr: boolean;
  canReclaim: boolean;
  canSafeTransferFrom: boolean;
  currentWalletNeedsToReclaimProfile: boolean;
};

export const UsernameProfileContext = createContext<UsernameProfileContextProps>({
  profileUsername: 'default.basetest.eth',
  profileAddress: undefined,
  profileEditorAddress: undefined,
  profileRefetch: async () => undefined,
  currentWalletIsProfileEditor: false,
  currentWalletIsProfileAddress: false,
  showProfileSettings: false,
  setShowProfileSettings: () => undefined,
  currentWalletIsProfileOwner: false,
  msUntilExpiration: undefined,
  canSetAddr: false,
  canReclaim: false,
  canSafeTransferFrom: false,
  currentWalletNeedsToReclaimProfile: false,
});

type UsernameProfileProviderProps = {
  children: ReactNode;
  username: Basename;
};

export default function UsernameProfileProvider({
  children,
  username,
}: UsernameProfileProviderProps) {
  const [showProfileSettings, setShowProfileSettings] = useState<boolean>(false);
  const [msUntilExpiration, setMsUntilExpiration] = useState<number | undefined>(undefined);
  const { basenameChain } = useBasenameChain(username);
  const { logError } = useErrors();

  // Current wallet
  const { address: connectedAddress, isConnected } = useAccount();

  // Profile address
  const {
    data: profileAddress,
    isFetching: profileAddressIsFetching,
    refetch: profileAddressRefetch,
  } = useEnsAddress({
    name: username,
    chainId: basenameChain.id,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
    query: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  // Profile Editor
  const {
    data: profileEditorAddress,
    isFetching: profileEditorAddressIsFetching,
    refetch: profileEditorRefetch,
  } = useReadContract({
    ...buildBasenameEditorContract(username),
    query: { refetchOnWindowFocus: false },
  });

  // Registry Owner Basename
  const { data: profileOwnerUsername } = useBaseEnsName({
    address: profileEditorAddress as Address,
  });

  // Profile Owner
  const {
    data: profileOwnerAddress,
    isFetching: profileOwnerIsFetching,
    refetch: profileOwnerRefetch,
  } = useReadContract({
    ...buildBasenameOwnerContract(username),
    query: { refetchOnWindowFocus: false },
  });

  const currentWalletIsProfileEditor =
    !profileEditorAddressIsFetching && isConnected && connectedAddress === profileEditorAddress;
  const currentWalletIsProfileOwner =
    !profileOwnerIsFetching && isConnected && connectedAddress === profileOwnerAddress;
  const currentWalletIsProfileAddress =
    !profileAddressIsFetching && isConnected && connectedAddress === profileAddress;

  const canSetAddr = currentWalletIsProfileEditor || currentWalletIsProfileOwner;
  const canReclaim = currentWalletIsProfileOwner;
  const canSafeTransferFrom = currentWalletIsProfileOwner;

  // Current wallet is the NFT owner, but not the editor
  const currentWalletNeedsToReclaimProfile =
    canReclaim && !currentWalletIsProfileEditor && currentWalletIsProfileOwner;

  // Check basename expiration
  useEffect(() => {
    const checkExpiration = async () => {
      try {
        const formattedUsername = await formatDefaultUsername(
          decodeURIComponent(username) as Basename,
        );
        const expiresAt = await getBasenameNameExpires(formattedUsername);

        if (expiresAt) {
          const expirationTime = Number(expiresAt) * 1000;
          const currentTime = Date.now();
          const timeUntilExpiration = expirationTime - currentTime;
          setMsUntilExpiration(timeUntilExpiration);
        }
      } catch (error) {
        logError(error, 'Error checking basename expiration');
      }
    };

    void checkExpiration();
  }, [logError, username]);

  const profileRefetch = useCallback(async () => {
    await profileAddressRefetch();
    await profileEditorRefetch();
    await profileOwnerRefetch();
  }, [profileAddressRefetch, profileEditorRefetch, profileOwnerRefetch]);

  const values = useMemo(() => {
    return {
      profileAddress: profileAddress ? profileAddress : undefined,
      profileUsername: username,
      profileEditorAddress: profileEditorAddress ? (profileEditorAddress as Address) : undefined,
      profileOwnerUsername,
      profileRefetch, // for now we refetch both since ownership sets both
      currentWalletIsProfileEditor,
      currentWalletIsProfileOwner,
      currentWalletIsProfileAddress,
      msUntilExpiration,
      canSetAddr,
      canReclaim,
      canSafeTransferFrom,
      showProfileSettings,
      setShowProfileSettings,
      currentWalletNeedsToReclaimProfile,
    };
  }, [
    profileAddress,
    username,
    profileEditorAddress,
    profileOwnerUsername,
    profileRefetch,
    currentWalletIsProfileEditor,
    currentWalletIsProfileOwner,
    currentWalletIsProfileAddress,
    msUntilExpiration,
    canSetAddr,
    canReclaim,
    canSafeTransferFrom,
    showProfileSettings,
    currentWalletNeedsToReclaimProfile,
  ]);

  return (
    <UsernameProfileContext.Provider value={values}>{children}</UsernameProfileContext.Provider>
  );
}

export function useUsernameProfile() {
  const context = useContext(UsernameProfileContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
