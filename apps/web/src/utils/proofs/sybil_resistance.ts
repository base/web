import { getAttestations } from '@coinbase/onchainkit/identity';
import { kv } from 'apps/web/src/utils/kv';
import { CoinbaseProofResponse } from 'apps/web/pages/api/proofs/coinbase';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import {
  USERNAME_CB1_DISCOUNT_VALIDATORS,
  USERNAME_CB_DISCOUNT_VALIDATORS,
  USERNAME_DISCOUNT_CODE_VALIDATORS,
  USERNAME_EA_DISCOUNT_VALIDATORS,
} from 'apps/web/src/addresses/usernames';
import { getLinkedAddresses } from 'apps/web/src/cdp/api';
import {
  ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_IDS,
  ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_IDS,
  trustedSignerAddress,
  trustedSignerPKey,
} from 'apps/web/src/constants';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { logger } from 'apps/web/src/utils/logger';
import {
  DiscountType,
  DiscountTypes,
  PreviousClaim,
  PreviousClaims,
  ProofsException,
  VerifiedAccount,
} from 'apps/web/src/utils/proofs/types';
import { REGISTER_CONTRACT_ADDRESSES } from 'apps/web/src/utils/usernames';
import {
  Address,
  encodeAbiParameters,
  encodePacked,
  isAddress,
  keccak256,
  parseAbiParameters,
} from 'viem';
import { sign } from 'viem/accounts';
import { base, baseSepolia } from 'viem/chains';

const EXPIRY = process.env.USERNAMES_SIGNATURE_EXPIRATION_SECONDS ?? '30';
const previousClaimsKVPrefix = 'username:claims:';

type DiscountTypesByChainId = Record<number, DiscountTypes>;
const discountTypes: DiscountTypesByChainId = {
  [base.id]: {
    [DiscountType.CB]: {
      schemaId: ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_IDS[base.id],
      discountValidatorAddress: USERNAME_CB_DISCOUNT_VALIDATORS[base.id],
    },
    [DiscountType.CB1]: {
      schemaId: ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_IDS[base.id],
      discountValidatorAddress: USERNAME_CB1_DISCOUNT_VALIDATORS[base.id],
    },
    [DiscountType.EARLY_ACCESS]: {
      discountValidatorAddress: USERNAME_EA_DISCOUNT_VALIDATORS[base.id],
    },
    [DiscountType.DISCOUNT_CODE]: {
      discountValidatorAddress: USERNAME_DISCOUNT_CODE_VALIDATORS[base.id],
    },
  },
  [baseSepolia.id]: {
    [DiscountType.CB]: {
      schemaId: ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_IDS[baseSepolia.id],
      discountValidatorAddress: USERNAME_CB_DISCOUNT_VALIDATORS[baseSepolia.id],
    },
    [DiscountType.CB1]: {
      schemaId: ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_IDS[baseSepolia.id],
      discountValidatorAddress: USERNAME_CB1_DISCOUNT_VALIDATORS[baseSepolia.id],
    },
    [DiscountType.EARLY_ACCESS]: {
      discountValidatorAddress: USERNAME_EA_DISCOUNT_VALIDATORS[baseSepolia.id],
    },
    [DiscountType.DISCOUNT_CODE]: {
      discountValidatorAddress: USERNAME_DISCOUNT_CODE_VALIDATORS[baseSepolia.id],
    },
  },
};

export async function hasRegisteredWithDiscount(
  addresses: Address[],
  chainId: number,
): Promise<boolean> {
  const publicClient = getBasenamePublicClient(chainId);

  return publicClient.readContract({
    address: REGISTER_CONTRACT_ADDRESSES[chainId],
    abi: RegistrarControllerABI,
    functionName: 'hasRegisteredWithDiscount',
    args: [addresses],
  });
}

async function getMessageSignature(message: `0x${string}`) {
  // hash the message
  const msgHash = keccak256(message);

  // sign the hashed message
  const { r, s, v } = await sign({
    hash: msgHash,
    privateKey: `0x${trustedSignerPKey}`,
  });

  // combine r, s, and v into a single signature
  const signature = `${r.slice(2)}${s.slice(2)}${(v as bigint).toString(16)}`;

  return signature;
}

