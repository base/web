import type { Metadata } from 'next';
import AnalyticsProvider from '../../../contexts/Analytics';
import Hero from 'apps/web/src/components/base-org/BasePay/Hero';
import OneClickCheckout from 'apps/web/src/components/base-org/BasePay/OneClickCheckout';
import BuyRealThings from 'apps/web/src/components/base-org/BasePay/BuyRealThings';
import SpendCrypto from 'apps/web/src/components/base-org/BasePay/SpendCrypto';
import Earn from 'apps/web/src/components/base-org/BasePay/Earn';
import UsingBasePay from 'apps/web/src/components/base-org/BasePay/UsingBasePay';
import AcceptBasePay from 'apps/web/src/components/base-org/BasePay/AcceptBasePay';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: 'Base Pay',
  description: 'The fastest way to pay with USDC.',
  openGraph: {
    title: 'Base Pay',
    description: 'The fastest way to pay with USDC.',
    url: '/base-pay',
  },
};

export default async function Pay() {
  return (
    <AnalyticsProvider context="base_pay">
      <div id="webgl-canvas" className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="-z-1 h-full w-full">
          <WebGLCanvas />
        </div>
      </div>
      <Container className="lg:pt-0">
        <div className="col-span-full flex flex-col gap-12">
          <Hero />
          <div className="flex flex-col gap-12 md:mx-14">
            <OneClickCheckout />
            <BuyRealThings />
            <SpendCrypto />
            <Earn />
            <UsingBasePay />
            <AcceptBasePay />
          </div>
        </div>
      </Container>
    </AnalyticsProvider>
  );
}
