export default [
  {
    type: 'function',
    name: 'addr',
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address payable',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'addr',
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'coinType',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'clearRecords',
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'recordVersions',
    inputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint64',
        internalType: 'uint64',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setAddr',
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'coinType',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'a',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setAddr',
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'a',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        name: 'interfaceID',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'AddrChanged',
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'a',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'AddressChanged',
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'coinType',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newAddress',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'VersionChanged',
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'newVersion',
        type: 'uint64',
        indexed: false,
        internalType: 'uint64',
      },
    ],
    anonymous: false,
  },
] as const;
