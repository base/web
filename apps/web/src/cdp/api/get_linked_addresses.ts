import { cdpGet } from 'apps/web/src/cdp/utils';
import { logger } from 'apps/web/src/utils/logger';
import { Address, isAddress } from 'viem';

export type LinkedAddresses = {
  idemKey: string;
  linkedAddresses: Address[];
};

type ErrorResponse = {
  code: number;
  data: LinkedAddresses;
};

export async function getLinkedAddresses(address: string): Promise<LinkedAddresses> {
  if (!isAddress(address)) {
    throw new Error('A valid address is required');
  }

  try {
    const response = await cdpGet(`verifications/v1/recipients/${address}/linked-addresses`, true);

    if (response.ok) {
      return (await response.json()) as LinkedAddresses;
    }

    const contentType = response.headers.get('content-type');
    let errorResponse: ErrorResponse | string;

    if (contentType?.includes('application/json')) {
      errorResponse = (await response.json()) as ErrorResponse;
    } else {
      errorResponse = await response.text();
    }

    if (response.status === 401) {
      throw new Error('Unauthorized access: ensure the calling IP is permitted.');
    }

    if (response.status === 500 && typeof errorResponse !== 'string' && errorResponse.code === 13) {
      throw new Error('No user found');
    }

    throw new Error(`Unexpected error: ${response.statusText}, Response: ${errorResponse}`);
  } catch (error) {
    logger.error('Error fetching linked addresses:', error);
    throw error;
  }
}
