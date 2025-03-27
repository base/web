---
title: 'Hardhat: Optimizing the gas usage of smart contracts'
slug: /hardhat-profiling-gas
description: A tutorial that teaches how to optimize the gas usage of your smart contracts using Hardhat.
author: Edson Alcala and Brian Doyle
---

# Hardhat: Optimizing the gas usage of smart contracts

In this tutorial, you'll learn how to profile and optimize your smart contract's gas usage with Hardhat and the [Hardhat Gas Reporter] plugin.



## Objectives

By the end of this tutorial you should be able to:

- Use the Hardhat Gas Reporter plugin to profile gas usage
- Describe common strategies for improving the gas usage of a contract



## Overview

In the world of smart contract development, optimizing the gas consumption of your smart contracts is important. Smaller contracts consume fewer gas resources during deployment and execution, resulting in significant cost savings for your users. In this tutorial, you will leverage the Hardhat Gas Reporter plugin to help you analyze and optimize your smart contract's gas usage.

The following provides further information about smart contract profiling and gas optimization.

## Setting up the Hardhat Gas Reporter plugin

<Video videoId='867220421' title='Installing the Gas Analyzer' />

The Hardhat Gas Reporter plugin is an invaluable tool for profiling gas usage in your smart contracts. It allows you to gain insights into the gas consumption of various contract functions, making it easier to identify potential optimization opportunities. This tool is particularly useful during development when you want to ensure your contracts are as gas-efficient as possible.

To install, run `npm install -D hardhat-gas-reporter`.

Then, import `hardhat-gas-reporter` in `hardhat.config.ts`:

```solidity
import "hardhat-gas-reporter"
```

Configure the plugin in the `hardhat.config.ts` file:

```tsx
const config: HardhatUserConfig = {
  // ....
  gasReporter: {
    enabled: true,
  },
};
```

When finished, you are ready to use the plugin.

## Your first gas profiling

Create a contract called `Store` with the following settings:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Store {
    address public owner;
    uint256 public numberOfItems;

    struct Item {
        uint256 id;
        string description;
        uint256 price;
    }

    // id => item
    mapping(uint256 => Item) public items;

    constructor() {
        owner = msg.sender;
    }

    function addItem(string memory description, uint256 price) external {
        require(msg.sender == owner, "invalid owner");

        numberOfItems++;

        items[numberOfItems] = Item(
            numberOfItems,
            description,
            price
        );
    }
}

```

Add a test file called `Store.test.ts` in order to test the gas reporter plugin. The test file should contain the following:

```tsx
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

import { Store, Store__factory } from '../typechain-types';

