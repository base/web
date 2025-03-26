import type { Metadata } from 'next';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { InfoCards } from 'apps/web/src/components/Builders/MiniKit/InfoCards';
import { SupportedPlatforms } from 'apps/web/src/components/Builders/MiniKit/SupportedPlatforms';
import { CtaBanner } from 'apps/web/src/components/Builders/Shared/CtaBanner';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { Hero } from 'apps/web/src/components/Builders/MiniKit/Hero';
import minikitCover from './minikit.png';

const GET_STARTED_URL = 'https://docs.base.org/builderkits/minikit/getting-started';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | MiniKit`,
  openGraph: {
    title: `Base | MiniKit`,
    url: `/builders/minikit`,
    images: [minikitCover.src],
  },
};

export default function AgentKit() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col gap-40 bg-black px-2 pt-20 md:px-0">
        <Hero />
        <InfoCards />
        <SupportedPlatforms />
        <CtaBanner
          title="Grow your app's audience"
          description="Start building with a starter template or see documentation."
          cta={
            <ButtonWithLinkAndEventLogging
              variant={ButtonVariants.Secondary}
              buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
              href={GET_STARTED_URL}
              target="_blank"
              eventName="minikit-get-started"
            >
              <div className="flex items-center gap-4">
                <span>Get started</span>
                <div className="transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="arrowRight" width={16} height={16} color="black" />
                </div>
              </div>
            </ButtonWithLinkAndEventLogging>
          }
        />
      </main>
    </Container>
  );
}
