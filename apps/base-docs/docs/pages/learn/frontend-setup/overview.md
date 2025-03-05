---
title: 'Overview'
description: An overview of this course.
hide_table_of_contents: false
---

# Overview

Welcome! The course you are about to begin will rapidly introduce you to frontend web development for onchain apps and enable you to write websites that can call your smart contract functions in a similar way to how traditional sites interact with APIs.

## Prerequisites

Before these lessons, you should:

- Be comfortable with traditional frontend development using React, ideally with NextJS
- Possess a general understanding of the EVM and smart contracts

---

## Objectives

By the end of this course, you should be able to:

- **Frontend Setup**
  - Identify the role of a wallet aggregator in an onchain app
  - Debate the pros and cons of using a template
  - Scaffold a new onchain app with RainbowKit
  - Add a wallet connection to a standard template app
- **Connecting to the Blockchain**
  - Compare and contrast public providers vs. vendor providers vs. wallet providers
  - Select the appropriate provider for several use cases
  - Set up a provider in wagmi and use it to connect a wallet
  - Protect API keys that will be exposed to the front end
- **Reading and Displaying Data**
  - Implement the `useAccount` hook to show the user's address, connection state, network, and balance
  - Implement an `isMounted` hook to prevent hydration errors
  - Implement wagmi's `useReadContract` hook to fetch data from a smart contract
  - Convert data fetched from a smart contract to information displayed to the user
  - Identify the caveats of reading data from automatically-generated getters
  - Enable the `watch` feature of `useReadContract` to automatically fetch updates from the blockchain
  - Describe the costs of using the `watch` feature, and methods to reduce those costs
  - Configure arguments to be passed with a call to a `pure` or `view` smart contract function
  - Call an instance of `useReadContract` on demand
  - Utilize `isLoading` and `isFetching` to improve user experience
- **Writing to Contracts**
  - Implement wagmi's `useWriteContract` hook to send transactions to a smart contract
  - Configure the options in `useWriteContract`
  - Display the execution, success, or failure of a function with button state changes, and data display
  - Implement Wagmi's `usePrepareContractWrite` and `useWriteContract` to send transactions to a smart contract
  - Configure the options in `useSimulateContract` and `useWriteContract`
  - Call a smart contract function on-demand using the write function from `useWriteContract`, with arguments and a value

---
