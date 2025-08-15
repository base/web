export type ContractDeployment = {
  // Contract name (matches artifact name)
  name: string
  // Constructor arguments (encoded)
  args: readonly unknown[]
  // Salt for CREATE2 deployment (32 bytes)
  salt: `0x${string}`
  // Account deploying the contract
  deployer: `0x${string}`
}

export type ContractCall = {
  // Contract address
  target: `0x${string}`
  // Function name to call
  functionName: string
  // Function arguments
  args: readonly unknown[]
  // Account making the call
  account: `0x${string}`
  // ETH value to send (default: 0)
  value?: bigint
}

export type SetupConfig = {
  deployments?: ContractDeployment[]
  calls?: ContractCall[]
}

export type ContractArtifact = {
  abi: readonly unknown[]
  bytecode: `0x${string}`
}
