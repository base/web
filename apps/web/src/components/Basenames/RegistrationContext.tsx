'use client';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import {
  DiscountData,
  findFirstValidDiscount,
  useAggregatedDiscountValidators,
} from 'apps/web/src/hooks/useAggregatedDiscountValidators';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { useRegisterNameCallback } from 'apps/web/src/hooks/useRegisterNameCallback';
import { Discount, formatBaseEthDomain, isValidDiscount } from 'apps/web/src/utils/usernames';
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
  useRef,
  useState,
} from 'react';
import { base } from 'viem/chains';
import { useAccount, useReadContract } from 'wagmi';
import { zeroAddress } from 'viem';
import {
  useDiscountedNameRegistrationPrice,
  useNameRegistrationPrice,
} from 'apps/web/src/hooks/useNameRegistrationPrice';
import { BatchCallsStatus } from 'apps/web/src/hooks/useWriteContractsWithLogs';
import { WriteTransactionWithReceiptStatus } from 'apps/web/src/hooks/useWriteContractWithReceipt';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import { Basename } from '@coinbase/onchainkit/identity';

export enum RegistrationSteps {
  Search = 'search',
  Claim = 'claim',
  Pending = 'pending',
  Success = 'success',
  Profile = 'profile',
}

export type RegistrationContextProps = {
  searchInputFocused: boolean;
  setSearchInputFocused: Dispatch<SetStateAction<boolean>>;
  searchInputHovered: boolean;
  setSearchInputHovered: Dispatch<SetStateAction<boolean>>;
  registrationStep: RegistrationSteps;
  setRegistrationStep: Dispatch<SetStateAction<RegistrationSteps>>;
  selectedName: string;
  setSelectedName: Dispatch<SetStateAction<string>>;
  selectedNameFormatted: Basename;
  years: number;
  setYears: Dispatch<SetStateAction<number>>;
  redirectToProfile: () => void;
  loadingDiscounts: boolean;
  discount: DiscountData | undefined;
  allActiveDiscounts: Set<Discount>;
  reverseRecord: boolean;
  setReverseRecord: Dispatch<SetStateAction<boolean>>;
  hasExistingBasename: boolean;
  registerNameIsPending: boolean;
  registerNameError: unknown;
  registerName: () => Promise<void>;
  code: string | undefined;
};

export const RegistrationContext = createContext<RegistrationContextProps>({
  searchInputFocused: false,
  searchInputHovered: false,
  registrationStep: RegistrationSteps.Search,
  selectedName: '',
  selectedNameFormatted: '.base.eth',
  setSearchInputFocused: function () {
    return undefined;
  },
  setSearchInputHovered: function () {
    return undefined;
  },
  setRegistrationStep: function () {
    return undefined;
  },
  setSelectedName: function () {
    return undefined;
  },
  redirectToProfile: function () {
    return undefined;
  },
  years: 1,
  setYears: function () {
    return undefined;
  },
  loadingDiscounts: true,
  discount: undefined,
  allActiveDiscounts: new Set(),
  registerName: function () {
    return undefined;
  },
});

type RegistrationProviderProps = {
  children?: ReactNode;
  code?: string;
};

// Maybe not the best place for this
export const registrationTransitionDuration = 'duration-700';

