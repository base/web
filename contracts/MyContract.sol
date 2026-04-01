// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyContract {
    address public owner;
    address public authorizedAddress;
    uint256 public value;
    bytes32 public merkleRoot;
    
    // Track claimed addresses to prevent double claims
    mapping(address => bool) public hasClaimed;
    
    event ValueChanged(uint256 newValue);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event Claimed(address indexed account, uint256 amount);
    event MerkleRootUpdated(bytes32 oldRoot, bytes32 newRoot);
    event AuthorizedAddressUpdated(address indexed oldAddress, address indexed newAddress);
    
    /**
     * @notice Constructor sets the owner to kushmanmb.eth / yaketh.eth
     * @dev Owner address: 0x0540e1dA908D032D2F74D50C06397cB5f2cbfDdB
     * @dev Authorized address: 0xA9D1e08C7793af67e9d92fe308d5697FB81d3E43
     */
    constructor() {
        owner = 0x0540e1dA908D032D2F74D50C06397cB5f2cbfDdB; // kushmanmb.eth / yaketh.eth
        authorizedAddress = 0xA9D1e08C7793af67e9d92fe308d5697FB81d3E43;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    modifier onlyAuthorized() {
        require(msg.sender == authorizedAddress, "Not authorized");
        _;
    }
    
    function setValue(uint256 _value) public onlyOwner {
        value = _value;
        emit ValueChanged(_value);
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        address previousOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }
    
    /**
     * @notice Allows the owner to update the authorized address
     * @param newAuthorizedAddress The new authorized address
     */
    function setAuthorizedAddress(address newAuthorizedAddress) public onlyOwner {
        require(newAuthorizedAddress != address(0), "Invalid address");
        address oldAddress = authorizedAddress;
        authorizedAddress = newAuthorizedAddress;
        emit AuthorizedAddressUpdated(oldAddress, newAuthorizedAddress);
    }
    
    /**
     * @notice Allows the authorized address to set the value (delegated owner function)
     * @param _value The new value to set
     */
    function setValueAuthorized(uint256 _value) public onlyAuthorized {
        value = _value;
        emit ValueChanged(_value);
    }
    
    /**
     * @notice Sets the Merkle root for claim verification
     * @param _merkleRoot The new Merkle root
     */
    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        require(_merkleRoot != bytes32(0), "Invalid merkle root");
        bytes32 oldRoot = merkleRoot;
        merkleRoot = _merkleRoot;
        emit MerkleRootUpdated(oldRoot, _merkleRoot);
    }
    
    /**
     * @notice Claims tokens/ETH for an account using Merkle proof verification
     * @dev Only the owner can trigger claims on behalf of eligible accounts.
     * @param account The address that will receive the claim
     * @param totalAmount The total amount to be claimed
     * @param proof The Merkle proof to verify eligibility
     */
    function claim(address account, uint256 totalAmount, bytes32[] calldata proof) public onlyOwner {
        // Validate inputs
        require(account != address(0), "Invalid account address");
        require(totalAmount > 0, "Amount must be greater than 0");
        require(merkleRoot != bytes32(0), "Merkle root not set");
        
        // Prevent duplicate claims
        require(!hasClaimed[account], "Already claimed");
        
        // Verify the Merkle proof
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(account, totalAmount))));
        require(_verifyProof(proof, merkleRoot, leaf), "Invalid proof");
        
        // Mark as claimed before transfer (checks-effects-interactions pattern)
        // This prevents reentrancy even if account is a contract
        hasClaimed[account] = true;
        
        // Transfer the amount
        require(address(this).balance >= totalAmount, "Insufficient contract balance");
        // Using call instead of transfer/send for forward compatibility
        // transfer() has a 2300 gas limit which is an anti-pattern
        // The checks-effects-interactions pattern above protects against reentrancy
        (bool success, ) = account.call{value: totalAmount}("");
        require(success, "Transfer failed");
        
        // Emit event
        emit Claimed(account, totalAmount);
    }
    
    /**
     * @notice Verifies a Merkle proof
     * @param proof The Merkle proof
     * @param root The Merkle root
     * @param leaf The leaf to verify
     * @return True if the proof is valid, false otherwise
     */
    function _verifyProof(
        bytes32[] calldata proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        bytes32 computedHash = leaf;
        
        for (uint256 i = 0; i < proof.length; i++) {
            computedHash = _hashPair(computedHash, proof[i]);
        }
        
        return computedHash == root;
    }
    
    /**
     * @notice Hashes two bytes32 values in sorted order
     * @param a First hash
     * @param b Second hash
     * @return The combined hash
     */
    function _hashPair(bytes32 a, bytes32 b) internal pure returns (bytes32) {
        return a < b ? keccak256(abi.encodePacked(a, b)) : keccak256(abi.encodePacked(b, a));
    }
    
    /**
     * @notice Allows the contract to receive ETH
     */
    receive() external payable {}
    
    /**
     * @notice Allows the owner to withdraw ETH from the contract
     * @dev Uses checks-effects-interactions pattern. Since owner is trusted,
     *      reentrancy risk is minimal, but pattern is followed for consistency.
     * @param amount The amount to withdraw
     */
    function withdraw(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        // Note: owner is a trusted address set in constructor
        // Using call instead of transfer for forward compatibility
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Withdrawal failed");
    }
}
