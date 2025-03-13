import type { Metadata } from 'next';
import Container from 'apps/web/src/components/base-org/Container';
import { InfoCards } from 'apps/web/src/components/Builders/SmartWallet/InfoCards';
import { Transactions } from 'apps/web/src/components/Builders/SmartWallet/Transactions';
import { Customers } from 'apps/web/src/components/Builders/SmartWallet/Customers';
import { CtaBanner } from 'apps/web/src/components/Builders/Shared/CtaBanner';
import { LiveDemo } from 'apps/web/src/components/Builders/Shared/LiveDemo';
import { Hero } from 'apps/web/src/components/Builders/SmartWallet/Hero';
import smartWalletCover from './smart-wallet.png';
import { CopyNpmButton } from 'apps/web/src/components/Builders/Shared/CopyNpmButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Smart Wallet`,
  openGraph: {
    title: `Base | Smart Wallet`,
    url: `/builders/smart-wallet`,
    images: [smartWalletCover.src],
  },
};

// Extract the array to a constant to avoid creating a new array on each render
const WALLET_COMPONENTS = ['Wallet'];

export default function BaseWallet() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col items-center gap-40 bg-black px-2 pt-20 md:px-0">
        <Hero />
        <Customers />
        <InfoCards />
        <Transactions />
        <LiveDemo
          components={WALLET_COMPONENTS}
          title="Unlock onboarding superpowers with a few lines of code"
          hideDescription
        />

        <CtaBanner
          title="Integrate Smart Wallet in minutes"
          description="Start building with a starter template or see documentation."
          cta={<CopyNpmButton />}
        />
      </main>
    </Container>
  );
}
