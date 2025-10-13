import EntryPointAbi from 'apps/web/src/abis/EntryPointAbi';
import { Abi, Address, decodeEventLog, Hash, Hex } from 'viem';

export type RawLog = {
  address: Hex;
  data: Hex;
  topics: Hex[];
};

export const USER_OPERATION_EVENT_LOG_NAME = 'UserOperationEvent';
export type UserOperationEventLog = {
  eventName: 'UserOperationEvent';
  args: {
    actualGasCost: bigint;
    actualGasUsed: bigint;
    nonce: bigint;
    paymaster: Address;
    sender: Address;
    success: boolean;
    userOpHash: Hash;
  };
};

export const contractAddressToAbis: Record<Address, Abi> = {
  // EntryPoint Contract
  '0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789': EntryPointAbi as Abi, // Testnet & mainnet are same address
};

export const decodeRawLog = (log: RawLog) => {
  const addressAbi = contractAddressToAbis[log.address];

  if (!addressAbi) return;

  const topics = log.topics as [signature: Hex, ...args: Hex[]];

  const decodedLog = decodeEventLog({
    abi: addressAbi,
    data: log.data,
    topics: topics,
  });

  // Type the log
  if (decodedLog.eventName === USER_OPERATION_EVENT_LOG_NAME) {
    return decodedLog as unknown as UserOperationEventLog;
  }

  return decodedLog;
};