export default function RegistrationProvider({ children, code }: RegistrationProviderProps) {
  // Wallet
  const { address } = useAccount();

  // UI state
  const [searchInputFocused, setSearchInputFocused] = useState<boolean>(false);
  const [searchInputHovered, setSearchInputHovered] = useState<boolean>(false);
  const [selectedName, setSelectedName] = useState<string>('');
  const [registrationStep, setRegistrationStep] = useState<RegistrationSteps>(
    RegistrationSteps.Search,
  );

  // If user has a basename, reverse record is set to false
  const { refetch: refetchBaseEnsName } = useBaseEnsName({
    address,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [registrationStep]);

  const { basenameChain } = useBasenameChain();
  const router = useRouter();

  // Analytics
  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();

  // Username discount states
  const { data: discounts, loading: loadingDiscounts } = useAggregatedDiscountValidators(code);
  const discount = findFirstValidDiscount(discounts);

  const selectedNameFormatted = useMemo(
    () => formatBaseEthDomain(selectedName, basenameChain.id),
    [basenameChain.id, selectedName],
  );

  const allActiveDiscounts = useMemo(
    () =>
      new Set(
        Object.keys(discounts)
          .filter(isValidDiscount)
          .map((key) => Discount[key]),
      ),
    [discounts],
  );

  const profilePath = useMemo(() => {
    if (basenameChain.id === base.id) {
      return `name/${selectedName}`;
    } else {
      return `name/${selectedNameFormatted}`;
    }
  }, [basenameChain.id, selectedName, selectedNameFormatted]);

  const redirectToProfile = useCallback(async () => {
    router.push(profilePath);
  }, [profilePath, router]);

  const [years, setYears] = useState(1);

  // Has already registered with discount
  const { data: hasRegisteredWithDiscount } = useReadContract({
    abi: RegistrarControllerABI,
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESSES[basenameChain.id],
    functionName: 'discountedRegistrants',
    args: [address ?? zeroAddress],
  });

  const { data: discountedPrice } = useDiscountedNameRegistrationPrice(
    selectedName,
    years,
    discount?.discountKey,
  );

  const { data: initialPrice } = useNameRegistrationPrice(selectedName, years);

  const price = hasRegisteredWithDiscount ? initialPrice : discountedPrice ?? initialPrice;

  // Registration time
  const {
    callback: registerName,
    isPending: registerNameIsPending,
    error: registerNameError,
    reverseRecord,
    setReverseRecord,
    hasExistingBasename,
    batchCallsStatus,
    registerNameStatus,
  } = useRegisterNameCallback(
    selectedName,
    price,
    years,
    hasRegisteredWithDiscount ? undefined : discount?.discountKey,
    hasRegisteredWithDiscount ? undefined : discount?.validationData,
  );

  // Move from search to claim
  useEffect(() => {
    if (registrationStep === RegistrationSteps.Search && selectedName.length) {
      setRegistrationStep(RegistrationSteps.Claim);
    }
  }, [registrationStep, selectedName.length]);

  // transaction with paymaster
  useEffect(() => {
    if (batchCallsStatus === BatchCallsStatus.Approved) {
      setRegistrationStep(RegistrationSteps.Pending);
    }
    if (batchCallsStatus === BatchCallsStatus.Success) {
      setRegistrationStep(RegistrationSteps.Success);
    }
  }, [batchCallsStatus, setRegistrationStep]);

  // transaction without paymaster
  useEffect(() => {
    if (registerNameStatus === WriteTransactionWithReceiptStatus.Approved) {
      setRegistrationStep(RegistrationSteps.Pending);
    }

    if (registerNameStatus === WriteTransactionWithReceiptStatus.Success) {
      setRegistrationStep(RegistrationSteps.Success);
    }
  }, [registerNameStatus, setRegistrationStep]);

  // Refetch name on success
  useEffect(() => {
    if (registrationStep === RegistrationSteps.Success) {
      refetchBaseEnsName().catch((error) => logError(error, 'Failed to refetch Basename'));
      router.prefetch(profilePath);
    }
  }, [logError, profilePath, refetchBaseEnsName, registrationStep, router]);

  // On registration success with discount code: mark as consumed
  const hasRun = useRef(false);

  useEffect(() => {
    const consumeDiscountCode = async () => {
      if (
        !hasRun.current &&
        registrationStep === RegistrationSteps.Success &&
        code &&
        discount &&
        discount.discount === Discount.DISCOUNT_CODE
      ) {
        hasRun.current = true;
        const response = await fetch('/api/proofs/discountCode/consume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to record discount code consumption');
        }
      }
    };

    consumeDiscountCode().catch((error) => {
      logError(error, 'Error recording discount code consumption');
      hasRun.current = false;
    });
  }, [discount, code, registrationStep, logError]);

  // Log user moving through the flow
  useEffect(() => {
    logEventWithContext(`step_${registrationStep}`, ActionType.change);
  }, [logEventWithContext, registrationStep]);

  // Log user selecting a name
  useEffect(() => {
    if (!selectedName) return;
    logEventWithContext('selected_name', ActionType.change);
  }, [logEventWithContext, selectedName]);

  const values = useMemo(() => {
    return {
      searchInputFocused,
      searchInputHovered,
      setSearchInputFocused,
      setSearchInputHovered,
      selectedName,
      selectedNameFormatted,
      setSelectedName,
      registrationStep,
      setRegistrationStep,
      redirectToProfile,
      loadingDiscounts,
      discount,
      allActiveDiscounts,
      years,
      setYears,
      reverseRecord,
      setReverseRecord,
      hasExistingBasename,
      registerNameIsPending,
      registerNameError,
      registerName,
      code,
    };
  }, [
    searchInputFocused,
    searchInputHovered,
    selectedName,
    selectedNameFormatted,
    registrationStep,
    redirectToProfile,
    loadingDiscounts,
    discount,
    allActiveDiscounts,
    years,
    reverseRecord,
    setReverseRecord,
    hasExistingBasename,
    registerNameIsPending,
    registerNameError,
    registerName,
    code,
  ]);

  return <RegistrationContext.Provider value={values}>{children}</RegistrationContext.Provider>;
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
