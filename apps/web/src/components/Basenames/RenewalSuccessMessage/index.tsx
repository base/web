import { useAnalytics } from 'apps/web/contexts/Analytics';
import { ButtonVariants } from 'apps/web/src/components/Button/Button';
import SuccessMessage, {
  SuccessAction,
} from 'apps/web/src/components/Basenames/shared/SuccessMessage';
import { useRenewal, RenewalSteps } from 'apps/web/src/components/Basenames/RenewalContext';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export default function RenewalSuccessMessage() {
  const { redirectToProfile, setRenewalStep, expirationDate } = useRenewal();
  const { logEventWithContext } = useAnalytics();
  const router = useRouter();

  const goToProfileOnClick = useCallback(() => {
    logEventWithContext('renewal_go_to_profile', ActionType.click);
    redirectToProfile();
  }, [logEventWithContext, redirectToProfile]);

  const manageNamesOnClick = useCallback(() => {
    logEventWithContext('renewal_manage_names', ActionType.click);
    router.push('/names');
  }, [logEventWithContext, router]);

  const renewAgainOnClick = useCallback(() => {
    logEventWithContext('renewal_extend_again', ActionType.click);
    setRenewalStep(RenewalSteps.Form);
  }, [logEventWithContext, setRenewalStep]);

  const actions: SuccessAction[] = useMemo(
    () => [
      {
        label: 'View Profile',
        onClick: goToProfileOnClick,
        isPrimary: true,
      },
      {
        label: 'Extend Again',
        onClick: renewAgainOnClick,
        variant: ButtonVariants.Secondary,
      },
      {
        label: 'Manage Names',
        onClick: manageNamesOnClick,
        variant: ButtonVariants.Secondary,
      },
    ],
    [goToProfileOnClick, renewAgainOnClick, manageNamesOnClick],
  );

  const subtitle = useMemo(() => {
    if (expirationDate) {
      return `Your name is now extended until ${expirationDate}`;
    }
    return 'Your registration has been successfully extended!';
  }, [expirationDate]);

  return <SuccessMessage title="Extension Complete!" subtitle={subtitle} actions={actions} />;
}
