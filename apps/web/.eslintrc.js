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
  },
  rules: {
    // Does not work with `:` aliases
    'import/extensions': 'off',
  },
};