async function signMessageWithTrustedSigner(
  claimerAddress: Address,
  targetAddress: Address,
  expiry: number,
) {
  if (!trustedSignerAddress || !isAddress(trustedSignerAddress)) {
    throw new Error('Must provide a valid trustedSignerAddress');
  }
  // encode the message
  const message = encodePacked(
    ['bytes2', 'address', 'address', 'address', 'uint64'],
    ['0x1900', targetAddress, trustedSignerAddress, claimerAddress, BigInt(expiry)],
  );

  const signature = await getMessageSignature(message);

  // return the encoded signed message
  return encodeAbiParameters(parseAbiParameters('address, uint64, bytes'), [
    claimerAddress,
    BigInt(expiry),
    `0x${signature}`,
  ]);
}

export async function signDiscountMessageWithTrustedSigner(
  claimerAddress: Address,
  couponCodeUuid: Address,
  targetAddress: Address,
  expiry: number,
) {
  if (!trustedSignerAddress || !isAddress(trustedSignerAddress)) {
    throw new Error('Must provide a valid trustedSignerAddress');
  }

  const message = encodePacked(
    ['bytes2', 'address', 'address', 'address', 'bytes32', 'uint64'],
    ['0x1900', targetAddress, trustedSignerAddress, claimerAddress, couponCodeUuid, BigInt(expiry)],
  );

  const signature = await getMessageSignature(message);

  // return the encoded signed message
  return encodeAbiParameters(parseAbiParameters('uint64, bytes32, bytes'), [
    BigInt(expiry),
    couponCodeUuid,
    `0x${signature}`,
  ]);
}

export async function sybilResistantUsernameSigning(
  address: `0x${string}`,
  discountType: DiscountType,
  chainId: number,
): Promise<CoinbaseProofResponse> {
  const schema = discountTypes[chainId][discountType]?.schemaId;

  const discountValidatorAddress = discountTypes[chainId][discountType]?.discountValidatorAddress;

  if (!discountValidatorAddress || !isAddress(discountValidatorAddress)) {
    throw new ProofsException('Must provide a valid discountValidatorAddress', 500);
  }

  const attestations = await getAttestations(
    address,
    // @ts-expect-error onchainkit expects a different type for Chain (??)
    { id: chainId },
    { schemas: [schema] },
  );

  if (!attestations?.length) {
    return { attestations: [], discountValidatorAddress };
  }
  const attestationsRes = attestations.map(
    (attestation) => JSON.parse(attestation.decodedDataJson)[0] as VerifiedAccount,
  );

  let { linkedAddresses, idemKey } = await getLinkedAddresses(address as string);

  const hasPreviouslyRegistered = await hasRegisteredWithDiscount(linkedAddresses, chainId);

  // if any linked address registered previously return an error
  if (hasPreviouslyRegistered) {
    throw new ProofsException('You have already claimed a discounted basename (onchain).', 409);
  }

  const kvKey = `${previousClaimsKVPrefix}${idemKey}`;
  //check kv for previous claim entries
  let previousClaims = (await kv.get<PreviousClaims>(kvKey)) ?? {};
  const previousClaim = previousClaims[discountType];
  if (previousClaim) {
    if (previousClaim.address != address) {
      throw new ProofsException(
        'You tried claiming this with a different address, wait a couple minutes to try again.',
        400,
      );
    }
    // return previously signed message
    return {
      signedMessage: previousClaim.signedMessage,
      attestations: attestationsRes,
      discountValidatorAddress,
      expires: EXPIRY.toString(),
    };
  }

  const expirationTimeUnix = Math.floor(Date.now() / 1000) + parseInt(EXPIRY);
  try {
    // generate and sign the message
    const signedMessage = await signMessageWithTrustedSigner(
      address,
      discountValidatorAddress,
      expirationTimeUnix,
    );

    const claim: PreviousClaim = { address, signedMessage };
    previousClaims[discountType] = claim;

    await kv.set<PreviousClaims>(kvKey, previousClaims, { nx: true, ex: parseInt(EXPIRY) });

    return {
      signedMessage: claim.signedMessage,
      attestations: attestationsRes,
      discountValidatorAddress,
      expires: EXPIRY,
    };
  } catch (error) {
    logger.error('error while getting sybilResistant basename signature', error);
    if (error instanceof Error) {
      throw new ProofsException(error.message, 500);
    }
    throw error;
  }
}
