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

module.exports = createJestConfig(customJestConfig);
