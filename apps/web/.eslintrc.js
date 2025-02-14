module.exports = {
  extends: [
    'next',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'eslint-config-prettier',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    next: {
      rootDir: __dirname,
    },
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
  rules: {
    'import/extensions': 'off',
    'react/prop-types': 'error', // Enforce prop types
    'react/jsx-no-duplicate-props': 'error', // Prevent duplicate props
    'react/jsx-key': 'error', // Enforce keys in iterators
    'no-unused-vars': 'warn', // Warning for unused variables
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Restrict console usage
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
};
