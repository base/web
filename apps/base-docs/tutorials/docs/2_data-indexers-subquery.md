---
title: 'Indexing Data with SubQuery'
slug: /data-indexers-subquery
description: A tutorial explaining SubQuery and providing swift guidance on configuring a project
author: subquery
keywords:
  [
    indexers,
    RPC,
    API,
    graphql,
    frontend,
    smart contract development,
    EVM,
    Base,
    Base network,
    Base node providers,
    Base providers,
    blockchain development,
    dApps,
    smart contracts,
    blockchain API,
  ]
tags: ['smart contracts', 'data indexing']
difficulty: beginner
hide_table_of_contents: false
displayed_sidebar: null
---

## Objectives

- Present the concept of indexers
- Begin effectively with all types of SubQuery indexer configuration files
- Successfully build your project
- Efficiently retrieve data from indexed sources

The goal is to index the all the claims from the [Bridge to Base NFT contract](https://basescan.org/token/0xEa2a41c02fA86A4901826615F9796e603C6a4491) on [Base Mainnet](https://docs.base.org/using-base/).

---

:::info

The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Base/base-nft).

:::

---

The contents presented in this tutorial were discussed previously during the workshop. You can follow along to receive detailed audio commentary on the setup's intricacies:

<iframe width="1317" height="741" src="https://www.youtube.com/embed/8N5h3SI8E-A" title="Base x SubQuery Indexing Workshop" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What are indexers?

Indexers, in a broad context, play a fundamental role in organising and optimising data retrieval within various systems. These tools act as navigational aids, allowing efficient access to specific information by creating structured indexes.

In the context of blockchain and dApps, indexers go beyond traditional databases, facilitating streamlined access to on-chain data. This includes transaction histories, smart contract states, and event logs.

## Setup

In this chapter, we will delve into the intricacies of SubQuery indexer configuration. The chapter is subdivided into sections dedicated to each specific file type, all of which require configuration.

### Your Project Manifest File

The Project Manifest file is an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data. For EVM chains, there are three types of mapping handlers (and you can have more than one in each project):

- _Block Handers_: On each and every block, run a mapping function
- _Transaction Handlers_: On each and every transaction that matches optional filter criteria, run a mapping function
- _Log Handers_: On each and every log that matches optional filter criteria, run a mapping function

