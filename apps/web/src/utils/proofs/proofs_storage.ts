import { getDb } from 'apps/web/src/utils/datastores/postgres';
import { Address } from 'viem';

export enum ProofTableNamespace {
  CBIDDiscount = 'basenames_cbid_discount',
}

const proofTableName = 'proofs';

export async function getProofsByNamespaceAndAddress(
  address: Address,
  namespace: ProofTableNamespace,
  caseInsensitive = true, // set false for big data sets
) {
  const db = getDb();
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
