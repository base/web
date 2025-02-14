import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export function BottomCta() {
  return (
    <section className="my-24 w-full bg-black">
      <div className="flex flex-col items-center rounded-2xl bg-dark-palette-backgroundAlternate py-16">
        <div className="px-9 text-center md:hidden">
          <Title level={TitleLevel.Title3} as="h2">
            Feeling inspired? Start building today.
          </Title>
          <Title level={TitleLevel.Headline} as="p" className="mt-2 font-normal">
            Start building with a starter template or see documentation.
          </Title>
        </div>
        <div className="hidden md:block">
          <Title level={TitleLevel.Title1} as="h2">
            Feeling inspired? Start building today.
          </Title>
          <Title level={TitleLevel.Title4} as="p" className="mt-2">
            Start building with a starter template or see documentation.
          </Title>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.Secondary}
            linkClassNames="text-base font-medium text-white block"
            buttonClassNames="flex w-full items-center justify-between px-4 py-3 group !rounded-xl"
            target="_blank"
            href="/builders/stories"
            eventName="bottom-cta-get-started"
          >
            <div className="flex w-40 items-center justify-between">
              <span>Get Started</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={20} height={20} color="black" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.SecondaryOutline}
            linkClassNames="text-base font-medium text-white block"
            buttonClassNames="flex w-full items-center justify-between px-4 py-3 group !rounded-xl"
            target="_blank"
            href="https://docs.base.org"
            eventName="bottom-cta-documentation"
          >
            <div className="flex w-40 items-center justify-between">
              <span>Explore Use Cases</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={20} height={20} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>
    </section>
  );
}
