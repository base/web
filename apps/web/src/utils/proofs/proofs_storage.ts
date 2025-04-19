import { db } from 'apps/web/src/utils/datastores/rds';
import { Address } from 'viem';

export enum ProofTableNamespace {
  UsernamesEarlyAccess = 'usernames_early_access',
  BNSDiscount = 'basenames_bns_discount',
  BaseEthHolders = 'basenames_base_eth_holders_discount',
  CBIDDiscount = 'basenames_cbid_discount',
}

const proofTableName = 'proofs';

export async function getProofsByNamespaceAndAddress(
  address: Address,
  namespace: ProofTableNamespace,
  caseInsensitive = true, // set false for big data sets
) {
  let query = db.selectFrom(proofTableName).where('namespace', '=', namespace.valueOf());

  /**
   * use = when possible to search by namespace_address index otherwise it's a text based search.
   */
  if (caseInsensitive) {
    query = query.where('address', 'ilike', address);
  } else {
    query = query.where('address', '=', address);
  }
  return query.selectAll().limit(1).execute();
}
