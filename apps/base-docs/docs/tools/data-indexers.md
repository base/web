---
title: Data Indexers
slug: /tools/data-indexers
description: Documentation for data indexing platforms for Base network.
keywords:
  [
    data indexers,
    data indexer,
    indexing data,
    Base network,
    Base,
    Base mainnet,
    Base testnet,
    blockchain data,
    Covalent,
    Moralis,
    SubQuery,
    The Graph,
    GraphQL,
    EVM chains,
  ]
hide_table_of_contents: true
---

# Data Indexers

---

## Allium

[Allium](https://www.allium.so/) is an Enterprise Data Platform that serves accurate, fast, and simple blockchain data. Currently serving 15 blockchains and over 100+ schemas, Allium offers near real-time Base data for infrastructure needs and enriched Base data (NFT, DEX, Decoded, Wallet360) for research and analytics.

Allium supports data delivery to multiple [destinations](https://docs.allium.so/integrations/overview), including Snowflake, Bigquery, Databricks, and AWS S3.

Documentation:

- [Real-time](https://docs.allium.so/real-time-data/base)
- [Batch-enriched](https://docs.allium.so/data-tables/base)

To get started, contact Allium [here](https://www.allium.so/contact).

## Arkham

[Arkham](https://platform.arkhamintelligence.com/) is a crypto intelligence platform that systematically analyzes blockchain transactions, showing users the people and companies behind blockchain activity, with a suite of advanced tools for analyzing their activity.

References:

- [Platform guide](https://www.arkhamintelligence.com/guide)
- [Whitepaper](https://www.arkhamintelligence.com/whitepaper)
- [Codex](https://codex.arkhamintelligence.com/)
- [Demos](https://www.youtube.com/@arkhamintel)

---

## Covalent

[Covalent](https://www.covalenthq.com/?utm_source=base&utm_medium=partner-docs) is a hosted blockchain data solution providing access to historical and current on-chain data for [100+ supported blockchains](https://www.covalenthq.com/docs/networks/?utm_source=base&utm_medium=partner-docs), including [Base](https://www.covalenthq.com/docs/networks/base/?utm_source=base&utm_medium=partner-docs).

Covalent maintains a full archival copy of every supported blockchain, meaning every balance, transaction, log event, and NFT asset data is available from the genesis block. This data is available via:

1. [Unified API](https://www.covalenthq.com/docs/unified-api/?utm_source=base&utm_medium=partner-docs) - Incorporate blockchain data into your app with a familiar REST API
2. [Increment](https://www.covalenthq.com/docs/increment/?utm_source=base&utm_medium=partner-docs) - Create and embed custom charts with no-code analytics

To get started, [sign up](https://www.covalenthq.com/platform/?utm_source=base&utm_medium=partner-docs) and visit the [developer documentation](https://www.covalenthq.com/docs/?utm_source=base&utm_medium=partner-docs).

#### Supported Networks

- [Base Mainnet](https://www.covalenthq.com/docs/networks/base/?utm_source=base&utm_medium=partner-docs)
- [Base Sepolia](https://www.covalenthq.com/docs/networks/base/?utm_source=base&utm_medium=partner-docs) (Testnet)

---

## Envio

[Envio](https://envio.dev) is a full-featured data indexing solution that provides application developers with a seamless and efficient way to index and aggregate real-time and historical blockchain data for any EVM. The indexed data is easily accessible through custom GraphQL queries, providing developers with the flexibility and power to retrieve specific information.

Envio [HyperSync](https://docs.envio.dev/docs/hypersync) is an indexed layer of the Base blockchain for the hyper-speed syncing of historical data (JSON-RPC bypass). What would usually take hours to sync ~100,000 events can now be done in the order of less than a minute.

Designed to optimize the user experience, Envio offers automatic code generation, flexible language support, multi-chain data aggregation, and a reliable, cost-effective hosted service.

To get started, visit the [documentation](https://docs.envio.dev/docs/overview) or follow the [quickstart](https://docs.envio.dev/docs/quickstart) guide.

#### Supported Networks

- Base Mainnet
- Base Sepolia (Testnet)

---

## Moralis

[Moralis](https://moralis.io/?utm_source=base-docs&utm_medium=partner-docs) offers comprehensive data APIs for crypto, offering both indexed and real-time data across 15+ chains. Moralis' APIs include portfolio and wallet balances, NFT data, token data, price data, candlestick data, net worth data, and a lot more. All of the data is enriched with things like metadata, parsed events and address labels.

To get started with Moralis, you can [sign up for an account](https://moralis.io/?utm_source=base-docs&utm_medium=partner-docs), visit the Moralis [documentation](https://docs.moralis.io/?utm_source=base-docs&utm_medium=partner-docs), or check out their tutorials on [Youtube](https://www.youtube.com/c/MoralisWeb3).

#### Supported Networks

- Base Mainnet
- Base Sepolia (Testnet)

---

## Shovel

[Shovel](https://indexsupply.com/shovel) is an [open source](https://github.com/indexsupply/code) tool for synchronizing Ethereum data to your Postgres database. Shovel can index block data, transaction data, and decoded event data. A single Shovel can index multiple chains simultaneously. Shovel is configured via a declarative JSON config file – no custom functions to save indexed data to your database.

Find out more in the [Shovel Docs](https://indexsupply.com/shovel/docs/)

#### Supported Networks

- Base Mainnet
- Base Sepolia (Testnet)

---

## SubQuery

[SubQuery](https://subquery.network/) is a data indexer that provides developers with fast, reliable, decentralized, and customized APIs for accessing rich indexed data from various ecosystems (including Base) within their projects.

SubQuery provides the ability to aggregate this data across multiple blockchains, all within a single project.

Other advantages of SubQuery includes performance with multiple RPC endpoint configurations, multi-worker capabilities and a configurable caching architecture.

To get started, visit the [developer documentation](https://academy.subquery.network/) or follow [this step-by-step guide](../../tutorials/subquery) on how to index any smart contract on Base.

#### Supported Networks

- [Base Mainnet](https://academy.subquery.network/quickstart/quickstart_chains/base.html)
- [Base Sepolia (Testnet)](https://academy.subquery.network/indexer/quickstart/quickstart_chains/base-goerli.html)

---

## The Graph

[The Graph](https://thegraph.com/) is an indexing protocol for organizing blockchain data and making it easily accessible with GraphQL.

Base applications can use GraphQL to query open APIs called subgraphs, to retrieve data that is indexed on the network. With The Graph, you can build serverless applications that run entirely on public infrastructure.

To get started, visit the [documentation](https://thegraph.com/docs/en/) or see [this quickstart](https://thegraph.com/docs/en/cookbook/quick-start/) on how to create, deploy, and query a subgraph.

#### Supported Networks

- [Base Mainnet](https://thegraph.com/docs/en/#supported-networks)

---

## Flair

[Flair](https://flair.dev) is a real-time and historical custom data indexing for any EVM chain.

It offers reusable **indexing primitives** (such as fault-tolerant RPC ingestors, custom processors and aggregations, re-org aware database integrations) to make it easy to receive, transform, store and access your on-chain data.

To get started, visit the [documentation](https://docs.flair.dev) or clone the [starter boilerplate](https://github.com/flair-sdk/starter-boilerplate) template and follow the instructions.

#### Supported Networks

- [Base Mainnet](https://docs.flair.dev/reference/manifest.yml)
- [Base Sepolia](https://docs.flair.dev/reference/manifest.yml) (Testnet)
