/**
 * Ecosystem Types
 *
 * Type definitions for the Base Ecosystem page components and data structures.
 * These types ensure type safety across ecosystem-related components.
 */

/**
 * Valid ecosystem categories
 * Each category groups related projects in the Base ecosystem
 */
export type EcosystemCategory = 'ai' | 'consumer' | 'defi' | 'infra' | 'onramp' | 'wallet';

/**
 * Subcategories for AI projects
 */
export type AISubcategory = 'ai';

/**
 * Subcategories for Consumer projects
 */
export type ConsumerSubcategory =
  | 'creator'
  | 'crypto taxes'
  | 'dao'
  | 'gaming'
  | 'messaging'
  | 'music'
  | 'nft'
  | 'payments'
  | 'real world'
  | 'social';

/**
 * Subcategories for DeFi projects
 */
export type DeFiSubcategory =
  | 'dex'
  | 'dex aggregator'
  | 'insurance'
  | 'lending/borrowing'
  | 'liquidity management'
  | 'portfolio'
  | 'stablecoin'
  | 'yield vault';

/**
 * Subcategories for Infrastructure projects
 */
export type InfraSubcategory =
  | 'bridge'
  | 'data'
  | 'depin'
  | 'developer tool'
  | 'identity'
  | 'node provider'
  | 'raas'
  | 'security';

/**
 * Subcategories for Onramp projects
 */
export type OnrampSubcategory = 'centralized exchange' | 'fiat on-ramp';

/**
 * Subcategories for Wallet projects
 */
export type WalletSubcategory = 'account abstraction' | 'multisig' | 'self-custody';

/**
 * Union type of all valid subcategories
 */
export type EcosystemSubcategory =
  | AISubcategory
  | ConsumerSubcategory
  | DeFiSubcategory
  | InfraSubcategory
  | OnrampSubcategory
  | WalletSubcategory;

/**
 * Represents a project/app in the Base ecosystem
 */
export interface EcosystemApp {
  /** Display name of the project */
  name: string;
  /** Brief description of the project (max 200 characters) */
  description: string;
  /** Project website URL */
  url: string;
  /** Path to the project's logo image (e.g., '/images/partners/logo.png') */
  imageUrl: string;
  /** Primary category of the project */
  category: EcosystemCategory;
  /** Subcategory within the primary category */
  subcategory: EcosystemSubcategory;
}

/**
 * Extended ecosystem app with search-optimized fields
 * Used internally for filtering and searching
 */
export interface DecoratedEcosystemApp extends EcosystemApp {
  /** Lowercase version of name for case-insensitive search */
  searchName: string;
}

/**
 * Configuration mapping categories to their subcategories
 */
export type EcosystemCategoryConfig = Record<EcosystemCategory, EcosystemSubcategory[]>;

/**
 * Props for ecosystem filter components
 */
export interface EcosystemFilterProps {
  /** Currently selected categories */
  selectedCategories: string[];
  /** Currently selected subcategories */
  selectedSubcategories: string[];
  /** Callback to update selected subcategories */
  setSelectedSubcategories: (subcategories: string[]) => void;
  /** Category to subcategory configuration */
  config: Record<string, string[]>;
}
