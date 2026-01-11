require('@testing-library/jest-dom');

// Configure React to use React.act instead of deprecated ReactDOMTestUtils.act
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Polyfill TextEncoder/TextDecoder for viem compatibility
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
