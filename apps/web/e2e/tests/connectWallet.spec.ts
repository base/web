import { test } from '../testFixture';
import { connectWallet } from '../appSession';

test.describe('Connect Wallet', () => {
  test.skip('should connect to wallet', async ({ page, metamask }) => {
    if (!metamask) {
      throw new Error('Metamask is not defined');
    }

    await connectWallet(page, metamask);
  });
});
