import type { Address } from 'viem';

export type PreviousClaim = {
  address: string;
  signedMessage: string;
};

export type VerifiedAccount = {
  name: string;
  type: string;
  signature: string;
  value: {
    name: string;
    type: string;
    value: boolean;
  };
};

export enum DiscountType {
  EARLY_ACCESS = 'EARLY_ACCESS',
  CB = 'CB',
  CB1 = 'CB1',
  CB_ID = 'CB_ID',
  DISCOUNT_CODE = 'DISCOUNT_CODE',
}

export type DiscountValue = {
  schemaId?: Address;
  discountValidatorAddress: Address;
};

export type DiscountTypes = Partial<Record<DiscountType, DiscountValue>>;

export type PreviousClaims = Partial<Record<DiscountType, PreviousClaim>>;

export type MerkleTreeProofResponse = {
  discountValidatorAddress: Address;
  address: Address;
  namespace: string;
  proofs: `0x${string}`[];
};

export class ProofsException extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name; // Set the error name to the class name
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace
  }
}
