import { ButtonSizes, ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { ButtonWithLinkAndEventLogging } from '../Button/ButtonWithLinkAndEventLogging';
import buildWithUs from './images/build-with-us.png';
import { linkTextClasses } from './styles';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

const containerClasses = `
  w-full max-w-[1440px]
  px-12 sm:px-16 lg:px-24 2xl:px-0
  mt-6 sm:mt-8 lg:mt-10
  mb-20 sm:mb-16 lg:mb-20
`;

const imageClasses = `
  flex flex-col items-center justify-center
  aspect-[1250/380] w-full max-w-[1440px]
  p-4 sm:p-8
  mx-auto
  bg-cover bg-center bg-no-repeat
`;

export default async function BuildWithUsFooter() {
  const imageBackgroundStyles = {
    backgroundImage: `url('${buildWithUs.src}')`,
  };

  return (
    <div className={containerClasses}>
      <div className={imageClasses} style={imageBackgroundStyles}>
        <Title level={TitleLevel.Display2} className="mb-6 text-center sm:mb-8">
          Start building with us
        </Title>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-8">
          <ButtonWithLinkAndEventLogging
            href="https://lu.ma/base-virtualevents/?utm_source=dotorg&medium=builderkit"
            eventName="start_building_with_us_contact_us"
            target="_blank"
            rel="noreferrer noopener"
            variant={ButtonVariants.Secondary}
            size={ButtonSizes.Large}
            buttonClassNames={`${linkTextClasses} rounded-[3px]`}
          >
            Virtual Events
          </ButtonWithLinkAndEventLogging>
          <ButtonWithLinkAndEventLogging
            href="https://docs.base.org/docs/?utm_source=dotorg&utm_medium=builderkit"
            eventName="start_building_with_us_view_docs"
            target="_blank"
            rel="noreferrer noopener"
            variant={ButtonVariants.Outlined}
            size={ButtonSizes.Large}
            buttonClassNames={`${linkTextClasses} rounded-[3px]`}
          >
            View Our Docs
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>
    </div>
  );
}
