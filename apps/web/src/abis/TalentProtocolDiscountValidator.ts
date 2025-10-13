export default [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'talentProtocol_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'threshold_',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    type: 'error',
    name: 'AlreadyInitialized',
  },
  {
    inputs: [],
    type: 'error',
    name: 'NewOwnerIsZeroAddress',
  },
  {
    inputs: [],
    type: 'error',
    name: 'NoHandoverRequest',
  },
  {
    inputs: [],
    type: 'error',
    name: 'NoZeroAddress',
  },
  {
    inputs: [],
    type: 'error',
    name: 'Unauthorized',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
      },
    ],
    type: 'event',
    name: 'OwnershipHandoverCanceled',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
      },
    ],
    type: 'event',
    name: 'OwnershipHandoverRequested',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
        indexed: true,
      },
    ],
    type: 'event',
    name: 'OwnershipTransferred',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newThreshold',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'ThresholdUpdated',
    anonymous: false,
  },
  {
    inputs: [],
    stateMutability: 'payable',
    type: 'function',
    name: 'cancelOwnershipHandover',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'completeOwnershipHandover',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'claimer',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'isValidDiscountRegistration',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: 'result',
        type: 'address',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'ownershipHandoverExpiresAt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'result',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'payable',
    type: 'function',
    name: 'renounceOwnership',
  },
  {
    inputs: [],
    stateMutability: 'payable',
    type: 'function',
    name: 'requestOwnershipHandover',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'threshold_',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'setThreshold',
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'threshold',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'transferOwnership',
  },
] as const;
