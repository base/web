---
title: Inheritance
description: Learn how to use inheritance to bring functionality from one contract into another.
hide_table_of_contents: false
---

# Inheritance

Solidity is an object-oriented language. Contracts can inherit from one another, allowing efficient reuse of code.

---

## Objectives

By the end of this lesson you should be able to:

- Write a smart contract that inherits from another contract
- Describe the impact inheritance has on the byte code size limit

---

## Inheritance

Create a new contract file in Remix called `Inheritance.sol` and add two simple contracts, each with a function identifying which contract called it:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract ContractB {
    function whoAmI() external pure returns (string memory) {
        return "contract B";
    }
}

contract ContractA {
    function whoAmI() external pure returns (string memory) {
        return "contract A";
    }
}
```

`ContractA` says that it is "contract A" and `ContractB` says that it is "contract B".

### Inheriting from Another Contract

[Inheritance] between contracts is indicated by the `is` keyword in the contract declaration. Update `ContractA` so that it `is` `ContractB`, and delete the `whoAmI` function from `ContractA`.

<details>

<summary>Reveal code</summary>

```solidity
contract ContractB {
    function whoAmI() external pure returns (string memory) {
        return "contract B";
    }
}

contract ContractA is ContractB {

}
```

</details>

<br/>

Deploy and test again. Even though `ContractA` doesn't have any functions in it, the deployment still shows the button to call `whoAmI`. Call it. `ContractA` now reports that it is "contract B", due to the inheritance of the function from `Contract B`.

### Internal Functions and Inheritance

Contracts can call the `internal` functions from contracts they inherit from. Add an `internal` function to `ContractB` called `whoAmIInternal` that returns "contract B".

Add an external function called `whoAmIExternal` that returns the results of a call to `whoAmIInternal`.

<details>

<summary>Reveal code</summary>

```solidity
contract ContractB {
    function whoAmI() external pure returns (string memory) {
        return "contract B";
    }

    function whoAmIInternal() internal pure returns (string memory) {
        return "contract B";
    }
}

contract ContractA is ContractB {
    function whoAmExternal() external pure returns (string memory) {
        return whoAmIInternal();
    }
}
```

</details>

<br/>

Deploy and test. Note that in the deployment for `ContractB`, the `whoAmIInternal` function is **not** available, as it is `internal`. However, calling `whoAmIExternal` can call the `internal` function and return the expected result of "contract B".

### Internal vs. Private

You cannot call a `private` function from a contract that inherits from the contract containing that function.

```solidity
// Bad code example, do not use
contract ContractB {
    function whoAmIPrivate() private pure returns (string memory) {
        return "contract B";
    }
}

contract ContractA is ContractB {
    function whoAmExternal() external pure returns (string memory) {
        return whoAmIPrivate();
    }
}
```

The compiler will raise an error:

```text
from solidity:
DeclarationError: Undeclared identifier.
  --> contracts/Inheritance.sol:17:16:
   |
17 |         return whoAmIPrivate();
   |                ^^^^^^^^^^^^^
```

### Inheritance and Contract Size

A contract that inherits from another contract will have that contract's bytecode included within its own. You can view this by opening settings in Remix and turning _Artifact Generation_ back on. The bytecode for each compiled contract will be present in the JSON file matching that contract's name within the `artifacts` folder.

Any empty contract:

```solidity
contract EmptyContract {

}
```

Will compile into something similar to this:

```text
6080604052600080fdfea2646970667358221220df894b82f904e22617d7e40150306e2d2e8cb2ca5dcacb666a0c3d40f5f988c464736f6c63430008110033
```

A slightly more complex contract:

```solidity
contract notEmptyContract {
    function sayHello() public pure returns (string memory) {
        return "To whom it may concern, I write you after a long period of silence to alert you that after much reflection, it occurs to me that I don't think you have fully considered...";
    }
}
```

Will have more complex bytecode. In this case, mostly to store the long string present in the return:

```text
608060405234801561001057600080fd5b50610201806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063ef5fb05b14610030575b600080fd5b61003861004e565b60405161004591906100fe565b60405180910390f35b60606040518060e0016040528060ab815260200161012160ab9139905090565b600081519050919050565b600082825260208201905092915050565b60005b838110156100a857808201518184015260208101905061008d565b60008484015250505050565b6000601f19601f8301169050919050565b60006100d08261006e565b6100da8185610079565b93506100ea81856020860161008a565b6100f3816100b4565b840191505092915050565b6000602082019050818103600083015261011881846100c5565b90509291505056fe546f2077686f6d206974206d617920636f6e6365726e2c204920777269746520796f752061667465722061206c6f6e6720706572696f64206f662073696c656e636520746f20616c65727420796f752074686174206166746572206d756368207265666c656374696f6e2c206974206f636375727320746f206d652074686174204920646f6e2774207468696e6b20796f7520686176652066756c6c7920636f6e736964657265642e2e2ea264697066735822122058d68a2853aaa473c9a5ff4dba0cc94657cb2a5a87ce3a986090a7ab991055a464736f6c63430008110033
```

However, if the empty contract inherits from the not empty contract:

```solidity
contract EmptyContract is notEmptyContract {

}
```

The resulting bytecode will include that of the contract inherited from:

```text
608060405234801561001057600080fd5b50610201806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063ef5fb05b14610030575b600080fd5b61003861004e565b60405161004591906100fe565b60405180910390f35b60606040518060e0016040528060ab815260200161012160ab9139905090565b600081519050919050565b600082825260208201905092915050565b60005b838110156100a857808201518184015260208101905061008d565b60008484015250505050565b6000601f19601f8301169050919050565b60006100d08261006e565b6100da8185610079565b93506100ea81856020860161008a565b6100f3816100b4565b840191505092915050565b6000602082019050818103600083015261011881846100c5565b90509291505056fe546f2077686f6d206974206d617920636f6e6365726e2c204920777269746520796f752061667465722061206c6f6e6720706572696f64206f662073696c656e636520746f20616c65727420796f752074686174206166746572206d756368207265666c656374696f6e2c206974206f636375727320746f206d652074686174204920646f6e2774207468696e6b20796f7520686176652066756c6c7920636f6e736964657265642e2e2ea264697066735822122088e486b0a77cd3e2ce809e0a086052815913daec73ebd731e30496d650784f7664736f6c63430008110033
```

---

## Conclusion

In this lesson, you've learned how to use inheritance to include the functionality of one contract in another. You've also learned that inheriting contracts can call `internal` functions, but they cannot call `private` functions. You've also learned that inheriting from a contract adds the size of that contract's bytecode to the total deployed size.

---

[Inheritance]: https://docs.soliditylang.org/en/v0.8.17/contracts.html
