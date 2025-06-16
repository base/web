// Example utility functions to test
export function addNumbers(a: number, b: number): number {
  return a + b;
}

export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function validateBasename(name: string): boolean {
  if (!name || name.length < 3) return false;
  if (name.length > 20) return false;
  if (!/^[a-zA-Z0-9-]+$/.test(name)) return false;
  return true;
}

// Tests
describe('Utility Functions', () => {
  describe('addNumbers', () => {
    it('should add two positive numbers correctly', () => {
      expect(addNumbers(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(addNumbers(-2, 3)).toBe(1);
      expect(addNumbers(-2, -3)).toBe(-5);
    });

    it('should handle zero', () => {
      expect(addNumbers(0, 5)).toBe(5);
      expect(addNumbers(5, 0)).toBe(5);
    });
  });

  describe('formatAddress', () => {
    it('should format a valid Ethereum address', () => {
      const address = '0x1234567890123456789012345678901234567890';
      expect(formatAddress(address)).toBe('0x1234...7890');
    });

    it('should return short addresses unchanged', () => {
      const shortAddress = '0x123';
      expect(formatAddress(shortAddress)).toBe('0x123');
    });

    it('should handle empty string', () => {
      expect(formatAddress('')).toBe('');
    });
  });

  describe('validateBasename', () => {
    it('should accept valid basenames', () => {
      expect(validateBasename('alice')).toBe(true);
      expect(validateBasename('alice123')).toBe(true);
      expect(validateBasename('alice-bob')).toBe(true);
    });

    it('should reject invalid basenames', () => {
      expect(validateBasename('')).toBe(false);
      expect(validateBasename('ab')).toBe(false); // too short
      expect(validateBasename('a'.repeat(21))).toBe(false); // too long
      expect(validateBasename('alice.bob')).toBe(false); // invalid character
      expect(validateBasename('alice bob')).toBe(false); // space not allowed
    });
  });
});
