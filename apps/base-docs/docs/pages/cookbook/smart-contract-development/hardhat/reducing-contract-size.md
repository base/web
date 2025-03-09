---
title: 'Hardhat: Optimizing the size of smart contracts'
slug: /hardhat-profiling-size
description: A tutorial that teaches how to optimize the size of your smart contracts using Hardhat.
author: Edson Alcala and Brian Doyle
keywords:
  [
    Smart Contract Sizes,
    Hardhat Contract Sizer,
    Base network,
    Base blockchain,
    Blockchain,
    Contract Optimization,
    Inheritance,
    External Contracts,
    Solidity Optimizer,
    Smart Contract Development,
  ]
tags: ['smart contracts']
difficulty: beginner
hide_table_of_contents: false
displayed_sidebar: null
---

# Hardhat: Optimizing the size of smart contracts

In this tutorial, you'll learn how to profile and optimize smart contract sizes with Hardhat and the [Hardhat Contract Sizer] plugin.



## Objectives

By the end of this tutorial you should be able to:

- Use Hardhat Contract Sizer plugin to profile contract size
- Describe common strategies for managing the contract size limit
- Describe the impact that inheritance has on the byte code size limit
- Describe the impact that external contracts have on the byte code size limit
- Describe the impact of using libraries has on the byte code size limit
- Describe the impact of using the Solidity optimizer



## Overview

In the world of blockchain and Ethereum, optimizing smart contract sizes is crucial. Smaller contracts consume less gas during deployment and execution, which is translated into gas costs savings for your users. Fortunately, you can use in Hardhat the `hardhat-contract-sizer` plugin that helps you analyze and optimize the size of your smart contracts.

## Setting up the Hardhat Contract Sizer plugin



Hardhat Contract Sizer is a community-developed plugin that enables the profiling of smart contract by printing the size of your smart contracts in the terminal. This is helpful during development since it allows you to immediately identify potential issues with the size of your smart contracts. Keep in mind that the [maximum size of a smart contract in Ethereum] is 24 KiB.

To install, run `npm install -D hardhat-contract-sizer`.

Then, import `hardhat-contract-sizer` in `hardhat.config.ts`:

```solidity
import "hardhat-contract-sizer"
```

When finished, you are ready to use the plugin.

## Your first size profiling

Similar to the previous tutorials, you begin by profiling the smart contract `Lock.sol`.

Run `npx hardhat size-contracts`, which is a task added to Hardhat once you set up and configure the `hardhat-contract-sizer` plugin.

You are then able to see:

```
 ·------------------------|--------------------------------|--------------------------------·
 |  Solc version: 0.8.18  ·  Optimizer enabled: false      ·  Runs: 200                     │
 ·························|································|·································
 |  Contract Name         ·  Deployed size (KiB) (change)  ·  Initcode size (KiB) (change)  │
 ·························|································|·································
 |  BalanceReader         ·                      0.612 ()  ·                      0.644 ()  │
 ·························|································|·································
 |  Lock                  ·                      1.009 ()  ·                      1.461 ()  │
```

Although your contract is simple, you can see immediately the power of the `hardhat-contract-sizer` plugin, since it show you the size of your contracts.

## Common strategies to optimize contract sizes

<Video videoId='863776975' title='Manual Optimizations' />

In order to illustrate some of the strategies to optimize the size of your contracts, create two smart contracts, `Calculator.sol` and `ScientificCalculator.sol`, with the following:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Calculator {
    function add(uint256 a, uint256 b) external pure returns(uint256) {
        require(a > 0 && b > 0, "Invalid values");
        return a + b;
    }

    function sub(uint256 a, uint256 b) external pure returns(uint256) {
        require(a > 0 && b > 0, "Invalid values");
        return a - b;
    }

    function mul(uint256 a, uint256 b) external pure returns(uint256) {
       require(a > 0 && b > 0, "Invalid values");
       return a * b;
    }

    function div(uint256 a, uint256 b) external pure returns(uint256) {
        require(a > 0 && b > 0, "Invalid values");
        return a / b;
    }
}
```

```solidity
contract ScientificCalculator is Calculator {
    function power(uint256 base, uint256 exponent) public pure returns (uint256) {
        require(base > 0 && exponent > 0, "Invalid values");

        return base ** exponent;
    }
}
```

Then, run the command `npx hardhat size-contracts` again and you should be able to see:

```
 ·------------------------|--------------------------------|--------------------------------·
 |  Solc version: 0.8.18  ·  Optimizer enabled: false      ·  Runs: 200                     │
 ·························|································|·································
 |  Contract Name         ·  Deployed size (KiB) (change)  ·  Initcode size (KiB) (change)  │
 ·························|································|·································
 |  BalanceReader         ·                 0.612 (0.000)  ·                 0.644 (0.000)  │
 ·························|································|·································
 |  Lock                  ·                 1.009 (0.000)  ·                 1.461 (0.000)  │
 ·························|································|·································
 |  Calculator            ·                      1.299 ()  ·                      1.330 ()  │
 ·························|································|·································
 |  ScientificCalculator  ·                      1.827 ()  ·                      1.858 ()  │
 ·------------------------|--------------------------------|--------------------------------·
