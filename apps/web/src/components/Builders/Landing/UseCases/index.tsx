import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { UseCaseBlock } from 'apps/web/src/components/Builders/Landing/UseCases/UseCaseBlock';
import { AnimatedOnboarding } from 'apps/web/src/components/Builders/Shared/assets/UseCases/Onboarding';
import { AnimatedPayment } from 'apps/web/src/components/Builders/Shared/assets/UseCases/Payments';
import { AnimatedBaseAgent } from 'apps/web/src/components/Builders/Shared/assets/UseCases/BaseAgent';
import { AnimatedSocial } from 'apps/web/src/components/Builders/Shared/assets/UseCases/Social';
import { AnimatedDefi } from 'apps/web/src/components/Builders/Shared/assets/UseCases/Defi';
import { AnimatedGasless } from 'apps/web/src/components/Builders/Shared/assets/UseCases/Gasless';

export function UseCases() {
  return (
    <section className="h-full w-full">
      <Title level={TitleLevel.Title1} as="h2">
        Everything you need to build, scale, and monetize your onchain app
      </Title>
      <div className="mt-6 grid grid-cols-1 gap-9 md:mt-9 md:grid-cols-2">
        <UseCaseBlock
          title="Onboard everyone"
          description="Let users sign up and sign in with Smart Wallet — the universal account for the onchain world."
          href="https://docs.base.org/use-cases/onboard-any-user"
        >
          <div className="flex h-[320px] w-[285px] flex-col items-center justify-center md:w-1/2">
            <AnimatedOnboarding />
          </div>
        </UseCaseBlock>
        <UseCaseBlock
          title="Accept crypto payments"
          description="Integrate secure and efficient crypto payment solutions for your apps."
          href="https://docs.base.org/use-cases/accept-crypto-payments"
        >
          <AnimatedPayment />
        </UseCaseBlock>
        <UseCaseBlock
          title="Launch AI agents"
          description="Build and deploy AI agents that can interact with onchain data and smart contracts."
          href="https://docs.base.org/use-cases/launch-ai-agents"
        >
          <AnimatedBaseAgent />
        </UseCaseBlock>
        <UseCaseBlock
          title="Kickstart your app's growth"
          description="Use decentralized social graphs to grow your app and find users — wherever they are."
          href="https://docs.base.org/use-cases/decentralize-social-app"
        >
          <AnimatedSocial />
        </UseCaseBlock>
        <UseCaseBlock
          title="Unlock the power of DeFi"
          description="Integrate DeFi protocols and services directly into your app. "
          href="https://docs.base.org/use-cases/defi-your-app"
        >
          <AnimatedDefi />
        </UseCaseBlock>
        <UseCaseBlock
          title="Remove first-timer friction"
          description="Enable gasless transactions and simplify user onboarding."
          href="https://docs.base.org/use-cases/go-gasless"
        >
          <AnimatedGasless />
        </UseCaseBlock>
      </div>
    </section>
  );
}
