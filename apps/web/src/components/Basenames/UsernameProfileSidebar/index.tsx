import { useAnalytics } from 'apps/web/contexts/Analytics';
import { UsernamePill } from 'apps/web/src/components/Basenames/UsernamePill';
import { UsernamePillVariants } from '../UsernamePill/types';
import UsernameProfileCard from 'apps/web/src/components/Basenames/UsernameProfileCard';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileKeywords from 'apps/web/src/components/Basenames/UsernameProfileKeywords';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { buildBasenameReclaimContract, UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { ActionType } from 'apps/web/src/utils/analytics/logEvent';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useWriteContractWithReceipt, {
  WriteTransactionWithReceiptStatus,
} from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { useErrors } from 'apps/web/contexts/Errors';

export default function UsernameProfileSidebar() {
  const {
    profileUsername,
    profileAddress,
    currentWalletIsProfileEditor,
    showProfileSettings,
    setShowProfileSettings,
    profileRefetch,
    currentWalletNeedsToReclaimProfile,
  } = useUsernameProfile();

  const { address } = useAccount();
  const { basenameChain } = useBasenameChain(profileUsername);
  const { logError } = useErrors();
  const { logEventWithContext } = useAnalytics();

  const toggleSettings = useCallback(() => {
    if (!currentWalletIsProfileEditor) return;
    logEventWithContext('profile_edit_modal_open', ActionType.render);
    setShowProfileSettings(!showProfileSettings);
  }, [
    currentWalletIsProfileEditor,
    logEventWithContext,
    setShowProfileSettings,
    showProfileSettings,
  ]);

  const { existingTextRecords } = useReadBaseEnsTextRecords({
    username: profileUsername,
  });

  const reclaimContract = useMemo(() => {
    if (!currentWalletNeedsToReclaimProfile) return;
    if (!address) return;
    return buildBasenameReclaimContract(profileUsername, address);
  }, [address, profileUsername, currentWalletNeedsToReclaimProfile]);

  const {
    initiateTransaction: initiateReclaim,
    transactionStatus: reclaimStatus,
    transactionIsLoading: reclaimIsLoading,
  } = useWriteContractWithReceipt({
    chain: basenameChain,
    eventName: 'basename_reclaim',
  });

  const reclaimProfile = useCallback(() => {
    if (!reclaimContract) return;
    initiateReclaim(reclaimContract)
      .then((result) => console.log({ result }))
      .catch((error) => {
        logError(error, 'Failed to reclaim profile');
      });
  }, [initiateReclaim, logError, reclaimContract]);

  useEffect(() => {
    if (reclaimStatus === WriteTransactionWithReceiptStatus.Success) {
      profileRefetch()
        .then()
        .catch((error) => {
          logError(error, 'Failed to refetch profile');
        });
    }
  }, [logError, profileRefetch, reclaimStatus]);

  const textRecordKeywords = existingTextRecords[UsernameTextRecordKeys.Keywords];
  return (
    <aside className="flex flex-col gap-6">
      <UsernamePill
        variant={UsernamePillVariants.Card}
        username={profileUsername}
        address={profileAddress}
      />
      {currentWalletIsProfileEditor && (
        <Button variant={ButtonVariants.Gray} rounded fullWidth onClick={toggleSettings}>
          {showProfileSettings ? 'Back to Profile' : 'Manage Profile'}
        </Button>
      )}
      {currentWalletNeedsToReclaimProfile && (
        <Button
          variant={ButtonVariants.Gray}
          rounded
          fullWidth
          onClick={reclaimProfile}
          isLoading={reclaimIsLoading}
        >
          Claim name
        </Button>
      )}
      <UsernameProfileCard />
      {!!textRecordKeywords && <UsernameProfileKeywords keywords={textRecordKeywords} />}
    </aside>
  );
}
