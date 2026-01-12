require('@testing-library/jest-dom');

// Polyfill TextEncoder/TextDecoder for viem compatibility
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
