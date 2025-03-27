import { LiveDemo as LiveDemoComponent } from 'apps/web/src/components/Builders/Shared/LiveDemo';

const components = ['Wallet', 'Buy', 'Fund', 'Earn', 'Mint', 'Transact'];

export function LiveDemo() {
  return (
    <LiveDemoComponent title="Experience how easy it is to build on Base" components={components} />
  );
}
