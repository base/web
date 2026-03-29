// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/SimpleToken.sol";

contract SimpleTokenTest is Test {
    SimpleToken public token;
    address public owner;
    address public user;
    
    function setUp() public {
        owner = address(this);
        user = address(0x1);
        token = new SimpleToken();
    }
    
    function testInitialSupply() public {
        assertEq(token.totalSupply(), 100000 * 10**18); // 10% of MAX_SUPPLY
    }
    
    function testMint() public {
        token.mint(user, 1000 * 10**18);
        assertEq(token.balanceOf(user), 1000 * 10**18);
    }
    
    function testMaxSupply() public {
        // Try to mint more than MAX_SUPPLY - initial supply
        uint256 remainingSupply = token.MAX_SUPPLY() - token.totalSupply();
        vm.expectRevert("Exceeds max supply");
        token.mint(user, remainingSupply + 1);
        
        // Minting exactly the remaining supply should work
        token.mint(user, remainingSupply);
        assertEq(token.totalSupply(), token.MAX_SUPPLY());
    }
} 