```

Notice how the size of `ScientificCalculator` is bigger than `Calculator`. This is because `ScientificCalculator` is inheriting the contract `Calculator`, which means all of its functionality and code is available in `ScientificCalculator` and that will influence its size.

### Code abstraction and modifiers

At this point as a smart contract developer, you can review your smart contract code and look for ways into you can optimize it.

The first thing you notice in the source code is the extensive use of:

```solidity
require(a > 0 && b > 0, "Invalid values");
```

A possible optimization is to abstract repetitive code into [modifiers], such as the following:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Calculator {
    error InvalidInput();

    function add(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
        return a + b;
    }

    function sub(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
        return a - b;
    }

    function mul(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
       return a * b;
    }

    function div(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
        return a / b;
    }

    modifier onlyValidInputs(uint256 a, uint256 b) {
        if(a == 0 && b == 0){
            revert InvalidInput();
        }
        _;
    }
}
```

And for `ScientificCalculator`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./Calculator.sol";

contract ScientificCalculator is Calculator {
    function power(uint256 base, uint256 exponent) public pure onlyValidInputs(base,exponent) returns (uint256) {
        return base ** exponent;
    }
}
```

Notice the usage of the modifier and the replacement of the require to use a custom error.

When you run the `npx hardhat size-contracts` command, you should be able to see:

```
 ·------------------------|--------------------------------|--------------------------------·
 |  Solc version: 0.8.18  ·  Optimizer enabled: false      ·  Runs: 200                     │
 ·························|································|·································
 |  Contract Name         ·  Deployed size (KiB) (change)  ·  Initcode size (KiB) (change)  │
 ·························|································|·································
 |  BalanceReader         ·                 0.612 (0.000)  ·                 0.644 (0.000)  │
 ·························|································|·································
 |  Lock                  ·                 1.009 (0.000)  ·                 1.461 (0.000)  │
 ·························|································|·································
 |  Calculator            ·                 1.165 (0.000)  ·                 1.196 (0.000)  │
 ·························|································|·································
 |  ScientificCalculator  ·                 1.690 (0.000)  ·                 1.722 (0.000)  │
 ·------------------------|--------------------------------|--------------------------------·
```

Although the optimization is small, you can see that there are some improvements.

You can continue this process until you feel comfortable with the size of the contract.

### Split into multiple contracts

It is common to split your smart contracts into multiple contracts, not only because of the size limitations but to create better abstractions, to improve readability, and to avoid repetition.

From a contract size perspective, having multiple independent contracts will reduce the size of each contract. For example, the original size of a smart contract was 30 KiB: by splitting into 2, you will end up with 2 smart contracts of ~15 KiB that are within the limits of Solidity. Keep in mind that this will influence gas costs during the execution of the contract because it will require it to call an external contract.

In order to explain this example, create a contract called `Computer` that contains a function called `executeProcess`:

```tsx
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract Computer {
     function executeProcess() external view {
        // ...logic to be implemented
    }
}
```

In this example, the `executeProcess` function of `Computer` requires certain functionality of `Calculator` and a new contract called `Printer`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract Printer {
     function print(string memory _content) external view {
        require(bytes(_content).length > 0, "invalid length");
        console.log(_content);
    }
}
```

The easiest way for `Computer` to access both functionalities is to inherit; however, as all of these contracts continue adding functionality, the size of the code will also increase. You will reach the contract size issue at some point, since you are copying the entire functionality into your contract. You can better allow that functionality to be kept with their specific contracts and if the `Computer` requires to access that functionality, you could call the `Calculator` and `Printer` contracts.

