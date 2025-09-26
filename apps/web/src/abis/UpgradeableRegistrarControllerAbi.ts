export default [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'MIN_NAME_LENGTH',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MIN_REGISTRATION_DURATION',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'acceptOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'available',
    inputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
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
    name: 'discountedRegister',
    inputs: [
      {
        name: 'request',
        type: 'tuple',
        internalType: 'struct UpgradeableRegistrarController.RegisterRequest',
        components: [
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'owner',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'duration',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'resolver',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'data',
            type: 'bytes[]',
            internalType: 'bytes[]',
          },
          {
            name: 'reverseRecord',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'coinTypes',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
          {
            name: 'signatureExpiry',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'signature',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'discountKey',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'validationData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'discountedRegisterPrice',
    inputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'duration',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'discountKey',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: 'price',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'discounts',
    inputs: [
      {
        name: 'discountKey',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct UpgradeableRegistrarController.DiscountDetails',
        components: [
          {
            name: 'active',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'discountValidator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'key',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'discount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getActiveDiscounts',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct UpgradeableRegistrarController.DiscountDetails[]',
        components: [
          {
            name: 'active',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'discountValidator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'key',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'discount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'hasRegisteredWithDiscount',
    inputs: [
      {
        name: 'addresses',
        type: 'address[]',
        internalType: 'address[]',
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
    name: 'initialize',
    inputs: [
      {
        name: 'base_',
        type: 'address',
        internalType: 'contract IBaseRegistrar',
      },
      {
        name: 'prices_',
        type: 'address',
        internalType: 'contract IPriceOracle',
      },
      {
        name: 'reverseRegistrar_',
        type: 'address',
        internalType: 'contract IReverseRegistrar',
      },
      {
        name: 'owner_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'rootNode_',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'rootName_',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'paymentReceiver_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'legacyRegistrarController_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'legacyL2Resolver_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'l2ReverseRegistrar_',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'paymentReceiver',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pendingOwner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'prices',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IPriceOracle',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'register',
    inputs: [
      {
        name: 'request',
        type: 'tuple',
        internalType: 'struct UpgradeableRegistrarController.RegisterRequest',
        components: [
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'owner',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'duration',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'resolver',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'data',
            type: 'bytes[]',
            internalType: 'bytes[]',
          },
          {
            name: 'reverseRecord',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'coinTypes',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
          {
            name: 'signatureExpiry',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'signature',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'registerPrice',
    inputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'duration',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renew',
    inputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'duration',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'rentPrice',
    inputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'duration',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'price',
        type: 'tuple',
        internalType: 'struct IPriceOracle.Price',
        components: [
          {
            name: 'base',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'premium',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'reverseRegistrar',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IReverseRegistrar',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setDiscountDetails',
    inputs: [
      {
        name: 'details',
        type: 'tuple',
        internalType: 'struct UpgradeableRegistrarController.DiscountDetails',
        components: [
          {
            name: 'active',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'discountValidator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'key',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'discount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setL2ReverseRegistrar',
    inputs: [
      {
        name: 'l2ReverseRegistrar_',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPaymentReceiver',
    inputs: [
      {
        name: 'paymentReceiver_',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPriceOracle',
    inputs: [
      {
        name: 'prices_',
        type: 'address',
        internalType: 'contract IPriceOracle',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setReverseRecord',
    inputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'signatureExpiry',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'coinTypes',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'signature',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setReverseRegistrar',
    inputs: [
      {
        name: 'reverse_',
        type: 'address',
        internalType: 'contract IReverseRegistrar',
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'valid',
    inputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'withdrawETH',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'DiscountApplied',
    inputs: [
      {
        name: 'registrant',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'discountKey',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DiscountUpdated',
    inputs: [
      {
        name: 'discountKey',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'details',
        type: 'tuple',
        indexed: false,
        internalType: 'struct UpgradeableRegistrarController.DiscountDetails',
        components: [
          {
            name: 'active',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'discountValidator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'key',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'discount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ETHPaymentProcessed',
    inputs: [
      {
        name: 'payee',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'price',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint64',
        indexed: false,
        internalType: 'uint64',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'L2ReverseRegistrarUpdated',
    inputs: [
      {
        name: 'newL2ReverseRegistrar',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NameRegistered',
    inputs: [
      {
        name: 'name',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'label',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'expires',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NameRenewed',
    inputs: [
      {
        name: 'name',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'label',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'expires',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferStarted',
    inputs: [
      {
        name: 'previousOwner',
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
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
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
    type: 'event',
    name: 'PaymentReceiverUpdated',
    inputs: [
      {
        name: 'newPaymentReceiver',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PriceOracleUpdated',
    inputs: [
      {
        name: 'newPrices',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ReverseRegistrarUpdated',
    inputs: [
      {
        name: 'newReverseRegistrar',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AlreadyRegisteredWithDiscount',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'DurationTooShort',
    inputs: [
      {
        name: 'duration',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'InactiveDiscount',
    inputs: [
      {
        name: 'key',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
  },
  {
    type: 'error',
    name: 'InsufficientValue',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidDiscount',
    inputs: [
      {
        name: 'key',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidDiscountAmount',
    inputs: [
      {
        name: 'key',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidInitialization',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidPaymentReceiver',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidValidator',
    inputs: [
      {
        name: 'key',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'validator',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'NameNotValid',
    inputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
    ],
  },
  {
    type: 'error',
    name: 'NotInitializing',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'ResolverRequiredWhenDataSupplied',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TransferFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ZeroAddress',
    inputs: [],
  },
] as const;
