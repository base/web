module.exports = {
  arrowParens: 'always',
  bracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  embeddedLanguageFormatting: 'off',
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json-stringify',
      },
    },
  ],
};