But in this example, there is a process that must call both `Calculator` and `Printer`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "hardhat/console.sol";

import "./Calculator.sol";
import "./Printer.sol";

contract Computer {
    Calculator calculator;
    Printer printer;

    constructor(address _calculator, address _printer) {
        calculator = Calculator(_calculator);
        printer = Printer(_printer);
    }

    function executeProcess() external view {
        // call Calculator contract, i.e calculator.add(a, b);
        // call Printer contract, i.e printer.print("value to print");
    }
}
```

If you run the contract sizer plugin, you get:

```
 ·------------------------|--------------------------------|--------------------------------·
 |  Solc version: 0.8.18  ·  Optimizer enabled: true       ·  Runs: 10000                   │
 ·························|································|·································
 |  Contract Name         ·  Deployed size (KiB) (change)  ·  Initcode size (KiB) (change)  │
 ·························|································|·································
 |  console               ·                 0.084 (0.000)  ·                 0.138 (0.000)  │
 ·························|································|·································
 |  Computer              ·                 0.099 (0.000)  ·                 0.283 (0.000)  │
 ·························|································|·································
 |  Calculator            ·                 0.751 (0.000)  ·                 0.782 (0.000)  │
 ·························|································|·································
 |  Printer               ·                 0.761 (0.000)  ·                 0.792 (0.000)  │
 ·························|································|·································
 |  ScientificCalculator  ·                 1.175 (0.000)  ·                 1.206 (0.000)  │
 ·------------------------|--------------------------------|--------------------------------·
```

Notice how your `Computer` contract is very small but still has the capability to access all the functionality of `Printer` and `Calculator`.

Although this will reduce the size of each contract, the costs of this are discussed more deeply in the [Gas Optimization] article.

### Using libraries

Libraries are another common way to encapsulate and abstract common functionality that can be shared across multiple contracts. This can significantly impact the bytecode size of the smart contracts. Remember that in Solidity, libraries can be external and internal.

The way internal libraries affect the contract size is very similar to the way inherited contracts affects a contract's size; this is because the internal functions of the library is included within the final bytecode.

But when the libraries are external, the behavior is different: the way Solidity calls external libraries is by using a special function called [delegate call].

External libraries are commonly deployed independently and can be reused my multiple contracts. Since libraries don't keep a state, they behave like pure functions in the Blockchain.

In this example, your computer will use the `Calculator` library only. Then, you would have the following:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

library Calculator {
    error InvalidInput();

    function add(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
        return a + b;
    }

    function sub(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
        return a - b;
    }

    function mul(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
       return a * b;
    }

    function div(uint256 a, uint256 b) external pure onlyValidInputs(a,b) returns(uint256) {
        return a / b;
    }

    modifier onlyValidInputs(uint256 a, uint256 b) {
        if(a == 0 && b == 0){
            revert InvalidInput();
        }
        _;
    }
}
```

Then, `Computer` is:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "hardhat/console.sol";

import "./Calculator.sol";
import "./Printer.sol";

contract Computer {
    using Calculator for uint256;

    function executeProcess() external view {
        uint256 a = 1;
        uint256 b = 2;
        uint256 result = a.add(b);
        // ... logic to be implemented
    }
}
```

Notice how you instructing the smart contract to use the `Calculator` library for `uint256` and how in the `executeProcess` function, you can now use the `add` function from the `Calculator` library in all of the `uint256`.

If you run the `npx hardhat size-contracts` command, you then get:

```
 ·------------------------|--------------------------------|--------------------------------·
 |  Solc version: 0.8.18  ·  Optimizer enabled: true       ·  Runs: 10000                   │
 ·························|································|·································
 |  Contract Name         ·  Deployed size (KiB) (change)  ·  Initcode size (KiB) (change)  │
 ·························|································|·································
 |  Calculator            ·                 0.761          ·                 0.817          │
 ·························|································|·································
 |  Printer               ·                 0.771          ·                 0.827          │
 ·························|································|·································
 |  Computer              ·                0.961           ·                0.992           │
 ·------------------------|--------------------------------|--------------------------------·
