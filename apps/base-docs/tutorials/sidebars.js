const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Deploying a smart contract',
      collapsible: true,
      collapsed: true,
      items: [
        'docs/deploy-with-hardhat',
        'docs/deploy-with-foundry',
        'docs/deploy-with-remix',
        'docs/deploy-with-tenderly',
        'docs/deploy-with-thirdweb',
      ],
    },
    {
      type: 'category',
      label: 'Building an onchain app',
      collapsible: true,
      collapsed: true,
      items: ['docs/build-with-thirdweb'],
    },
    'docs/run-a-base-node',
    {
      type: 'category',
      label: 'Accessing real-world data using Oracles',
      collapsible: true,
      collapsed: true,
      items: [
        'docs/oracles-chainlink-price-feeds',
        'docs/oracles-pyth-price-feeds',
        'docs/oracles-supra-vrf',
      ],
    },
    {
      type: 'category',
      label: 'Sending data and tokens across chains',
      collapsible: true,
      collapsed: true,
      items: ['docs/cross-chain-with-ccip', 'docs/cross-chain-with-layerzero'],
    },
    {
      type: 'category',
      label: 'Account abstraction',
      collapsible: true,
      collapsed: true,
      items: [
        'docs/account-abstraction-with-biconomy',
        'docs/account-abstraction-with-privy-and-base-paymaster',
        'docs/account-abstraction-with-particle-network',
      ],
    },
    {
      type: 'category',
      label: 'Introduction to Foundry',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'docs/intro-to-foundry-setup',
        },
        {
          type: 'doc',
          id: 'docs/intro-to-foundry-testing',
        },
      ],
    },
    {
      type: 'category',
      label: 'Advanced NFT Development',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'docs/onchain-nfts',
          className: 'sidebar-coding',
        },
      ],
    },
    {
      type: 'category',
      label: 'Farcaster Frames',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'docs/farcaster-frames-nocode-minting',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-nft-minting',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-deploy-to-vercel',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-gating-and-redirects',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-hyperframes',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-transactions',
          className: 'sidebar-coding',
        },
      ],
    },
    {
      type: 'category',
      label: 'Hardhat Tools and Testing',
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'Profiling Size',
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-profiling-size',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Profiling Gas',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-profiling-gas',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Debugging',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-debugging',
              className: 'sidebar-code',
            },
          ],
        },
        {
          type: 'category',
          label: 'Test Coverage',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-test-coverage',
              className: 'sidebar-code',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Connecting to the Blockchain',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'docs/intro-to-providers',
        },
      ],
    },
    {
      type: 'category',
      label: 'Indexing Data with SubQuery',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'docs/data-indexers-subquery',
        },
      ],
    },
  ],
};

module.exports = sidebars;
