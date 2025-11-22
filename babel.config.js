/**
 * @fileoverview Babel configuration file.
 * Configuration for transpiling JavaScript, TypeScript, and React code,
 * optimized for different environments (development/production/test).
 */

module.exports = {
  // Plugins are executed before presets. Order is important.
  // tsconfig-paths should run early to resolve module aliases before transpilation.
  // relay is essential for compiling GraphQL fragments.
  plugins: ['babel-plugin-tsconfig-paths', 'babel-plugin-relay'],

  // Presets are executed in reverse order (bottom to top).
  presets: [
    // 3. Last executed: TypeScript transformation.
    '@babel/preset-typescript',

    // 2. Middle executed: React configuration.
    // 'automatic' runtime avoids the need to import React in every file.
    ['@babel/preset-react', { runtime: 'automatic' }],

    // 1. First executed: Environment-specific transformations (ES6+ to target ES version).
    [
      '@babel/preset-env',
      {
        // Recommended approach: let Babel decide on the best conversion.
        // Avoid 'loose: true' unless explicitly necessary for performance in target environments.
        // loose: false, // Default is false.

        // Exclude specific polyfills to preserve native async/await functionality,
        // relying on the environment (Node/modern browsers) to support them natively.
        exclude: [
          '@babel/plugin-transform-regenerator',
          '@babel/plugin-transform-async-to-generator',
        ],
        
        // This setting ensures that the smallest necessary polyfills are applied.
        // If you are using core-js polyfills, you should also set 'corejs' version here.
        // For production, consider setting 'modules: false' globally 
        // and let tools like Webpack handle ES modules for tree-shaking.
        modules: false,
      },
    ],
  ],
  
  // Environment-specific overrides for the 'test' environment (e.g., Jest/Mocha).
  // This is a cleaner way to handle environment-specific config than using process.env checks inline.
  env: {
    test: {
      // In a testing environment (like Jest), we usually need 'commonjs' modules
      // for synchronous module resolution and easier mocking.
      presets: [
        [
          '@babel/preset-env',
          {
            bugfixes: true,
            // Use CommonJS modules for synchronous testing execution.
            modules: 'commonjs', 
            exclude: [
              '@babel/plugin-transform-regenerator',
              '@babel/plugin-transform-async-to-generator',
            ],
          },
        ],
      ],
      // Adding additional plugins often needed for testing environments (e.g., dynamic imports resolution)
      plugins: [
        // Optionally add 'babel-plugin-dynamic-import-node' if dynamic imports are used in tests.
      ]
    },
    // You can add 'production' or 'development' specific overrides here if needed.
  }
};
