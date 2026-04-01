// SPDX-License-Identifier: MIT
// Note: Using ^0.4.18 allows compatibility with 0.4.18-0.4.26
// The 'emit' keyword requires 0.4.21+, so this contract needs 0.4.21+
pragma solidity ^0.4.18;

contract Test12345 {
    address public owner;
    address public pendingOwner;
    string public test;
    
    // Event emitted when test value is updated (emits hash for privacy)
    event ValueUpdated(bytes32 indexed valueHash, address indexed updatedBy);
    
    // Event emitted when ownership transfer is initiated
    event OwnershipTransferInitiated(address indexed currentOwner, address indexed pendingOwner);
    
    // Event emitted when ownership transfer is completed
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    // Event emitted when ownership transfer is cancelled
    event OwnershipTransferCancelled(address indexed owner, address indexed cancelledPendingOwner);
    
    // Constructor to set the contract owner
    // Note: Solidity 0.4.x uses function name matching contract name
    // Modern Solidity (0.5.0+) uses 'constructor' keyword instead
    function Test12345() public {
        owner = msg.sender;
    }
    
    // Modifier to restrict access to owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Modifier to restrict access to pending owner only
    modifier onlyPendingOwner() {
        require(msg.sender == pendingOwner, "Only pending owner can call this function");
        _;
    }
    
    // Update the test value (only owner can call)
    function enterValue(string _c) public onlyOwner {
        require(bytes(_c).length > 0, "Value cannot be empty");
        require(bytes(_c).length <= 256, "Value too long");
        test = _c;
        // Emit hash of value for privacy (blockchain data is public)
        emit ValueUpdated(keccak256(bytes(_c)), msg.sender);
    }
    
    // Step 1: Initiate ownership transfer (only current owner can call)
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        require(newOwner != owner, "Already the owner");
        pendingOwner = newOwner;
        emit OwnershipTransferInitiated(owner, newOwner);
    }
    
    // Step 2: Accept ownership transfer (only pending owner can call)
    function acceptOwnership() public onlyPendingOwner {
        address previousOwner = owner;
        owner = pendingOwner;
        pendingOwner = address(0);
        emit OwnershipTransferred(previousOwner, owner);
    }
    
    // Cancel pending ownership transfer (only current owner can call)
    function cancelOwnershipTransfer() public onlyOwner {
        require(pendingOwner != address(0), "No pending transfer");
        address cancelled = pendingOwner;
        pendingOwner = address(0);
        emit OwnershipTransferCancelled(owner, cancelled);
    }
}
