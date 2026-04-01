/**
 * Response format for Etherscan/Basescan contract source code API
 * Module: contract, Action: getsourcecode
 */
export type ContractSourceCodeResult = {
  SourceCode: string;
  ABI: string;
  ContractName: string;
  CompilerVersion: string;
  CompilerType: string;
  OptimizationUsed: string;
  Runs: string;
  ConstructorArguments: string;
  EVMVersion: string;
  Library: string;
  ContractFileName: string;
  LicenseType: string;
  Proxy: string;
  Implementation: string;
  SwarmSource: string;
  // SimilarMatch is optional - only present when Etherscan finds a similar contract
  SimilarMatch?: string;
};

export type ContractSourceCodeResponse = {
  status: string;
  message: string;
  result: ContractSourceCodeResult[];
};
