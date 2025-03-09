---
title: Generating random numbers contracts using Supra dVRF
slug: /oracles-supra-vrf
description: A tutorial that teaches how to use Supra dVRF to serve random numbers using an onchain randomness generation mechanism directly within your smart contracts on the Base testnet.
author: taycaldwell
keywords: [
    Oracle
    Oracles,
    Supra,
    Supra VRF,
    Supra dVRF,
    VRF,
    verifiable random function,
    verifiable random functions,
    random numbers,
    rng,
    random number generator,
    random numbers in smart contracts,
    random numbers on Base,
    smart contract,
    Base blockchain,
    Base network,
    Base testnet,
    Base test network,
    app development,
    dapp development,
    build a dapp on Base,
    build on Base,
  ]
tags: ['oracles', 'vrf']
difficulty: intermediate
displayed_sidebar: null
---

This tutorial will guide you through the process of creating a smart contract on Base that utilizes Supra dVRF to serve random numbers using an onchain randomness generation mechanism directly within your smart contracts.



## Objectives

By the end of this tutorial you should be able to do the following:

- Set up a smart contract project for Base using Foundry
- Install the Supra dVRF as a dependency
- Use Supra dVRF within your smart contract
- Deploy and test your smart contracts on Base



## Prerequisites

### Foundry

This tutorial requires you to have Foundry installed.

- From the command-line (terminal), run: `curl -L https://foundry.paradigm.xyz | bash`
- Then run `foundryup`, to install the latest (nightly) build of Foundry

