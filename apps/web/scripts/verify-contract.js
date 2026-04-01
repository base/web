#!/usr/bin/env node

/**
 * Smart Contract Verification CLI Tool
 * 
 * This script verifies smart contracts on blockchain explorers like Etherscan and Basescan.
 * 
 * Usage:
 *   npm run verify -- \
 *     --address <0x-address-or-ens-name> \
 *     --source ./contracts/MyContract.sol \
 *     --name MyContract \
 *     --compiler v0.8.20+commit.a1b79de6 \
 *     --network sepolia \
 *     --optimization 1 \
 *     --runs 200
 * 
 * Examples:
 *   # Using hex address
 *   npm run verify -- --address 0x1234...5678 --source ./contracts/MyContract.sol ...
 * 
 *   # Using ENS name
 *   npm run verify -- --address kushmanmb.eth --source ./contracts/MyContract.sol ...
 * 
 *   # Using Basename
 *   npm run verify -- --address yaketh.base.eth --source ./contracts/MyContract.sol ...
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Parse command line arguments
const args = {};
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i].startsWith('--')) {
    const key = process.argv[i].substring(2);
    args[key] = process.argv[i + 1];
    i++;
  }
}

// Network configuration
const NETWORKS = {
  mainnet: {
    name: 'Ethereum Mainnet',
    apiUrl: 'https://api.etherscan.io/api',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://eth.llamarpc.com'
  },
  sepolia: {
    name: 'Sepolia Testnet',
    apiUrl: 'https://api-sepolia.etherscan.io/api',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com'
  },
  base: {
    name: 'Base Mainnet',
    apiUrl: 'https://api.basescan.org/api',
    explorerUrl: 'https://basescan.org',
    rpcUrl: 'https://mainnet.base.org'
  },
  'base-sepolia': {
    name: 'Base Sepolia',
    apiUrl: 'https://api-sepolia.basescan.org/api',
    explorerUrl: 'https://sepolia.basescan.org',
    rpcUrl: 'https://sepolia.base.org'
  }
};

// Validate required arguments
function validateArgs() {
  const required = ['address', 'source', 'name', 'compiler', 'network'];
  const missing = required.filter(arg => !args[arg]);
  
  if (missing.length > 0) {
    console.error('Error: Missing required arguments:', missing.join(', '));
    console.error('\nUsage:');
    console.error('  npm run verify -- \\');
    console.error('    --address <contract-address-or-ens-name> \\');
    console.error('    --source <path-to-source-file> \\');
    console.error('    --name <contract-name> \\');
    console.error('    --compiler <compiler-version> \\');
    console.error('    --network <network-name> \\');
    console.error('    [--optimization <0|1>] \\');
    console.error('    [--runs <number>] \\');
    console.error('    [--constructor-args <hex-encoded-args>]');
    console.error('\nAddress can be:');
    console.error('  - Hex address: 0x1234567890abcdef1234567890abcdef12345678');
    console.error('  - ENS name: kushmanmb.eth, yaketh.eth');
    console.error('  - Basename: kushmanmb.base.eth, yaketh.base.eth');
    console.error('\nSupported networks:', Object.keys(NETWORKS).join(', '));
    process.exit(1);
  }
  
  if (!NETWORKS[args.network]) {
    console.error('Error: Unknown network:', args.network);
    console.error('Supported networks:', Object.keys(NETWORKS).join(', '));
    process.exit(1);
  }
  
  // Address can be hex address or ENS/Basename - validation happens after resolution
  if (!args.address) {
    console.error('Error: Address parameter is required');
    process.exit(1);
  }
}

// Read source code from file
function readSourceCode(sourcePath) {
  try {
    const fullPath = path.resolve(process.cwd(), sourcePath);
    if (!fs.existsSync(fullPath)) {
      console.error('Error: Source file not found:', fullPath);
      process.exit(1);
    }
    return fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error('Error reading source file:', error.message);
    process.exit(1);
  }
}

// Make HTTP/HTTPS request
function makeRequest(url, postData) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const lib = isHttps ? https : http;
    
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          resolve({ status: '0', result: data });
        }
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Format POST data
function formatPostData(params) {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

// Resolve ENS or Basename to Ethereum address
// Note: Full ENS resolution requires keccak256 which isn't available in Node.js by default.
// This function provides a helpful error message directing users to resolve names manually.
async function resolveNameToAddress(name, network) {
  console.error('\n⚠️  ENS/Basename resolution requires additional cryptographic libraries.');
  console.error('Please resolve the name manually and use the hex address instead.');
  console.error('\nTo resolve', name, 'visit:');
  console.error('- https://app.ens.domains/ (for .eth names)');
  console.error('- https://www.base.org/names (for .base.eth names)');
  console.error('\nThen run the command again with: --address 0x...\n');
  process.exit(1);
}

// Verify contract on blockchain explorer
async function verifyContract() {
  console.log('Starting contract verification...\n');
  
  // Get network configuration
  const network = NETWORKS[args.network];
  console.log('Network:', network.name);
  
  // Resolve ENS/Basename if needed
  let contractAddress = args.address;
  if (args.address.endsWith('.eth')) {
    console.log(`Resolving ${args.address} to address...`);
    await resolveNameToAddress(args.address, network.name);
    // The function above will exit if ENS resolution is attempted
  } else if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
    console.error('Error: Invalid Ethereum address format');
    console.error('Address must be a hex address (0x...) or ENS/Basename (.eth)');
    process.exit(1);
  }
  
  console.log('Contract Address:', contractAddress);
  console.log('Contract Name:', args.name);
  console.log('Compiler Version:', args.compiler);
  
  // Get API key from environment
  const apiKey = process.env.ETHERSCAN_API_KEY;
  if (!apiKey) {
    console.error('\nError: ETHERSCAN_API_KEY environment variable not set');
    console.error('Please set your API key in .env.local or environment variables');
    process.exit(1);
  }
  
  // Read source code
  const sourceCode = readSourceCode(args.source);
  console.log('Source code loaded from:', args.source);
  console.log('Source code length:', sourceCode.length, 'characters\n');
  
  // Prepare verification parameters
  const params = {
    module: 'contract',
    action: 'verifysourcecode',
    apikey: apiKey,
    contractaddress: contractAddress,
    sourceCode: sourceCode,
    codeformat: 'solidity-single-file',
    contractname: args.name,
    compilerversion: args.compiler,
    optimizationUsed: args.optimization || '0',
    runs: args.runs || '200',
    constructorArguments: args['constructor-args'] || '',
    evmversion: args.evmversion || '',
    licenseType: args.license || '1' // 1 = No License
  };
  
  console.log('Submitting verification request...');
  
  try {
    // Submit verification request
    const postData = formatPostData(params);
    const response = await makeRequest(network.apiUrl, postData);
    
    if (response.status === '1') {
      const guid = response.result;
      console.log('✓ Verification request submitted successfully!');
      console.log('GUID:', guid);
      console.log('\nChecking verification status...');
      
      // Check verification status
      await checkVerificationStatus(network.apiUrl, apiKey, guid, contractAddress);
    } else {
      console.error('✗ Verification failed:', response.result);
      process.exit(1);
    }
  } catch (error) {
    console.error('✗ Error during verification:', error.message);
    process.exit(1);
  }
}

// Check verification status
async function checkVerificationStatus(apiUrl, apiKey, guid, contractAddress) {
  const maxAttempts = 10;
  const delayMs = 3000;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise(resolve => setTimeout(resolve, delayMs));
    
    const statusUrl = `${apiUrl}?module=contract&action=checkverifystatus&guid=${guid}&apikey=${apiKey}`;
    
    try {
      const response = await new Promise((resolve, reject) => {
        const parsedUrl = new URL(statusUrl);
        const lib = parsedUrl.protocol === 'https:' ? https : http;
        
        lib.get(statusUrl, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              resolve({ status: '0', result: data });
            }
          });
        }).on('error', reject);
      });
      
      console.log(`Attempt ${attempt}/${maxAttempts}:`, response.result);
      
      if (response.status === '1') {
        console.log('\n✓ Contract verified successfully!');
        const network = NETWORKS[args.network];
        console.log(`View on explorer: ${network.explorerUrl}/address/${contractAddress}#code`);
        return;
      } else if (response.result.includes('Fail') || response.result.includes('error')) {
        console.error('\n✗ Verification failed:', response.result);
        process.exit(1);
      }
    } catch (error) {
      console.error('Error checking status:', error.message);
    }
  }
  
  console.log('\n⚠ Verification is taking longer than expected.');
  console.log('You can check the status manually on the block explorer.');
}

// Main execution
validateArgs();
verifyContract().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
