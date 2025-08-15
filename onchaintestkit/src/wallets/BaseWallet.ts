import { CoinbaseWallet } from "./Coinbase"
import { MetaMask } from "./MetaMask"

export enum BaseActionType {
  // basic setup
  IMPORT_WALLET_FROM_SEED = "importWalletFromSeed",
  IMPORT_WALLET_FROM_PRIVATE_KEY = "importWalletFromPrivateKey",

  // network actions
  SWITCH_NETWORK = "switchNetwork",

  // dapp actions
  CONNECT_TO_DAPP = "connectToDapp",

  // transaction actions
  HANDLE_TRANSACTION = "handleTransaction",

  // signature actions
  HANDLE_SIGNATURE = "handleSignature",

  // handle spending cap changes
  CHANGE_SPENDING_CAP = "changeSpendingCap",

  // remove spending cap
  REMOVE_SPENDING_CAP = "removeSpendingCap",
}

export enum ActionApprovalType {
  APPROVE = "approve",
  REJECT = "reject",
}

export type ActionOptions = {
  approvalType?: ActionApprovalType // Determines if the action is an approval or rejection
  [key: string]: unknown // Arbitrary additional options
}

export type WalletSetupContext = { localNodePort: number }

export type BaseWalletConfig = {
  type: "metamask" | "coinbase"
  password?: string
  walletSetup?: (
    wallet: MetaMask | CoinbaseWallet,
    context: WalletSetupContext,
  ) => Promise<void>
}

export type MetaMaskConfig = {
  type: "metamask"
  walletSetup?: (wallet: MetaMask, context: WalletSetupContext) => Promise<void>
} & BaseWalletConfig

export type CoinbaseConfig = {
  type: "coinbase"
  walletSetup?: (
    wallet: CoinbaseWallet,
    context: WalletSetupContext,
  ) => Promise<void>
} & BaseWalletConfig

export abstract class BaseWallet {
  // Method to handle actions with combined options
  abstract handleAction(
    action: BaseActionType,
    options: ActionOptions,
  ): Promise<void>
}
