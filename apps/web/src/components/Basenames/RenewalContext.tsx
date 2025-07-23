'use client';

import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { useRenewNameCallback } from 'apps/web/src/hooks/useRenewNameCallback';
import { BatchCallsStatus } from 'apps/web/src/hooks/useWriteContractsWithLogs';
import { WriteTransactionWithReceiptStatus } from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { formatBaseEthDomain, getBasenameNameExpires } from 'apps/web/src/utils/usernames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useRouter } from 'next/navigation';
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
import { base } from 'viem/chains';

export enum RenewalSteps {
  Form = 'form',
  Pending = 'pending',
  Success = 'success',
}

type RenewalContextType = {
  // UI state
  renewalStep: RenewalSteps;
  setRenewalStep: Dispatch<SetStateAction<RenewalSteps>>;

  // Name data
  name: string;
  formattedName: string;
  expirationDate?: string;

  // Form state
  years: number;
  setYears: Dispatch<SetStateAction<number>>;

  // Transaction state
  renewBasename: () => Promise<void>;
  price?: bigint;
  isPending: boolean;

  // Navigation
  redirectToProfile: () => Promise<void>;
};

const RenewalContext = createContext<RenewalContextType | undefined>(undefined);

export function useRenewal(): RenewalContextType {
  const context = useContext(RenewalContext);
  if (!context) {
    throw new Error('useRenewal must be used within a RenewalProvider');
  }
  return context;
}

type RenewalProviderProps = {
  children: ReactNode;
  name: string;
};

export default function RenewalProvider({ children, name }: RenewalProviderProps) {
  const [renewalStep, setRenewalStep] = useState<RenewalSteps>(RenewalSteps.Form);
  const [years, setYears] = useState<number>(1);
  const [expirationDate, setExpirationDate] = useState<string | undefined>(undefined);

  const { basenameChain } = useBasenameChain();
  const router = useRouter();
  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();

  const formattedName = useMemo(
    () => formatBaseEthDomain(name, basenameChain.id),
    [name, basenameChain.id],
  );

  // Profile navigation - follow same pattern as RegistrationContext
  const profilePath = useMemo(() => {
    if (basenameChain.id === base.id) {
      return `/name/${name}`;
    } else {
      return `/name/${formattedName}`;
    }
  }, [basenameChain.id, name, formattedName]);

  const redirectToProfile = useCallback(async () => {
    router.push(profilePath);
  }, [profilePath, router]);

  const {
    callback: renewBasename,
    value: price,
    isPending,
    renewNameStatus,
    batchCallsStatus,
  } = useRenewNameCallback({
    name,
    years,
  });

  const fetchExpirationDate = useCallback(async () => {
    try {
      const expiresAt = await getBasenameNameExpires(formattedName);
      if (expiresAt) {
        const date = new Date(Number(expiresAt) * 1000);
        const formatted = date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        });
        setExpirationDate(formatted);
      }
    } catch (error) {
      logError(error, 'Failed to fetch basename expiration date');
    }
  }, [formattedName, logError]);

  useEffect(() => {
    if (batchCallsStatus === BatchCallsStatus.Approved) {
      setRenewalStep(RenewalSteps.Pending);
    }
    if (batchCallsStatus === BatchCallsStatus.Success) {
      setRenewalStep(RenewalSteps.Success);
    }
  }, [batchCallsStatus]);

  useEffect(() => {
    if (renewNameStatus === WriteTransactionWithReceiptStatus.Approved) {
      setRenewalStep(RenewalSteps.Pending);
    }
    if (renewNameStatus === WriteTransactionWithReceiptStatus.Success) {
      setRenewalStep(RenewalSteps.Success);
    }
  }, [renewNameStatus]);

  useEffect(() => {
    if (renewalStep === RenewalSteps.Success) {
      router.prefetch(profilePath);
      void fetchExpirationDate();
    }
  }, [renewalStep, router, profilePath, fetchExpirationDate]);

  useEffect(() => {
    logEventWithContext(`renewal_step_${renewalStep}`, ActionType.change);
  }, [logEventWithContext, renewalStep]);

  useEffect(() => {
    void fetchExpirationDate();
  }, [fetchExpirationDate]);

  const value: RenewalContextType = {
    renewalStep,
    setRenewalStep,
    name,
    formattedName,
    expirationDate,
    years,
    setYears,
    renewBasename,
    price,
    isPending,
    redirectToProfile,
  };

  return <RenewalContext.Provider value={value}>{children}</RenewalContext.Provider>;
}
