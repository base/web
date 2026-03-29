// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/StdJson.sol";
import "forge-std/console.sol";
import "forge-std/StdCheats.sol";

contract ContractStateSetup is Script, StdCheats {
    using stdJson for string;

    struct CallOrDeploy {
        bytes args;           // Encoded arguments
        string name;          // Contract name (matches artifact name)
        bytes4 selector;      // Function selector, 0x00000000 for deployment
        address sender;       // Account making the call
        address target;       // Contract being called
        uint256 value;        // ETH value to send
    }

    struct SetupConfig {
        CallOrDeploy callsOrDeploys;
    }

    function run(bytes memory callOrDeployListEncoded) public {
        // Parse the JSON properly using stdJson
        CallOrDeploy[] memory callOrDeploys = abi.decode(callOrDeployListEncoded, (CallOrDeploy[]));

        console.logString(callOrDeploys[0].name);
        console.logAddress(callOrDeploys[0].target);

        vm.startBroadcast();

        // Deploy contracts
        for (uint i = 0; i < callOrDeploys.length; i++) {
            CallOrDeploy memory callOrDeploy = callOrDeploys[i];
            // Make sure we have a valid name before proceeding
            require(bytes(callOrDeploy.name).length > 0, "Contract name cannot be empty");
            
            string memory artifactPath = string.concat("out/", callOrDeploy.name, ".sol/", callOrDeploy.name, ".json");
            
            if (bytes4(callOrDeploy.selector) == bytes4(0)) {
                // Deploy using deployCodeTo from StdCheats
                console.log("Deploying contract");
                deployCodeTo(
                    artifactPath,
                    callOrDeploy.args,
                    callOrDeploy.target
                );
                console.log("Deployed contract %s at address %s", callOrDeploy.name, callOrDeploy.target);
            } else {
                console.log("Calling contract");
                // Set msg.sender
                vm.prank(callOrDeploy.sender);
                
                // Set msg.value if needed
                if (callOrDeploy.value > 0) {
                    vm.deal(callOrDeploy.sender, callOrDeploy.value);
                }
                
                // Make the call
                (bool success,) = callOrDeploy.target.call{value: callOrDeploy.value}(
                    abi.encodePacked(bytes4(callOrDeploy.selector), callOrDeploy.args)
                );
                require(success, "call failed");
            }
        }
        vm.stopBroadcast();
    }
}
