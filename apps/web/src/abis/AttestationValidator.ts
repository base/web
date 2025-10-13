export default [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'owner_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'signer_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'schemaID_',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'indexer_',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cancelOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'completeOwnershipHandover',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'indexer',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IAttestationIndexer',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isValidDiscountRegistration',
    inputs: [
      {
        name: 'claimer',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'validationData',
        type: 'bytes',
        internalType: 'bytes',
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
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: 'result',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownershipHandoverExpiresAt',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'requestOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'setSigner',
    inputs: [
      {
        name: 'signer_',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    name: 'IndexerUpdated',
    inputs: [
      {
        name: 'previousIndexer',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'updatedIndexer',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverCanceled',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverRequested',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'oldOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AlreadyInitialized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'AttestationExpired',
    inputs: [
      {
        name: 'attestationUid',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'expirationTime',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'AttestationInvariantViolation',
    inputs: [
      {
        name: 'reason',
        type: 'string',
        internalType: 'string',
      },
    ],
  },
  {
    type: 'error',
    name: 'AttestationNotFound',
    inputs: [],
  },
  {
    type: 'error',
    name: 'AttestationRevoked',
    inputs: [
      {
        name: 'attestationUid',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'revocationTime',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'ClaimerAddressMismatch',
    inputs: [
      {
        name: 'expectedClaimer',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'claimer',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidIndexer',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NewOwnerIsZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NoHandoverRequest',
    inputs: [],
  },
  {
    type: 'error',
    name: 'SignatureExpired',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Unauthorized',
    inputs: [],
  },
] as const;
