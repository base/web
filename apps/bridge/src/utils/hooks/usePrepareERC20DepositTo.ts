import L1StandardBridge from 'apps/bridge/src/contract-abis/L1StandardBridge';
import { Asset } from 'apps/bridge/src/types/Asset';
import getConfig from 'next/config';
import { parseUnits } from 'viem';
import { Address, usePrepareContractWrite } from 'wagmi';
import { prepareWriteContract } from 'wagmi/actions';

const { publicRuntimeConfig } = getConfig();

type UsePrepareERC20DepositToProps = {
  asset: Asset;
  to: `0x${string}`;
  depositAmount: string;
  readApprovalResult?: boolean;
  isPermittedToBridge: boolean;
  includeTosVersionByte: boolean;
};

export function usePrepareERC20DepositTo({
  asset,
  to,
  depositAmount,
  isPermittedToBridge,
  includeTosVersionByte,
}: UsePrepareERC20DepositToProps) {
  const { config: depositConfig } = usePrepareContractWrite({
    address:
      isPermittedToBridge && depositAmount !== ''
        ? publicRuntimeConfig.l1BridgeProxyAddress
        : undefined,
    abi: L1StandardBridge,
    functionName: 'depositERC20To',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    args: [
      asset.L1contract as Address,
      asset.L2contract as Address,
      to,
      depositAmount !== ''
        ? parseUnits(depositAmount, asset.decimals)
        : parseUnits('0', asset.decimals),
      100000,
      includeTosVersionByte ? publicRuntimeConfig.tosVersion : '0x',
    ],
    cacheTime: 0,
    staleTime: 1,
  });
  return depositConfig;
}

export async function prepareERC20DepositTo({
  asset,
  to,
  depositAmount,
  includeTosVersionByte,
}: UsePrepareERC20DepositToProps) {
  return prepareWriteContract({
    address: publicRuntimeConfig.l1BridgeProxyAddress,
    abi: L1StandardBridge,
    functionName: 'depositERC20To',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    args: [
      asset.L1contract as Address,
      asset.L2contract as Address,
      to,
      depositAmount !== ''
        ? parseUnits(depositAmount, asset.decimals)
        : parseUnits('0', asset.decimals),
      100000,
      includeTosVersionByte ? publicRuntimeConfig.tosVersion : '0x',
    ],
  });
}
