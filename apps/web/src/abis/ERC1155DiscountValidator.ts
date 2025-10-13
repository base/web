export default [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'tokenAddress',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId_',
        type: 'uint256',
        internalType: 'uint256',
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
        name: '',
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
] as const;
