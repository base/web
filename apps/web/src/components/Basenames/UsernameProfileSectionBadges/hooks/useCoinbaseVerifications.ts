import { getAttestations } from '@coinbase/onchainkit/identity';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { base } from 'viem/chains';

const COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID =
  '0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9';
const COINBASE_VERIFIED_COUNTRY_SCHEMA_ID =
  '0x1801901fabd0e6189356b4fb52bb0ab855276d84f7ec140839fbd1f6801ca065';
const COINBASE_ONE_SCHEMA_ID = '0x254bd1b63e0591fefa66818ca054c78627306f253f86be6023725a67ee6bf9f4';

export type CoinbaseVerifications =
  | 'VERIFIED_IDENTITY'
  | 'VERIFIED_COUNTRY'
  | 'VERIFIED_COINBASE_ONE';

const SCHEMAS: Record<`0x${string}`, CoinbaseVerifications> = {
  [COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID]: 'VERIFIED_IDENTITY',
  [COINBASE_VERIFIED_COUNTRY_SCHEMA_ID]: 'VERIFIED_COUNTRY',
  [COINBASE_ONE_SCHEMA_ID]: 'VERIFIED_COINBASE_ONE',
};

const attestationsOptions = {
  schemas: Object.keys(SCHEMAS),
};

export async function getCoinbaseVerifications(address: `0x${string}`) {
  const attestations = await getAttestations(
    address,
    base,
    attestationsOptions as { schemas: `0x${string}`[] },
  );
  return attestations.map(({ decodedDataJson, ...rest }) => {
    return {
      ...rest,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: JSON.parse(decodedDataJson),
    };
  });
}

export function useCoinbaseVerification(address?: `0x${string}`): {
  badges: Record<CoinbaseVerifications, boolean>;
  empty: boolean;
} {
  const attestations = useQuery({
    queryKey: ['coinbase-attestations', address],
    queryFn: async ({ queryKey }) => getCoinbaseVerifications(queryKey[1] as `0x${string}`),
    enabled: !!address,
  });

  const [badges, empty]: [Record<CoinbaseVerifications, boolean>, boolean] = useMemo(() => {
    let allEmpty = true;
    const verifications: Record<CoinbaseVerifications, boolean> = {
      VERIFIED_IDENTITY: false,
      VERIFIED_COUNTRY: false,
      VERIFIED_COINBASE_ONE: false,
    };

    if (!attestations.data) return [verifications, true];

    for (const attestation of attestations.data) {
      if (attestation.revoked) {
        continue;
      }

      if (attestation.schemaId in SCHEMAS) {
        verifications[SCHEMAS[attestation.schemaId]] = true;
        allEmpty = false;
      }
    }

    return [verifications, allEmpty];
  }, [attestations.data]);

  return { badges, empty };
}