For more information, see the Foundry Book [installation guide](https://book.getfoundry.sh/getting-started/installation).

### Coinbase Wallet

In order to deploy a smart contract, you will first need a wallet. You can create a wallet by downloading the Coinbase Wallet browser extension.

- Download [Coinbase Wallet](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en)

### Wallet funds

Deploying contracts to the blockchain requires a gas fee. Therefore, you will need to fund your wallet with ETH to cover those gas fees.

For this tutorial, you will be deploying a contract to the Base Sepolia test network. You can fund your wallet with Base Sepolia ETH using one of the faucets listed on the Base [Network Faucets](https://docs.base.org/tools/network-faucets) page.

### Supra wallet registration

:::caution

Supra dVRF V2 requires subscription to the service with a customer controlled wallet address to act as the main reference.

Therefore you must register your wallet with the Supra team if you plan to consume Supra dVRF V2 within your smart contracts.

Please refer to the [Supra documentation](https://docs.supra.com/oracles/dvrf/vrf-subscription-model) for the latest steps on how to register your wallet for their service.

:::



## What is a Verifiable Random Function (VRF)?

A Verifiable Random Function (VRF) provides a solution for generating random outcomes in a manner that is both decentralized and verifiably recorded onchain. VRFs are crucial for applications where randomness integrity is paramount, such as in gaming or prize drawings.

Supra dVRF provides a decentralized VRF that ensures that the outcomes are not only effectively random but also responsive, scalable, and easily verifiable, thereby addressing the unique needs of onchain applications for trustworthy and transparent randomness.



## Creating a project

Before you can begin writing smart contracts for Base, you need to set up your development environment by creating a Foundry project.

To create a new Foundry project, first create a new directory:

```bash
mkdir myproject
```

Then run:

```bash
cd myproject
forge init
```

This will create a Foundry project, which has the following basic layout:

```bash
.
├── foundry.toml
├── script
 │   └── Counter.s.sol
├── src
 │   └── Counter.sol
└── test
    └── Counter.t.sol
```



## Writing the Smart Contract

Once your Foundry project has been created, you can now start writing a smart contract.

The Solidity code below defines a basic contract named `RNGContract`. The smart contract's constructor takes in a single `address` and assigns it to a member variable named `supraAddr`. This address corresponds to the [contract address](https://docs.supra.com/oracles/data-feeds/pull-oracle/networks) of the Supra Router Contract that will be used to generate random numbers. The contract address of the Supra Router Contract on Base Sepolia testnet is `0x99a021029EBC90020B193e111Ae2726264a111A2`.

The contract also assigns the contract deployer (`msg.sender`) to a member variable named `supraClientAddress`. This should be the client wallet address that is registered and whitelisted to use Supra VRF (see: [Prerequisites](#prerequisites)).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RNGContract {
    address supraAddr;
    address supraClientAddress;

    constructor(address supraSC) {
        supraAddr = supraSC;
        supraClientAddress = msg.sender;
    }
}
```

In your project, add the code provided above to a new file named `src/ExampleContract.sol`, and delete the `src/Counter.sol` contract that was generated with the project. (you can also delete the `test/Counter.t.sol` and `script/Counter.s.sol` files).

The following sections will guide you step-by-step on how to update your contract to generate random numbers using the Supra Router contract.

### Adding the Supra Router Contract interface

In order to help your contract (the requester contract) interact with the Supra Router contract and understand what methods it can call, you will need to add the following interface to your contract file.

```solidity
interface ISupraRouter {
	function generateRequest(string memory _functionSig, uint8 _rngCount, uint256 _numConfirmations, uint256 _clientSeed, address _clientWalletAddress) external returns(uint256);
	function generateRequest(string memory _functionSig, uint8 _rngCount, uint256 _numConfirmations, address _clientWalletAddress) external returns(uint256);
}
```

The `ISupraRouter` interface defines a `generateRequest` function. This function is used to create a request for random numbers. The `generateRequest` function is defined twice, because one of the definitions allows for an optional `_clientSeed` (defaults to `0`) for additional unpredictability.

:::info

Alternatively, you can add the `ISupraRouter` interface in a separate interface file and inherit the interface in your contract.

:::

### Adding a request function

Once you have defined the `ISupraRouter`, you are ready to add the logic to your smart contract for requesting random numbers.

For Supra dVRF, adding logic for requesting random numbers requires two functions:

- A request function
- A callback function

The request function is a custom function defined by the developer. There are no requirements when it comes to the signature of the request function.

The following code is an example of a request function named `rng` that requests random numbers using the Supra Router Contract. Add this function to your smart contract:

```solidity
function rng() external returns (uint256) {
    // Amount of random numbers to request
    uint8 rngCount = 5;
    // Amount of confirmations before the request is considered complete/final
    uint256 numConfirmations = 1;
    uint256 nonce = ISupraRouter(supraAddr).generateRequest(
        "requestCallback(uint256,uint256[])",
        rngCount,
        numConfirmations,
        supraClientAddress
    );
    return nonce;
    // store nonce if necessary (e.g., in a hashmap)
    // this can be used to track parameters related to the request in a lookup table
    // these can be accessed inside the callback since the response from supra will include the nonce
}
```

The `rng` function above requests `5` random numbers (defined by `rngCount`), and waits `1` confirmation (defined by `numConfirmations`) before considering the result to be final. It makes this request by calling the `generateRequest` function of the Supra Router contract, while providing a callback function with the signature `requestCallback(uint256,uint256[])`.

### Adding a callback function

As seen in the previous section, the `generateRequest` method of the Supra Router contract expects a signature for a callback function. This callback function must be of the form: `uint256 nonce, uint256[] calldata rngList`, and must include validation code, such that only the Supra Router contract can call the function.

To do this, add the following callback function (`requestCallback`) to your smart contract:

```solidity
function requestCallback(uint256 _nonce ,uint256[] _rngList) external {
    require(msg.sender == supraAddr, "Only the Supra Router can call this function.");
    uint8 i = 0;
    uint256[] memory x = new uint256[](rngList.length);
    rngForNonce[nonce] = x;
    for(i=0; i<rngList.length;i++){
        rngForNonce[nonce][i] = rngList[i] % 100;
    }
}
```

Once a random number is generated, `requestCallback` is executed by the Supra Router. The code above stores the resulting random numbers list in a map named `rngForNonce` using the `_nonce` argument. Because of this, you will need to add the following mapping to your contract:

```solidity
mapping (uint256 => uint256[] ) rngForNonce;
```

### Adding a function to view the result

To fetch resulting random numbers based on their associated `nonce`, you add a third function:

```solidity
function viewRngForNonce(uint256 nonce) external view returns (uint256[] memory) {
    return rngForNonce[nonce];
}
```

### Final smart contract code

After following all the steps above, your smart contract code should look like the following:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISupraRouter {
    function generateRequest(string memory _functionSig, uint8 _rngCount, uint256 _numConfirmations, uint256 _clientSeed, address _clientWalletAddress) external returns (uint256);
    function generateRequest(string memory _functionSig, uint8 _rngCount, uint256 _numConfirmations, address _clientWalletAddress) external returns (uint256);
}

contract RNGContract {
    address supraAddr;
    address supraClientAddress;

    mapping (uint256 => uint256[]) rngForNonce;

    constructor(address supraSC) {
        supraAddr = supraSC;
        supraClientAddress = msg.sender;
    }

    function rng() external returns (uint256) {
        // Amount of random numbers to request
        uint8 rngCount = 5;
        // Amount of confirmations before the request is considered complete/final
        uint256 numConfirmations = 1;
        uint256 nonce = ISupraRouter(supraAddr).generateRequest(
            "requestCallback(uint256,uint256[])",
            rngCount,
            numConfirmations,
            supraClientAddress
        );
        return nonce;
    }

    function requestCallback(uint256 _nonce, uint256[] memory _rngList) external {
        require(msg.sender == supraAddr, "Only the Supra Router can call this function.");
        uint8 i = 0;
        uint256[] memory x = new uint256[](_rngList.length);
        rngForNonce[_nonce] = x;
        for (i = 0; i < _rngList.length; i++) {
            rngForNonce[_nonce][i] = _rngList[i] % 100;
        }
    }

    function viewRngForNonce(uint256 nonce) external view returns (uint256[] memory) {
        return rngForNonce[nonce];
    }
}
```

:::caution
You must whitelist this smart contract under the wallet address you registered with Supra, and deposit funds to be paid for the gas fees associated with transactions for your callback function.

Follow the [guidance steps](https://supraoracles.com/docs/vrf/v2-guide#step-1-create-the-supra-router-contract-interface-1) provided by Supra for whitelisting your contract and depositing funds.

If you have not yet registered your wallet with Supra, see the [Prerequisites](#prerequisites) section.
:::



## Compiling the Smart Contract

To compile your smart contract code, run:

```bash
forge build
```



## Deploying the smart contract

### Setting up your wallet as the deployer

Before you can deploy your smart contract to the Base network, you will need to set up a wallet to be used as the deployer.

To do so, you can use the [`cast wallet import`](https://book.getfoundry.sh/reference/cast/cast-wallet-import) command to import the private key of the wallet into Foundry's securely encrypted keystore:

```bash
cast wallet import deployer --interactive
```

After running the command above, you will be prompted to enter your private key, as well as a password for signing transactions.

:::caution

For instructions on how to get your private key from Coinbase Wallet, visit the [Coinbase Wallet documentation](https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings#show-private-key).

**It is critical that you do NOT commit this to a public repo**.

:::

To confirm that the wallet was imported as the `deployer` account in your Foundry project, run:

```bash
cast wallet list
```

### Setting up environment variables for Base Sepolia

To setup your environment for deploying to the Base network, create an `.env` file in the home directory of your project, and add the RPC URL for the Base Sepolia testnet, as well as the Supra Router contract address for Base Sepolia testnet:

```
BASE_SEPOLIA_RPC="https://sepolia.base.org"
ISUPRA_ROUTER_ADDRESS=0x99a021029EBC90020B193e111Ae2726264a111A2
```

Once the `.env` file has been created, run the following command to load the environment variables in the current command line session:

```bash
source .env
```

### Deploying the smart contract to Base Sepolia

With your contract compiled and environment setup, you are ready to deploy the smart contract to the Base Sepolia Testnet!

For deploying a single smart contract using Foundry, you can use the `forge create` command. The command requires you to specify the smart contract you want to deploy, an RPC URL of the network you want to deploy to, and the account you want to deploy with.

To deploy the `RNGContract` smart contract to the Base Sepolia test network, run the following command:

```bash
forge create ./src/RNGContract.sol:RNGContract --rpc-url $BASE_SEPOLIA_RPC --constructor-args $ISUPRA_ROUTER_ADDRESS --account deployer
```

When prompted, enter the password that you set earlier, when you imported your wallet’s private key.

:::info

Your wallet must be funded with ETH on the Base Sepolia Testnet to cover the gas fees associated with the smart contract deployment. Otherwise, the deployment will fail.

To get testnet ETH for Base Sepolia, see the [prerequisites](#prerequisites).

:::

After running the command above, the contract will be deployed on the Base Sepolia test network. You can view the deployment status and contract by using a [block explorer](/chain/block-explorers).



## Interacting with the Smart Contract

Foundry provides the `cast` command-line tool that can be used to interact with the smart contract that was deployed and call the `getLatestPrice()` function to fetch the latest price of ETH.

To call the `getLatestPrice()` function of the smart contract, run:

```bash
cast call <DEPLOYED_ADDRESS> --rpc-url $BASE_SEPOLIA_RPC "rng()"
```

You should receive a `nonce` value.

You can use this `nonce` value to call the `viewRngForNonce(uint256)` function to get the resulting list of randomly generated numbers:

```bash
cast call <DEPLOYED_ADDRESS> --rpc-url $BASE_SEPOLIA_RPC "viewRngForNonce(uint256)" <NONCE>
```



## Conclusion

Congratulations! You have successfully deployed and interacted with a smart contract that generates a list of random numbers using Supra dVRF on the Base blockchain network.

To learn more about VRF and using Supra dVRF to generate random numbers within your smart contracts on Base, check out the following resources:

- [Oracles](https://docs.base.org/tools/oracles)
- [Supra dVRF - Developer Guide V2](https://supraoracles.com/docs/vrf/v2-guide)
