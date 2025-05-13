import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { CtaBanner } from 'apps/web/src/components/Builders/Shared/BottomCta/CtaBanner';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { Icon } from 'apps/web/src/components/Icon/Icon';

export function BottomCta() {
  return (
    <CtaBanner
      title="Feeling inspired? Start building today."
      description="Start building with a starter template or see documentation."
      cta={
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.Secondary}
            linkClassNames="text-base font-medium text-white block"
            buttonClassNames="flex items-center justify-between px-4 py-3 group"
            target="_blank"
            href="https://docs.base.org/quickstart"
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
            buttonClassNames="flex items-center justify-between px-4 py-3 group"
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
      }
    />
  );
}
