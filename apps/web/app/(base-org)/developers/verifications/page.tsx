import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { CtaBanner } from 'apps/web/src/components/Developers/Shared/CtaBanner';
import { Customers } from 'apps/web/src/components/Developers/Verifications/Customers';
import { InfoCards } from 'apps/web/src/components/Developers/Verifications/InfoCards';
import { ValueProps } from 'apps/web/src/components/Developers/Verifications/ValueProps';
import verification from 'apps/web/src/components/Developers/Verifications/verification.svg';
import Image, { StaticImageData } from 'next/image';

export default async function Verifications() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col items-center gap-40 bg-black px-2 pt-20 md:px-0">
        {/* Header  */}
        <div className="flex flex-col gap-2 pt-20 md:items-center">
          <div className="flex items-center gap-2 pb-6 text-[#44C28D]">
            <Image
              src={verification as StaticImageData}
              alt="verification"
              width={32}
              height={32}
              className="h-5 w-5"
            />
            <Title level={TitleLevel.Title3} className="font-bold">
              Verifications
            </Title>
          </div>
          <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
            Identify your high-quality users
          </Title>
          <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
            Identify your high-quality users
          </Title>
          <Title level={TitleLevel.Title3} className="max-w-2xl text-gray-muted md:text-center">
            Verifications is the link that lets you verify over 500,000+ connected wallets and
            Coinbase accounts of specific attributes.
          </Title>

          <div className="flex gap-6 pt-5">
            <ButtonWithLinkAndEventLogging
              eventName="verifications-get-started"
              iconName="arrowRight"
              variant={ButtonVariants.Secondary}
              href="https://login.coinbase.com/signin"
              target="_blank"
              buttonClassNames="rounded-xl"
            >
              Start building
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>

        <InfoCards />
        <ValueProps />
        <Customers />
        <CtaBanner
          title="Know your users"
          description="Start building with Verifications today"
          cta={
            <ButtonWithLinkAndEventLogging
              variant={ButtonVariants.Secondary}
              iconName="arrowRight"
              iconSize="12"
              buttonClassNames="rounded-xl"
              href="https://login.coinbase.com/signin"
              target="_blank"
              eventName="verifications-get-started"
            >
              Get started
            </ButtonWithLinkAndEventLogging>
          }
        />
      </main>
    </Container>
  );
}
