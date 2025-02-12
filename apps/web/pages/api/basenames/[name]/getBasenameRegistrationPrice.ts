import { NextApiRequest, NextApiResponse } from 'apps/web/node_modules/next/dist/shared/lib/utils';
import { createPublicClient, http } from 'viem';
import {
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
  normalizeName,
} from 'apps/web/src/utils/usernames';
import { weiToEth } from 'apps/web/src/utils/weiToEth';
import { formatWei } from 'apps/web/src/utils/formatWei';
import { logger } from 'apps/web/src/utils/logger';
import { base } from 'viem/chains';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, years } = req.query;

  try {
    const registrationPrice = await getBasenameRegistrationPrice(String(name), Number(years));
    if (!registrationPrice) {
      throw new Error('Could not get registration price.');
    }

    const registrationPriceInWei = formatWei(registrationPrice).toString();
    const registrationPriceInEth = weiToEth(registrationPrice).toString();
    return res.status(200).json({ registrationPriceInWei, registrationPriceInEth });
  } catch (error) {
    logger.error('Could not get registration price: ', error);
    return res.status(500).json(error);
  }
}

async function getBasenameRegistrationPrice(name: string, years: number): Promise<bigint | null> {
  const client = createPublicClient({
    chain: base,
    transport: http(),
  });
  try {
    const normalizedName = normalizeName(name);
    if (!normalizedName) {
      throw new Error('Invalid ENS domain name');
    }

    const price = await client.readContract({
      address: REGISTER_CONTRACT_ADDRESSES[base.id],
      abi: REGISTER_CONTRACT_ABI,
      functionName: 'registerPrice',
      args: [normalizedName, secondsInYears(years)],
    });
    return price;
  } catch (error) {
    logger.error('Could not get claim price:', error);
    return null;
  }
}

function secondsInYears(years: number) {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}
