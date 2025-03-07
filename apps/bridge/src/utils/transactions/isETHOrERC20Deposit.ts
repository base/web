import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts';
import { decodeFunctionData } from 'viem';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import getConfig from 'next/config';
import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import { DepositItem } from '@eth-optimism/indexer-api';

const { publicRuntimeConfig } = getConfig();

const assetList = getAssetListForChainEnv();
const ETH_TOKEN_ADDRESS = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000';

const CCTP_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1CCTPTokenMessengerAddress ?? '0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8'
).toLowerCase();

export function isExplorerTxETHOrERC20Deposit(tx: BlockExplorerTransaction) {
  // CCTP deposit
  if (tx.to === CCTP_DEPOSIT_ADDRESS && publicRuntimeConfig.cctpEnabled === 'true') {
    const { functionName } = decodeFunctionData({
      abi: TokenMessenger,
      data: tx.input,
    });
    if (functionName === 'depositForBurn') {
      return true;
    }
  }

  return false;
}

export function isIndexerTxETHOrERC20Deposit(tx: DepositItem) {
  // ETH deposit
  if (tx.l1TokenAddress === ETH_TOKEN_ADDRESS) {
    return true;
  }

  // Only show UI-supported ERC20 deposits
  const token = assetList.find(
    (asset) =>
      asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
      asset.protocol === 'OP' &&
      asset.L1contract?.toLowerCase() === tx.l1TokenAddress.toLowerCase(),
  );

  return Boolean(token);
}

const ETH_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1OptimismPortalProxyAddress ?? '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA'
).toLowerCase();

const ERC20_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1BridgeProxyAddress ?? '0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a'
).toLowerCase();

export function isETHOrERC20OrCCTPDeposit(tx: BlockExplorerTransaction) {
  // Immediately filter out if tx is not to an address we don't care about
  if (
    tx.to !== ETH_DEPOSIT_ADDRESS &&
    tx.to !== ERC20_DEPOSIT_ADDRESS &&
    tx.to !== CCTP_DEPOSIT_ADDRESS
  ) {
    return false;
  }

  // ETH deposit
  if (tx.to === ETH_DEPOSIT_ADDRESS && tx.value !== '0') {
    return true;
  }

  // ERC-20 deposit
  if (tx.to === ERC20_DEPOSIT_ADDRESS) {
    const { functionName, args } = decodeFunctionData({
      abi: l1StandardBridgeABI,
      data: tx.input,
    });
    if (functionName === 'depositERC20' || functionName === 'depositERC20To') {
      const token = assetList.find(
        (asset) =>
          asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
          asset.L1contract?.toLowerCase() === (args?.[0] as string).toLowerCase() &&
          asset.protocol === 'OP',
      );
      // Return true if this is a depositERC20 call to the L1StandardBridge and is a token the UI supports
      return Boolean(token);
    }
  }

  // CCTP deposit
  if (tx.to === CCTP_DEPOSIT_ADDRESS && publicRuntimeConfig.cctpEnabled === 'true') {
    const { functionName } = decodeFunctionData({
      abi: TokenMessenger,
      data: tx.input,
    });
    if (functionName === 'depositForBurn') {
      return true;
    }
  }

  return false;
}
