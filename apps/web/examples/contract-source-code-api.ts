/**
 * Example usage of the contract source code API endpoint
 * 
 * This demonstrates how to fetch verified contract source code from blockchain explorers
 * using the proxy API route with the new 'etherscan-sourcecode' and 'basescan-sourcecode' apiTypes.
 * 
 * Example contract: Test12345 from the problem statement
 * Contract address: 0x... (replace with actual address)
 */

import { ContractSourceCodeResponse } from '../src/types/ContractSourceCode';

/**
 * Fetch contract source code from Etherscan (Ethereum mainnet)
 */
async function getEtherscanContractSource(contractAddress: string): Promise<ContractSourceCodeResponse> {
  const response = await fetch(
    `/api/proxy?apiType=etherscan-sourcecode&address=${contractAddress}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch contract source: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.data as ContractSourceCodeResponse;
}

/**
 * Fetch contract source code from Basescan (Base mainnet)
 */
async function getBasescanContractSource(contractAddress: string): Promise<ContractSourceCodeResponse> {
  const response = await fetch(
    `/api/proxy?apiType=basescan-sourcecode&address=${contractAddress}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch contract source: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.data as ContractSourceCodeResponse;
}

/**
 * Example usage
 */
export async function example() {
  try {
    // Replace with actual contract address
    const contractAddress = '0x1234567890123456789012345678901234567890';
    
    // Fetch from Basescan
    const contractData = await getBasescanContractSource(contractAddress);
    
    if (contractData.status === '1' && contractData.result.length > 0) {
      const contract = contractData.result[0];
      
      console.log('Contract Name:', contract.ContractName);
      console.log('Compiler Version:', contract.CompilerVersion);
      console.log('Source Code:', contract.SourceCode);
      console.log('ABI:', contract.ABI);
      console.log('License:', contract.LicenseType);
      
      // Parse ABI if needed
      const abi = JSON.parse(contract.ABI);
      console.log('Contract ABI functions:', abi.length);
    } else {
      console.log('Contract source code not verified or not found');
    }
  } catch (error) {
    console.error('Error fetching contract source:', error);
  }
}

/**
 * Expected response format (from problem statement):
 * {
 *   "status": "1",
 *   "message": "OK",
 *   "result": [
 *     {
 *       "SourceCode": "pragma solidity 0.4.26;...",
 *       "ABI": "[{...}]",
 *       "ContractName": "Test12345",
 *       "CompilerVersion": "v0.4.26+commit.4563c3fc",
 *       "CompilerType": "solc",
 *       "OptimizationUsed": "1",
 *       "Runs": "200",
 *       "ConstructorArguments": "",
 *       "EVMVersion": "Default",
 *       "Library": "",
 *       "ContractFileName": "",
 *       "LicenseType": "None",
 *       "Proxy": "0",
 *       "Implementation": "",
 *       "SwarmSource": "bzzr://...",
 *       "SimilarMatch": "0x..."
 *     }
 *   ]
 * }
 */
