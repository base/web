/**
 * Type exports for the Base web application
 *
 * This barrel file re-exports all types from the types directory
 * for convenient importing throughout the application.
 */

export type {
  EcosystemApp,
  EcosystemCategory,
  EcosystemSubcategory,
  DecoratedEcosystemApp,
  EcosystemCategoryConfig,
  EcosystemFilterProps,
  AISubcategory,
  ConsumerSubcategory,
  DeFiSubcategory,
  InfraSubcategory,
  OnrampSubcategory,
  WalletSubcategory,
} from './ecosystem';

export type { ManagedAddressesData, ManagedAddressesResponse } from './ManagedAddresses';
