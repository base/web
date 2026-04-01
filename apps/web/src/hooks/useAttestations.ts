import { DiscountCodeResponse } from 'apps/web/app/(basenames)/api/proofs/discountCode/route';
import AttestationValidatorABI from 'apps/web/src/abis/AttestationValidator';
import CBIDValidatorABI from 'apps/web/src/abis/CBIdDiscountValidator';
import EarlyAccessValidatorABI from 'apps/web/src/abis/EarlyAccessValidator';
import ERC1155DiscountValidator from 'apps/web/src/abis/ERC1155DiscountValidator';
import ERC1155DiscountValidatorV2 from 'apps/web/src/abis/ERC1155DiscountValidatorV2';
import ERC721ValidatorABI from 'apps/web/src/abis/ERC721DiscountValidator';
import TalentProtocolDiscountValidatorABI from 'apps/web/src/abis/TalentProtocolDiscountValidator';
import {
  BASE_WORLD_DISCOUNT_VALIDATORS,
  BUILDATHON_ERC721_DISCOUNT_VALIDATOR,
  DEVCON_DISCOUNT_VALIDATORS,
  TALENT_PROTOCOL_DISCOUNT_VALIDATORS,
  USERNAME_1155_DISCOUNT_VALIDATORS,
} from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { Discount } from 'apps/web/src/utils/usernames';
import {
  AttestationData,
  useAttestationWithProof,
  useAttestationWithoutProof,
} from './useAttestationFactory';
import { useErrors } from 'apps/web/contexts/Errors';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { encodeAbiParameters } from 'viem';

export type { AttestationData };

export function useCheckCBIDAttestations() {
  return useAttestationWithProof(
    '/api/proofs/cbid',
    Discount.CBID,
    CBIDValidatorABI,
    'Error checking CB.ID attestation',
  );
}

// returns info about Coinbase verified account attestations
export function useCheckCoinbaseAttestations() {
  return useAttestationWithProof(
    '/api/proofs/coinbase',
    Discount.COINBASE_VERIFIED_ACCOUNT,
    AttestationValidatorABI,
    'Error checking Coinbase account attestations',
  );
}

export function useCheckCB1Attestations() {
  return useAttestationWithProof(
    '/api/proofs/cb1',
    Discount.CB1,
    AttestationValidatorABI,
    'Error checking CB1 attestation',
  );
}

// erc 1155 validator
export function useSummerPassAttestations() {
  const { basenameChain } = useBasenameChain();
  const discountValidatorAddress = USERNAME_1155_DISCOUNT_VALIDATORS[basenameChain.id];

  return useAttestationWithoutProof(
    discountValidatorAddress,
    Discount.SUMMER_PASS_LVL_3,
    ERC1155DiscountValidator,
  );
}

// erc 721 validator
export function useBuildathonAttestations() {
  const { basenameChain } = useBasenameChain();
  const discountValidatorAddress = BUILDATHON_ERC721_DISCOUNT_VALIDATOR[basenameChain.id];

  return useAttestationWithoutProof(
    discountValidatorAddress,
    Discount.BASE_BUILDATHON_PARTICIPANT,
    ERC721ValidatorABI,
  );
}

// mainnet erc721 validator -- uses merkle tree
export function useBaseDotEthAttestations() {
  return useAttestationWithProof(
    '/api/proofs/baseEthHolders',
    Discount.BASE_DOT_ETH_NFT,
    CBIDValidatorABI,
    'Error checking BaseDotEth attestation',
  );
}

// merkle tree discount calls api endpoint
export function useBNSAttestations() {
  return useAttestationWithProof(
    '/api/proofs/bns',
    Discount.BNS_NAME,
    EarlyAccessValidatorABI,
    'Error checking BNS discount availability',
  );
}

