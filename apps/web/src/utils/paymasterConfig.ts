import { ENTRYPOINT_ADDRESS_V06 } from 'permissionless';
import { paymasterActionsEip7677 } from 'permissionless/experimental';
import { createClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';

const testnetPaymasterService = process.env.NEXT_PUBLIC_BASE_SEPOLIA_PAYMASTER_SERVICE;
const paymasterService = process.env.NEXT_PUBLIC_BASE_PAYMASTER_SERVICE;

export const paymasterTestnetClient = createClient({
  chain: baseSepolia,
  transport: http(testnetPaymasterService),
}).extend(paymasterActionsEip7677(ENTRYPOINT_ADDRESS_V06));

export const paymasterClient = createClient({
  chain: base,
  transport: http(paymasterService),
}).extend(paymasterActionsEip7677(ENTRYPOINT_ADDRESS_V06));
