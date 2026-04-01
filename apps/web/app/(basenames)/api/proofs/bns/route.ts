import { NextRequest } from 'next/server';
import { ProofTableNamespace } from 'apps/web/src/utils/proofs';
import { withTimeout } from 'apps/web/app/api/decorators';
import { createWalletProofHandler } from '../proofHandlers';

/*
this endpoint returns whether or not the account has a bns account
if result array is empty, user has no bns account
example return:
{
  "address": "0xB18e4C959bccc8EF86D78DC297fb5efA99550d85",
  "namespace": "bns_discount",
  "proofs": "[0x56ce3bbc909b90035ae373d32c56a9d81d26bb505dd935cdee6afc384bcaed8d, 0x99e940ed9482bf59ba5ceab7df0948798978a1acaee0ecb41f64fe7f40eedd17]"
  "discountValidatorAddress": "0x..."
}
*/
async function handler(req: NextRequest) {
  return createWalletProofHandler(
    req,
    ProofTableNamespace.BNSDiscount,
    'error getting proofs for bns discount',
  );
}

export const GET = withTimeout(handler);