// returns info about Discount Codes attestations
export function useDiscountCodeAttestations(code?: string) {
  const { logError } = useErrors();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [discountCodeResponse, setDiscountCodeResponse] = useState<DiscountCodeResponse | null>(
    null,
  );

  const { basenameChain } = useBasenameChain();

  useEffect(() => {
    async function checkDiscountCode(a: string, c: string) {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('address', a);
        params.append('chain', basenameChain.id.toString());
        params.append('code', c.toString());
        const response = await fetch(`/api/proofs/discountCode?${params}`);
        const result = (await response.json()) as DiscountCodeResponse;
        if (response.ok) {
          setDiscountCodeResponse(result);
        }
      } catch (error) {
        logError(error, 'Error checking Discount code');
      } finally {
        setLoading(false);
      }
    }

    if (address && !!code) {
      checkDiscountCode(address, code).catch((error) => {
        logError(error, 'Error checking Discount code');
      });
    }
  }, [address, basenameChain.id, code, logError]);

  const signature = discountCodeResponse?.signedMessage;
  const readContractArgs = useMemo(() => {
    if (!address || !signature || !code) {
      return {};
    }

    return {
      address: discountCodeResponse?.discountValidatorAddress,
      abi: AttestationValidatorABI,
      functionName: 'isValidDiscountRegistration',
      args: [address, signature],
    };
  }, [address, code, discountCodeResponse?.discountValidatorAddress, signature]);

  const { data: isValid, isLoading, error } = useReadContract(readContractArgs);

  if (isValid && discountCodeResponse && address && signature) {
    return {
      data: {
        discountValidatorAddress: discountCodeResponse.discountValidatorAddress,
        discount: Discount.DISCOUNT_CODE,
        validationData: signature,
      },
      loading: false,
      error: null,
    };
  }
  return { data: null, loading: loading || isLoading, error };
}

export function useTalentProtocolAttestations() {
  const { basenameChain } = useBasenameChain();
  const discountValidatorAddress = TALENT_PROTOCOL_DISCOUNT_VALIDATORS[basenameChain.id];

  return useAttestationWithoutProof(
    discountValidatorAddress,
    Discount.TALENT_PROTOCOL,
    TalentProtocolDiscountValidatorABI,
  );
}

const baseWorldTokenIds = [
  BigInt(0),
  BigInt(1),
  BigInt(2),
  BigInt(3),
  BigInt(4),
  BigInt(5),
  BigInt(6),
];

export function useBaseWorldAttestations() {
  const { address } = useAccount();
  const { basenameChain } = useBasenameChain();

  const discountValidatorAddress = BASE_WORLD_DISCOUNT_VALIDATORS[basenameChain.id];

  const readContractArgs = useMemo(() => {
    if (!address) {
      return {};
    }
    return {
      address: discountValidatorAddress,
      abi: ERC1155DiscountValidatorV2,
      functionName: 'isValidDiscountRegistration',
      args: [address, encodeAbiParameters([{ type: 'uint256[]' }], [baseWorldTokenIds])],
    };
  }, [address, discountValidatorAddress]);

  const { data: isValid, isLoading, error } = useReadContract({ ...readContractArgs, query: {} });
  if (isValid && address) {
    return {
      data: {
        discountValidatorAddress,
        discount: Discount.BASE_WORLD,
        validationData: encodeAbiParameters([{ type: 'uint256[]' }], [baseWorldTokenIds]),
      },
      loading: false,
      error: null,
    };
  }

  return { data: null, loading: isLoading, error };
}

const devconTokenIds = [BigInt(100), BigInt(101)];

export function useDevconAttestations() {
  const { address } = useAccount();
  const { basenameChain } = useBasenameChain();

  const discountValidatorAddress = DEVCON_DISCOUNT_VALIDATORS[basenameChain.id];

  const readContractArgs = useMemo(() => {
    if (!address) {
      return {};
    }
    return {
      address: discountValidatorAddress,
      abi: ERC1155DiscountValidatorV2,
      functionName: 'isValidDiscountRegistration',
      args: [address, encodeAbiParameters([{ type: 'uint256[]' }], [devconTokenIds])],
    };
  }, [address, discountValidatorAddress]);

  const { data: isValid, isLoading, error } = useReadContract({ ...readContractArgs, query: {} });
  if (isValid && address) {
    return {
      data: {
        discountValidatorAddress,
        discount: Discount.DEVCON,
        validationData: encodeAbiParameters([{ type: 'uint256[]' }], [devconTokenIds]),
      },
      loading: false,
      error: null,
    };
  }

  return { data: null, loading: isLoading, error };
}
