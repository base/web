import { useEffect, useMemo, useState } from 'react';
import { Address, ReadContractErrorType, encodeAbiParameters } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { useErrors } from 'apps/web/contexts/Errors';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { Discount } from 'apps/web/src/utils/usernames';

export type AttestationData = {
  discountValidatorAddress: Address;
  discount: Discount;
  validationData: `0x${string}` | undefined;
};

type AttestationHookReturns = {
  data: AttestationData | null;
  loading: boolean;
  error: ReadContractErrorType | null;
};

type ProofResponse = {
  proofs?: readonly `0x${string}`[];
  signedMessage?: string;
  discountValidatorAddress: Address;
};

/**
 * Generic hook for attestations that fetch proof from API and validate on-chain
 * 
 * @param processProof - Optional custom proof processor. Should be memoized with useCallback
 *                       if passed as a prop to avoid unnecessary re-renders.
 */
export function useAttestationWithProof(
  apiEndpoint: string,
  discount: Discount,
  validatorAbi: unknown,
  errorContext: string,
  processProof?: (response: ProofResponse | null) => `0x${string}` | undefined,
): AttestationHookReturns {
  const { logError } = useErrors();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [proofResponse, setProofResponse] = useState<ProofResponse | null>(null);
  const { basenameChain } = useBasenameChain();

  useEffect(() => {
    async function fetchProof(a: string) {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('address', a);
        params.append('chain', basenameChain.id.toString());
        const response = await fetch(`${apiEndpoint}?${params}`);
        if (response.ok) {
          const result = (await response.json()) as ProofResponse;
          setProofResponse(result);
        }
      } catch (error) {
        logError(error, errorContext);
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      fetchProof(address).catch((error) => {
        logError(error, errorContext);
      });
    }
    // errorContext is a static string and doesn't need to be in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, apiEndpoint, basenameChain.id, logError]);

  // Default proof processor: encode merkle proofs or use signature
  const defaultProcessProof = (response: ProofResponse | null): `0x${string}` | undefined => {
    if (!response) return undefined;
    if (response.proofs) {
      return encodeAbiParameters([{ type: 'bytes32[]' }], [response.proofs]);
    }
    if (response.signedMessage) {
      return response.signedMessage as `0x${string}`;
    }
    return undefined;
  };

  const validationData = useMemo(
    () => (processProof ?? defaultProcessProof)(proofResponse),
    [proofResponse, processProof],
  );

  const readContractArgs = useMemo(() => {
    if (!proofResponse || !address || !validationData) {
      return {};
    }
    return {
      address: proofResponse.discountValidatorAddress,
      abi: validatorAbi,
      functionName: 'isValidDiscountRegistration',
      args: [address, validationData],
    };
  }, [address, proofResponse, validationData, validatorAbi]);

  const { data: isValid, isLoading, error } = useReadContract(readContractArgs);

  if (isValid && proofResponse && address && validationData) {
    return {
      data: {
        discountValidatorAddress: proofResponse.discountValidatorAddress,
        discount,
        validationData,
      },
      loading: false,
      error: null,
    };
  }
  return { data: null, loading: loading || isLoading, error };
}

/**
 * Generic hook for attestations that only validate on-chain (no API call)
 */
export function useAttestationWithoutProof(
  discountValidatorAddress: Address | undefined,
  discount: Discount,
  validatorAbi: unknown,
): AttestationHookReturns {
  const { address } = useAccount();

  const readContractArgs = useMemo(() => {
    if (!address || !discountValidatorAddress) {
      return {};
    }
    return {
      address: discountValidatorAddress,
      abi: validatorAbi,
      functionName: 'isValidDiscountRegistration',
      args: [address, '0x0'],
    };
  }, [address, discountValidatorAddress, validatorAbi]);

  const { data: isValid, isLoading, error } = useReadContract(readContractArgs);

  if (isValid && address && discountValidatorAddress) {
    return {
      data: {
        discountValidatorAddress,
        discount,
        validationData: '0x0' as `0x${string}`,
      },
      loading: false,
      error: null,
    };
  }
  return { data: null, loading: isLoading, error };
}
