import { Address, isAddress } from 'viem';
import { isBasenameSupportedChain } from 'apps/web/src/hooks/useBasenameChain';
import { hasRegisteredWithDiscount } from 'apps/web/src/utils/proofs/sybil_resistance';
import { MerkleTreeProofResponse, ProofsException } from 'apps/web/src/utils/proofs/types';
import {
  getProofsByNamespaceAndAddress,
  ProofTableNamespace,
} from 'apps/web/src/utils/proofs/proofs_storage';
import {
  USERNAME_BASE_ETH_HOLDERS_DISCOUNT_VALIDATORS,
  USERNAME_BNS_DISCOUNT_VALIDATORS,
  USERNAME_CB_ID_DISCOUNT_VALIDATORS,
  USERNAME_EA_DISCOUNT_VALIDATORS,
} from 'apps/web/src/addresses/usernames';

const validators: Record<ProofTableNamespace, Record<number, Address>> = {
  [ProofTableNamespace.CBIDDiscount]: USERNAME_CB_ID_DISCOUNT_VALIDATORS,
  [ProofTableNamespace.BaseEthHolders]: USERNAME_BASE_ETH_HOLDERS_DISCOUNT_VALIDATORS,
  [ProofTableNamespace.BNSDiscount]: USERNAME_BNS_DISCOUNT_VALIDATORS,
  [ProofTableNamespace.UsernamesEarlyAccess]: USERNAME_EA_DISCOUNT_VALIDATORS,
};

export function proofValidation(
  address: string | string[] | undefined,
  chain: string | string[] | undefined,
): { status: number; error: string } | undefined {
  if (!address || Array.isArray(address) || !isAddress(address)) {
    return { status: 400, error: 'A single valid address is required' };
  }

  if (!chain || Array.isArray(chain)) {
    return { status: 400, error: 'invalid chain' };
  }
  let parsedChain = parseInt(chain);
  if (!isBasenameSupportedChain(parsedChain)) {
    return { status: 400, error: 'chain must be Base or Base Sepolia' };
  }
  return;
}

export async function getWalletProofs(
  address: `0x${string}`,
  chain: number,
  namespace: ProofTableNamespace,
  caseInsensitive = true, // set false for big data sets
): Promise<MerkleTreeProofResponse> {
  const hasPreviouslyRegistered = await hasRegisteredWithDiscount([address], chain);
  // if any linked address registered previously return an error
  if (hasPreviouslyRegistered) {
    throw new ProofsException('This address has already claimed a username.', 409);
  }
  const [content] = await getProofsByNamespaceAndAddress(address, namespace, caseInsensitive);
  const proofs = content?.proofs ? (JSON.parse(content.proofs) as `0x${string}`[]) : [];
  if (proofs.length === 0) {
    throw new ProofsException(`address is not eligible for [${namespace}] this discount.`, 404);
  }
  const responseData: MerkleTreeProofResponse = {
    ...content,
    proofs,
    discountValidatorAddress: validators[namespace][chain],
  };
  return responseData;
}
