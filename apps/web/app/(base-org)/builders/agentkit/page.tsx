import type { Metadata } from 'next';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { Frameworks } from 'apps/web/src/components/Builders/AgentKit/Frameworks';
import { InfoCards } from 'apps/web/src/components/Builders/AgentKit/InfoCards';
import {
  AGENTKIT_DOCS_LINK,
  FORK_TEMPLATE_LINK,
} from 'apps/web/src/components/Builders/AgentKit/links';
import { OnchainActions } from 'apps/web/src/components/Builders/AgentKit/OnchainActions';
import { Possibilities } from 'apps/web/src/components/Builders/AgentKit/Possibilities';
import { Testmonials } from 'apps/web/src/components/Builders/AgentKit/Testimonials';
import { CtaBanner } from 'apps/web/src/components/Builders/Shared/CtaBanner';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { Hero } from 'apps/web/src/components/Builders/AgentKit/Hero';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | AgentKit`,
  openGraph: {
    title: `Base | AgentKit`,
    url: `/builders/agentkit`,
  },
};

export default function AgentKit() {
  return (
    <Container>
      <main className="mb-24 flex min-h-screen w-full flex-col items-center gap-40 bg-black px-2 pt-20 md:px-0">
        <Hero />
        <InfoCards />
        <OnchainActions />
        <Frameworks />
        <Testmonials />
        <Possibilities />
        <CtaBanner
          title="Ready to launch an AI Agent?"
          description="Start building with a starter template or see documentation."
          cta={
            <>
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.Secondary}
                iconName="fork"
                href={FORK_TEMPLATE_LINK}
                target="_blank"
                iconSize={16}
                eventName="agentkit-fork-template"
                buttonClassNames="flex items-center justify-between px-4 pb-2.5 pt-3 font-medium"
              >
                Fork a template
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
                href={AGENTKIT_DOCS_LINK}
                target="_blank"
                variant={ButtonVariants.SecondaryOutline}
                eventName="agentkit-docs"
                buttonClassNames="flex items-center justify-between px-4 pb-2.5 pt-3 group font-medium"
              >
                <div className="flex items-center justify-between gap-6">
                  <span>Docs</span>
                  <div className="transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="arrowRight" width={16} height={16} color="white" />
                  </div>
                </div>
              </ButtonWithLinkAndEventLogging>
            </>
          }
        />
      </main>
    </Container>
  );
}