describe('Store tests', function () {
  let instance: Store;
  let owner: HardhatEthersSigner;

  before(async () => {
    const signers = await ethers.getSigners();
    owner = signers[0];
    instance = await new Store__factory().connect(owner).deploy();
  });

  it('should add an item', async () => {
    const description = 'TShirt';
    const price = ethers.parseEther('1');

    await instance.addItem(description, price);

    expect(await instance.numberOfItems()).to.equal(1);
  });
});
```

Run `npx hardhat test`. The following report appears:

```
·------------------------|---------------------------|---------------|-----------------------------·
|  Solc version: 0.8.18  ·  Optimizer enabled: true  ·  Runs: 10000  ·  Block limit: 30000000 gas  │
·························|···························|···············|······························
|  Methods                                                                                         │
·············|···········|·············|·············|···············|···············|··············
|  Contract  ·  Method   ·  Min        ·  Max        ·  Avg          ·  # calls      ·  usd (avg)  │
·············|···········|·············|·············|···············|···············|··············
|  Store     ·  addItem  ·          -  ·          -  ·       113601  ·            1  ·          -  │
·············|···········|·············|·············|···············|···············|··············
|  Deployments           ·                                           ·  % of limit   ·             │
·························|·············|·············|···············|···············|··············
|  Store                 ·          -  ·          -  ·       428837  ·        1.4 %  ·          -  │
·------------------------|-------------|-------------|---------------|---------------|-------------·
```

The reporter provides a detailed overview of the gas costs for the function `addItem` and the deployment costs.

## Common strategies to optimize contract sizes

<Video videoId='867222700' title='Improving Gas Usage' />

After performing the first gas profiling, you can start ideating strategies to improve the gas costs. These strategies are certainly vast and this tutorial only covers some basic examples.

### Using the optimizer

From the previous report, you can identify that the optimizer of the project has a value of 10000 runs. This means the deployment costs will be more expensive. However, if you modify that value to 200, you get:

```
·------------------------|---------------------------|-------------|-----------------------------·
|  Solc version: 0.8.18  ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·························|···························|·············|······························
|  Methods                                                                                       │
·············|···········|·············|·············|·············|···············|··············
|  Contract  ·  Method   ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·············|···········|·············|·············|·············|···············|··············
|  Store     ·  addItem  ·          -  ·          -  ·     113619  ·            1  ·          -  │
·············|···········|·············|·············|·············|···············|··············
|  Deployments           ·                                         ·  % of limit   ·             │
·························|·············|·············|·············|···············|··············
|  Store                 ·          -  ·          -  ·     357505  ·        1.2 %  ·          -  │
·------------------------|-------------|-------------|-------------|---------------|-------------·
```

This automatically gives you some improvements for deployment gas costs but slightly more for transaction executions.

### Using immutable variables

In our `Store` contract, you can identify certain variables that are only set during the creation of the contract. This means that an opportunity is possible to turn those variables into immutable, since immutable variables can still be assigned at construction time.

If you modify the `Store` contract to:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Store {
    address immutable owner;
    uint256 public numberOfItems;

    struct Item {
        uint256 id;
        string description;
        uint256 price;
    }

    // id => item
    mapping(uint256 => Item) public items;

    constructor() {
        owner = msg.sender;
    }

    function addItem(string memory description, uint256 price) external {
        require(msg.sender == owner, "invalid owner");

        numberOfItems++;

        items[numberOfItems] = Item(
            numberOfItems,
            description,
            price
        );
    }
}
```

Then, run the gas reporter. You should see:

```
·------------------------|---------------------------|-------------|-----------------------------·
|  Solc version: 0.8.18  ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·························|···························|·············|······························
|  Methods                                                                                       │
·············|···········|·············|·············|·············|···············|··············
|  Contract  ·  Method   ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·············|···········|·············|·············|·············|···············|··············
|  Store     ·  addItem  ·          -  ·          -  ·     111525  ·            1  ·          -  │
·············|···········|·············|·············|·············|···············|··············
|  Deployments           ·                                         ·  % of limit   ·             │
·························|·············|·············|·············|···············|··············
|  Store                 ·          -  ·          -  ·     329580  ·        1.1 %  ·          -  │
·------------------------|-------------|-------------|-------------|---------------|-------------·
```

Which already presents some improvements.

### Avoid unnecessary data storage

Storing data and not storing data in a smart contract is a design decision that has pros and cons. Some of the pros are certainly that all the information is stored in the smart contract and you don't necessarily need to rely on events or any other service to access the storage of a contract. However, the cons of storing all the information on the contract is the fact that it will be more expensive to perform actions against the smart contract.

In the `Store` smart contract, you have the following:

```solidity
struct Item {
        uint256 id;
        string description;
        uint256 price;
    }

// id => item
mapping(uint256 => Item) public items;
```

Looking closely, you can see that the `Id` of the `Item` struct and the `id` used in the mapping are similar. You can avoid duplicating this information by removing the id of the `Item` struct.

