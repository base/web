---
title: Abstract Contracts
description: Learn how to make contracts that must be inherited by another contract.
hide_table_of_contents: false
---

# Abstract Contracts

[Abstract] contracts can't exist on their own. Their functionality can only be utilized by a contract that inherits from them. In this lesson, you'll learn how to create an abstract contract.

---

## Objectives

By the end of this lesson you should be able to:

- Use the virtual, override, and abstract keywords to create and use an abstract contract

---

## Abstract Contracts

Continue with your `Inheritance.sol` file. Add `ContractD` as an `abstract contract`. Add a `virtual` function called `whoAreYou` function, but do **not** add any implementation for that function.

<details>

<summary>Reveal code</summary>

```solidity
abstract contract ContractD {
    function whoAreYou() public virtual view returns (string memory);
}
```

</details>

<br/>

### Inheriting from an Abstract Function

Update `ContractA` to inherit from `ContractD`.

You'll get a slightly confusing error that `ContractA` needs to be marked as `abstract`. Doing so is **not** the correct fix.

```text
from solidity:
TypeError: Contract "ContractA" should be marked as abstract.
  --> contracts/Inheritance.sol:25:1:
   |
25 | contract ContractA is ContractB, ContractC, ContractD {
   | ^ (Relevant source part starts here and spans across multiple lines).
Note: Missing implementation:
 --> contracts/Inheritance.sol:6:5:
  |
6 |     function whoAreYou() public virtual view returns (string memory);
  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

The clue for the correct solution is further down: `Note:  Missing implementation:`

Only `abstract` contracts can declare functions that are not implemented. To fix this, provide an `override` implementation for `whoAreYou` in `ContractA`:

<details>

<summary>Reveal code</summary>

```solidity
function whoAreYou() public override pure returns (string memory) {
    return "I'm a person!";
}
```

</details>


---

## Conclusion

In this lesson, you've learned how to implement and inherit from an abstract contract.

---

[Abstract]: https://docs.soliditylang.org/en/v0.8.17/contracts.html?#abstract-contracts