```

In order to compare the impact, you can modify the external modifier from all of the `Calculator` library functions and you will then have:

```
 ·------------------------|--------------------------------|--------------------------------·
 |  Solc version: 0.8.18  ·  Optimizer enabled: true       ·  Runs: 10000                   │
 ·························|································|·································
 |  Contract Name         ·  Deployed size (KiB) (change)  ·  Initcode size (KiB) (change)  │
 ·························|································|·································
 |  Calculator            ·                 0.084          ·                 0.138          │
 ·························|································|·································
 |  Printer               ·                0.084           ·                0.138           │
 ·························|································|·································
 |  Computer              ·                1.139           ·                1.170           │
 ·------------------------|--------------------------------|--------------------------------·
```

Which demonstrates why using external libraries can be a good option in order to optimize the size of your contracts.

### Using the Solidity compiler optimizer

<Video videoId='863777593' title='Using the Optimizer' />

Another way to optimize the size of the smart contracts is to simply use the Solidity optimizer.

From the [Solidity official docs]:

> Overall, the optimizer tries to simplify complicated expressions, which reduces both code size and execution cost.

You can enable the solidity optimizer in hardhat by simply adding the following to the `hardhat.config.ts` file:

```solidity
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  ...
}
```

Notice the optimizer is enabled and has a parameter `runs`. If you run the contract sizer command again, you will see the following:

```
 ·------------------------|--------------------------------|--------------------------------·
 |  Solc version: 0.8.18  ·  Optimizer enabled: true       ·  Runs: 200                     │
 ·························|································|·································
 |  Contract Name         ·  Deployed size (KiB) (change)  ·  Initcode size (KiB) (change)  │
 ·························|································|·································
 |  BalanceReader         ·                0.351 (-0.262)  ·                0.382 (-0.262)  │
 ·························|································|·································
 |  Lock                  ·                0.471 (-0.538)  ·                0.661 (-0.800)  │
 ·························|································|·································
 |  Calculator            ·                0.604 (-0.561)  ·                0.636 (-0.561)  │
 ·························|································|·································
 |  ScientificCalculator  ·                0.930 (-0.761)  ·                0.961 (-0.761)  │
 ·------------------------|--------------------------------|--------------------------------·
```

Notice the bigger improvement, but see what happens if you increase the `runs` parameter value to 1000:

```
 ·------------------------|--------------------------------|--------------------------------·
 |  Solc version: 0.8.18  ·  Optimizer enabled: true       ·  Runs: 1000                    │
 ·························|································|·································
 |  Contract Name         ·  Deployed size (KiB) (change)  ·  Initcode size (KiB) (change)  │
 ·························|································|·································
 |  BalanceReader         ·                0.400 (+0.050)  ·                0.432 (+0.050)  │
 ·························|································|·································
 |  Lock                  ·                0.537 (+0.066)  ·                0.728 (+0.066)  │
 ·························|································|·································
 |  Calculator            ·                 0.604 (0.000)  ·                 0.636 (0.000)  │
 ·························|································|·································
 |  ScientificCalculator  ·                0.945 (+0.016)  ·                0.977 (+0.016)  │
 ·------------------------|--------------------------------|--------------------------------·
```

The size of the contract increased, however this means your code will be more efficient across the lifetime of the contract because the higher the `runs` value the more efficient during execution but more expensive during deployment. You can read more in the [Solidity documentation].

## Conclusion

In this tutorial, you've learned how to profile and optimise smart contracts using the Hardhat development environment and the Hardhat Contract Sizer plugin. By focusing on the critical aspect of contract size, we've equipped ourselves with tools and strategies to create more efficient Solidity code.

As you continue your journey in smart contract development, keep in mind that optimizing contract sizes is a continuous process that requires careful consideration of trade-offs between size, readability, and gas efficiency.


[Hardhat Contract Sizer]: https://github.com/ItsNickBarry/hardhat-contract-sizer
[maximum size of a smart contract in Ethereum]: https://ethereum.org/en/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/#why-is-there-a-limit
[modifiers]: https://docs.base.org/base-learn/docs/advanced-functions/function-modifiers
[Solidity official docs]: https://docs.soliditylang.org/en/v0.8.20/internals/optimizer.html
[Delegate call]: https://solidity-by-example.org/delegatecall/
[Gas Optimization]: ./hardhat-profiling-gas
[Solidity documentation]: https://docs.soliditylang.org/en/v0.8.20/internals/optimizer.html#optimizer-parameter-runs