The contract looks like:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Store {
    address immutable owner;
    uint256 public numberOfItems;

    struct Item {
        string description;
        uint256 price;
    }

    // id => item
    mapping(uint256 => Item) public items;

    constructor() {
        owner = msg.sender;
    }

    function addItem(string memory description, uint256 price) external {
        require(msg.sender == owner, "invalid owner");

        numberOfItems++;

        items[numberOfItems] = Item(
            description,
            price
        );
    }
}
```

If you run the gas reporter, you then get:

```
·------------------------|---------------------------|-------------|-----------------------------·
|  Solc version: 0.8.18  ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·························|···························|·············|······························
|  Methods                                                                                       │
·············|···········|·············|·············|·············|···············|··············
|  Contract  ·  Method   ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·············|···········|·············|·············|·············|···············|··············
|  Store     ·  addItem  ·          -  ·          -  ·      89371  ·            1  ·          -  │
·············|···········|·············|·············|·············|···············|··············
|  Deployments           ·                                         ·  % of limit   ·             │
·························|·············|·············|·············|···············|··············
|  Store                 ·          -  ·          -  ·     322251  ·        1.1 %  ·          -  │
·------------------------|-------------|-------------|-------------|---------------|-------------·
```

This presents another improvement in the gas consumption of the `Store` smart contract. However, you can go further and instead of storing the items in a `mapping`, you can simply emit `events` and use the events as a cheap form of storage.

For instance, you can modify the contract to look like:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Store {
    address immutable owner;
    uint256 public numberOfItems;

    struct Item {
        string description;
        uint256 price;
    }

    event ItemCreated(uint256 id, Item item);

    constructor() {
        owner = msg.sender;
    }

    function addItem(string memory description, uint256 price) external {
        require(msg.sender == owner, "invalid owner");

        numberOfItems++;

        emit ItemCreated(numberOfItems, Item(description, price));
    }
}
```

Notice how instead of storing the items, you emit an `ItemCreated` event, which reduces the gas costs for deployment and execution:

```
·------------------------|---------------------------|-------------|-----------------------------·
|  Solc version: 0.8.18  ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·························|···························|·············|······························
|  Methods                                                                                       │
·············|···········|·············|·············|·············|···············|··············
|  Contract  ·  Method   ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·············|···········|·············|·············|·············|···············|··············
|  Store     ·  addItem  ·          -  ·          -  ·      47315  ·            1  ·          -  │
·············|···········|·············|·············|·············|···············|··············
|  Deployments           ·                                         ·  % of limit   ·             │
·························|·············|·············|·············|···············|··············
|  Store                 ·          -  ·          -  ·     208252  ·        0.7 %  ·          -  │
·------------------------|-------------|-------------|-------------|---------------|-------------·
```

As you can see, the improvements in terms of gas consumption are significant. However, the draw back is that now in order to access all of the items, you must go through all of the `ItemCreated` events emitted by the contract.

### Using custom errors

Another common way to optimize gas costs is by removing `require`s and use custom errors. For instance, you can do the following:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Store {
    address immutable owner;
    uint256 public numberOfItems;

    error InvalidOwner();

    struct Item {
        string description;
        uint256 price;
    }

    event ItemCreated(uint256 id, Item item);

    constructor() {
        owner = msg.sender;
    }

    function addItem(string memory description, uint256 price) external {
        if(msg.sender != owner){
            revert InvalidOwner();
        }

        numberOfItems++;

        emit ItemCreated(numberOfItems, Item(description, price));
    }
}
```

Which gives you the following report:

```
·------------------------|---------------------------|-------------|-----------------------------·
|  Solc version: 0.8.18  ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·························|···························|·············|······························
|  Methods                                                                                       │
·············|···········|·············|·············|·············|···············|··············
|  Contract  ·  Method   ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·············|···········|·············|·············|·············|···············|··············
|  Store     ·  addItem  ·          -  ·          -  ·      47315  ·            1  ·          -  │
·············|···········|·············|·············|·············|···············|··············
|  Deployments           ·                                         ·  % of limit   ·             │
·························|·············|·············|·············|···············|··············
|  Store                 ·          -  ·          -  ·     200683  ·        0.7 %  ·          -  │
·------------------------|-------------|-------------|-------------|---------------|-------------·
```

Notice the improvement in deployment gas costs.

## Conclusion

In this tutorial, you've learned some common strategies to profile and optimize the gas usage of your smart contracts using the Hardhat development environment and the Hardhat Gas Reporter plugin. By implementing these strategies and leveraging the Hardhat Gas Reporter plugin, you can create more efficient and cost-effective smart contracts for the benefit of the users, since this means less gas costs.

---

[Hardhat Gas Reporter]: https://www.npmjs.com/package/hardhat-gas-reporter
