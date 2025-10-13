export default [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'token_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenIds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
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
    type: 'error',
    name: 'AddressEmptyCode',
    inputs: [
      {
        name: 'target',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'FailedInnerCall',
    inputs: [],
  },
] as const;
