export default [
  {
    inputs: [{ internalType: 'address', name: 'tokenAddress', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { internalType: 'address', name: 'claimer', type: 'address' },
      { internalType: 'bytes', name: '', type: 'bytes' },
    ],
    name: 'isValidDiscountRegistration',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
