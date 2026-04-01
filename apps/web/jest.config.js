const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>', '<rootDir>/../../node_modules'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^apps/web/(.*)$': '<rootDir>/$1',
    '^libs/(.*)$': '<rootDir>/../../libs/$1',
    '^base-ui$': '<rootDir>/../../libs/base-ui/index.ts',
    '.*/libs/base-ui$': '<rootDir>/../../libs/base-ui/index.ts',
    '^ox/BlockOverrides$': '<rootDir>/__mocks__/ox/BlockOverrides.js',
  },
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
};

// Export async config to properly handle Next.js Jest config and modify transformIgnorePatterns
module.exports = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    transformIgnorePatterns: [
      // Transform all node_modules except the ones below
      'node_modules/(?!(.*\\.mjs$|@coinbase/onchainkit|wagmi|@wagmi|viem|data-uri-to-buffer|fetch-blob|formdata-polyfill|graphql-request|cross-fetch|is-ipfs|uint8arrays|multiformats|@multiformats|iso-url))',
    ],
  };
};