As we are indexing all user claims from the Bridge to Base NFT contract, the first step is to import the contract abi definition which can be obtained from [here](https://basescan.org/token/0xEa2a41c02fA86A4901826615F9796e603C6a4491#code). Copy the entire contract ABI and save it as a file called `erc721base.abi.json` in the `/abis` directory.

Update the `datasources` section as follows:

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 2155076,

      options: {
        // Must be a key of assets
        abi: "erc721base",
        // This is the contract address for Bridge To Base NFT Collection 0xea2a41c02fa86a4901826615f9796e603c6a4491
        address: "0xea2a41c02fa86a4901826615f9796e603c6a4491",
      },
      assets: new Map([["erc721base", { file: "./abis/erc721base.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleNftClaim",
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               */
              topics: [
                " TokensClaimed (uint256 claimConditionIndex, address claimer, address receiver, uint256 startTokenId, uint256 quantityClaimed)\n",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleNftClaim` mapping function whenever there is a `TokensClaimed` event being logged on any transaction from the [Bridge to Base NFT contract](https://basescan.org/token/0xEa2a41c02fA86A4901826615F9796e603C6a4491).

### Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id, blockHeight, claimer and claim receiver along with an aggregation of the total quantity of NFTs claimed per day.

```graphql
type Claim @entity {
  id: ID! # Transaction hash
  blockHeight: BigInt!
  timestamp: Date!
  claimer: String!
  receiver: String!
  tokenId: BigInt!
  quantity: BigInt!
}

# The following entity allows us to aggregate daily claims from the Bridge to Base NFT contract.
type DailyAggregation @entity {
  id: ID! # YYYY-MM-DD
  totalQuantity: BigInt!
}
```

SubQuery simplifies and ensures type-safety when working with GraphQL entities, smart contracts, events, transactions, and logs. The SubQuery CLI will generate types based on your project's GraphQL schema and any contract ABIs included in the data sources.

```shell
yarn codegen
```

This action will generate a new directory (or update the existing one) named `src/types`. Inside this directory, you will find automatically generated entity classes corresponding to each type defined in your `schema.graphql`. These classes facilitate type-safe operations for loading, reading, and writing entity fields.

It will also generate a class for every contract event, offering convenient access to event parameters, as well as information about the block and transaction from which the event originated. You can find detailed information on how this is achieved in the [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis) section. All of these types are stored in the `src/types/abi-interfaces` and `src/types/contracts` directories.

You can conveniently import all these types:

```ts
import { Claim, DailyAggregation } from '../types';
import { TokensClaimedLog } from '../types/abi-interfaces/Erc721baseAbi';
```

### Adding a Mapping Function

Mapping functions define how blockchain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions `handleNftClaim` and `handleDailyAggregation`:

```ts
export async function handleNftClaim(log: TokensClaimedLog): Promise<void> {
  logger.info(`New claim log at block ${log.blockNumber}`);
  assert(log.args, 'No log.args');

  let date = new Date(Number(log.block.timestamp) * 1000);

  const claim = Claim.create({
    id: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    timestamp: date,
    claimer: log.args.claimer,
    receiver: log.args.receiver,
    tokenId: log.args.startTokenId.toBigInt(),
    quantity: log.args.quantityClaimed.toBigInt(),
  });

  await handleDailyAggregation(date, claim.quantity);

  await claim.save();
}

export async function handleDailyAggregation(date: Date, quantity: bigint): Promise<void> {
  const id = date.toISOString().slice(0, 10);
  let aggregation = await DailyAggregation.get(id);
  logger.info(`New daily aggregation at ${id}`);

  if (!aggregation) {
    aggregation = DailyAggregation.create({
      id,
      totalQuantity: BigInt(0),
    });
  }

  aggregation.totalQuantity = aggregation.totalQuantity + quantity;

  await aggregation.save();
}
```

The `handleNftClaim` function receives a `log` parameter of type `TokensClaimedLog` which includes log data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

### Build

Next, build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:

```shell
yarn build
```

:::warning
Whenever you make changes to your mapping functions, you must rebuild your project.
:::

## Run & Query

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

### Run Locally

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, visit the [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

Run the following command under the project directory:

```shell
yarn start:docker
```

:::info
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
:::

### Query

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following queries to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query/graphql.md).

```graphql
# Write your query or mutation here
query {
  claims(first: 5) {
    nodes {
      id
      blockHeight
      timestamp
      claimer
      receiver
      tokenId
      quantity
    }
  }

  dailyAggregations(orderBy: TOTAL_QUANTITY_ASC) {
    nodes {
      id
      totalQuantity
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "claims": {
      "nodes": [
        {
          "id": "0xd91db90047591afbe6ef1c85d2ad0505ee46be161a82fdb79f569194383ed51e",
          "blockHeight": "2155198",
          "timestamp": "2023-08-03T21:55:43",
          "claimer": "0x0bAE5E0BE6CEA98C61591354a5F43339fdD5b611",
          "receiver": "0x0bAE5E0BE6CEA98C61591354a5F43339fdD5b611",
          "tokenId": "2313836",
          "quantity": "1000"
        },
        {
          "id": "0x0114a68ebb4ee609409931a4c62abd2256a66f0fb91388ca00003765186c0e60",
          "blockHeight": "2155088",
          "timestamp": "2023-08-03T21:52:03",
          "claimer": "0x8A17AD3aB5588AE18B0f875dfb65f7AD61D95bDd",
          "receiver": "0x8A17AD3aB5588AE18B0f875dfb65f7AD61D95bDd",
          "tokenId": "2312064",
          "quantity": "1"
        },
        {
          "id": "0x3ccdc484d705776eba946e67e3577c0a629cc82027da6e866717412a158de9e9",
          "blockHeight": "2155088",
          "timestamp": "2023-08-03T21:52:03",
          "claimer": "0x7a2aaecf0c3bF01411f7AAe7DBB97535a7205498",
          "receiver": "0x7a2aaecf0c3bF01411f7AAe7DBB97535a7205498",
          "tokenId": "2312054",
          "quantity": "10"
        },
        {
          "id": "0x1ab0a99382c2ccbed4b64cf1407be214e5d23deff5028a1e4c751d65a1864c04",
          "blockHeight": "2155087",
          "timestamp": "2023-08-03T21:52:01",
          "claimer": "0x51A7b9AFb62dB473107e4a220CedDa67a8025630",
          "receiver": "0x51A7b9AFb62dB473107e4a220CedDa67a8025630",
          "tokenId": "2311934",
          "quantity": "100"
        },
        {
          "id": "0x7cb2474628b4ca6598c008b47dd3956632813b38c6ade08f64dbf59c7d5ad658",
          "blockHeight": "2155092",
          "timestamp": "2023-08-03T21:52:11",
          "claimer": "0x2B4FC7483C42312C3f62feE98671f7407770f16f",
          "receiver": "0x2B4FC7483C42312C3f62feE98671f7407770f16f",
          "tokenId": "2312138",
          "quantity": "1"
        }
      ]
    },
    "dailyAggregations": {
      "nodes": [
        {
          "id": "2023-08-03",
          "totalQuantity": "3184"
        }
      ]
    }
  }
}
```

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data. Take a look at some of our advanced features to take your project to the next level!

- [**Multi-chain indexing support**](https://academy.subquery.network/build/multi-chain.html) - SubQuery allows you to index data from across different layer-1 networks into the same database, this allows you to query a single endpoint to get data for all supported networks.
- [**Dynamic Data Sources**](https://academy.subquery.network/build/dynamicdatasources.html) - When you want to index factory contracts, for example on a DEX or generative NFT project.
- [**Project Optimisation Advice**](https://academy.subquery.network/build/optimisation.html) - Some common tips on how to tweak your project to maximise performance.
- [**GraphQL Subscriptions**](https://academy.subquery.network/run_publish/subscription.html) - Build more reactive front end applications that subscribe to changes in your SubQuery project.

### Check other examples

Several Base example projects have already been developed. You can access the list in [this repository](https://github.com/subquery/ethereum-subql-starter/tree/main/Base), which will be continuously updated with new entries. Be sure to check for updates periodically.

### Publish your project

SubQuery is open-source, meaning you have the freedom to run it in the following three ways:

- Locally on your own computer (or a cloud provider of your choosing), [view the instructions on how to run SubQuery Locally](https://academy.subquery.network/run_publish/run.html)
- By publishing it to our enterprise-level [Managed Service](https://managedservice.subquery.network), where we'll host your SubQuery project in production ready services for mission critical data with zero-downtime blue/green deployments. We even have a generous free tier. [Find out how](https://academy.subquery.network/run_publish/publish.html)
- By publishing it to the decentralised [SubQuery Network](https://subquery.network/network), the most open, performant, reliable, and scalable data service for dApp developers. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way

### Need Help?

The fastest way to get support is by [searching our documentation](https://academy.subquery.network), or by [joining our discord](https://discord.com/invite/subquery) and messaging us in the `#technical-support` channel.
