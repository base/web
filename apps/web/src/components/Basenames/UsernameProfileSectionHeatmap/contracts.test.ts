import { bridges, lendBorrowEarn } from './contracts';

describe('contracts', () => {
  describe('bridges', () => {
    it('should be a Set instance', () => {
      expect(bridges).toBeInstanceOf(Set);
    });

    it('should contain known bridge addresses', () => {
      // First bridge address in the file
      expect(bridges.has('0x8ed95d1746bf1e4dab58d8ed4724f1ef95b20db0')).toBe(true);
      // Last bridge address in the file
      expect(bridges.has('0x09aea4b2242abc8bb4bb78d537a67a245a7bec64')).toBe(true);
      // A middle address
      expect(bridges.has('0x99c9fc46f92e8a1c0dec1b1747d010903e884be1')).toBe(true);
    });

    it('should not contain addresses that are not bridges', () => {
      expect(bridges.has('0x0000000000000000000000000000000000000000')).toBe(false);
      expect(bridges.has('0xinvalid')).toBe(false);
      expect(bridges.has('')).toBe(false);
    });

    it('should have more than 100 bridge addresses', () => {
      expect(bridges.size).toBeGreaterThan(100);
    });

    it('should contain lowercase addresses', () => {
      for (const address of bridges) {
        expect(address).toBe(address.toLowerCase());
      }
    });

    it('should contain valid Ethereum address format', () => {
      const ethereumAddressRegex = /^0x[a-f0-9]{40}$/;
      for (const address of bridges) {
        expect(address).toMatch(ethereumAddressRegex);
      }
    });
  });

  describe('lendBorrowEarn', () => {
    it('should be a Set instance', () => {
      expect(lendBorrowEarn).toBeInstanceOf(Set);
    });

    it('should contain known lend/borrow/earn addresses', () => {
      // First address in the file
      expect(lendBorrowEarn.has('0x1e4b7a6b903680eab0c5dabcb8fd429cd2a9598c')).toBe(true);
      // Last address in the file
      expect(lendBorrowEarn.has('0x70778cfcfc475c7ea0f24cc625baf6eae475d0c9')).toBe(true);
      // A known DeFi address (Aave)
      expect(lendBorrowEarn.has('0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9')).toBe(true);
    });

    it('should not contain addresses that are not lend/borrow/earn contracts', () => {
      expect(lendBorrowEarn.has('0x0000000000000000000000000000000000000000')).toBe(false);
      expect(lendBorrowEarn.has('0xinvalid')).toBe(false);
      expect(lendBorrowEarn.has('')).toBe(false);
    });

    it('should have more than 100 lend/borrow/earn addresses', () => {
      expect(lendBorrowEarn.size).toBeGreaterThan(100);
    });

    it('should contain valid Ethereum address format', () => {
      const ethereumAddressRegex = /^0x[a-f0-9]{40}$/i;
      for (const address of lendBorrowEarn) {
        expect(address).toMatch(ethereumAddressRegex);
      }
    });
  });

  describe('sets are distinct', () => {
    it('bridges and lendBorrowEarn should be different sets', () => {
      expect(bridges).not.toBe(lendBorrowEarn);
    });

    it('should have some addresses unique to bridges', () => {
      // First bridge address should not be in lendBorrowEarn
      expect(lendBorrowEarn.has('0x8ed95d1746bf1e4dab58d8ed4724f1ef95b20db0')).toBe(false);
    });

    it('should have some addresses unique to lendBorrowEarn', () => {
      // Aave V2 lending pool should not be in bridges
      expect(bridges.has('0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9')).toBe(false);
    });
  });
});
