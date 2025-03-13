import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { createContext, useCallback, useContext, useEffect } from 'react';
import { base } from 'viem/chains';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { contractABI, contractAddress } from 'apps/web/src/components/BuilderNft/constants';
import logEvent from 'apps/web/src/utils/logEvent';
import { useLocalStorage } from 'usehooks-ts';

class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export type MintStatus =
  | 'disconnected'
  | 'loading-proof'
  | 'not-eligible'
  | 'eligible'
  | 'minting'
  | 'minted'
  | 'mint-error'
  | 'already-minted';

export type MintState = {
  status: MintStatus;
  mint?: () => void;
  error?: Error;
  reset?: () => void;
  txHash?: `0x${string}`;
};

export function useProofQuery(): UseQueryResult<{ result: `0x${string}`[] }> {
  const { address, status } = useAccount();

  return useQuery({
    queryKey: ['proof', address],
    retry: (failureCount: number, error: HttpError) => failureCount < 3 && error.status !== 404,
    queryFn: async () => {
      const response = await fetch(`/api/checkNftProof`, {
        method: 'POST',
        body: JSON.stringify({ address }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new HttpError(response.status, 'Proof lookup failed');
      }

      return response.json();
    },
    enabled: status === 'connected',
  });
}

export function useMintState(): MintState {
  const [, setIsBannerVisible] = useLocalStorage('isNftBannerVisible', true);
  const { status, address } = useAccount();

  const proofQuery = useProofQuery();
  const proof = proofQuery.data?.result;

  const { writeContract, isPending, isSuccess, error, data: txHash, reset } = useWriteContract();

  const { data: hasClaimed } = useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: 'hasClaimed',
    chainId: base.id,
    args: [address as `0x${string}`],
  });

  const mint = useCallback(() => {
    if (contractAddress && proof) {
      writeContract({
        abi: contractABI,
        address: contractAddress,
        functionName: 'mint',
        args: [proof],
        chainId: base.id,
      });
    }
  }, [proof, writeContract]);

  useEffect(() => {
    if (address) {
      setIsBannerVisible(false);
    }
  }, [address, setIsBannerVisible]);
  useEffect(() => {
    if (isSuccess) {
      logEvent('builder_nft_minted', { address });
    }
  }, [isSuccess, address]);
  useEffect(() => {
    if (proofQuery.isError) {
      logEvent('builder_nft_ineligible', { address });
    }
  }, [proofQuery.isError, address]);
  useEffect(() => {
    if (error) {
      logEvent('builder_nft_mint_error', { address });
    }
  }, [error, address]);

  if (hasClaimed) {
    return {
      status: 'already-minted',
    };
  }

  if (isPending) {
    return {
      status: 'minting',
    };
  }

  if (isSuccess) {
    return {
      status: 'minted',
      txHash,
    };
  }

  if (error) {
    return {
      status: 'mint-error',
      reset,
      error,
    };
  }

  if (status !== 'connected') {
    return {
      status: 'disconnected',
    };
  }

  if (proofQuery.isLoading) {
    return {
      status: 'loading-proof',
    };
  }

  if (proofQuery.isError) {
    return {
      status: 'not-eligible',
    };
  }

  return { status: 'eligible', mint };
}

export const MintStateContext = createContext<MintState>({
  status: 'disconnected',
  mint: undefined,
});

export function useMintStateContext() {
  return useContext(MintStateContext);
}
