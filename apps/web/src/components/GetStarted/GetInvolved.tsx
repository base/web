import Title from 'apps/web/src/components/base-org/typography/Title';
import { Icon } from '../Icon/Icon';
import ResourceCard from './ResourceCard/ResourceCard';
import { gridClasses } from './styles';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export const GET_INVOLVED_SECTION_ID = 'GetInvolved';

export default async function GetInvolved() {
  return (
    <div id={GET_INVOLVED_SECTION_ID}>
      <Title level={TitleLevel.Display2} className="mb-6">
        Get Involved
      </Title>
      <div className={gridClasses}>
        <ResourceCard
          title="Join the Discord"
          description="Join our Discord of over 400K+ members and get involved in our Base community"
          href="https://discord.com/invite/buildonbase"
          topLeft={<span className="font-mono">01</span>}
          topRight={<Icon name="diagonalUpArrow" width="16px" height="16px" />}
          classnames="bg-teal-80 border-teal-80"
        />
        <ResourceCard
          title="Based Builders"
          description="Connect with some based builders. This link is not curated, monitored, or an official endorsement by Base."
          href="https://x.com/i/lists/1869425408573075694"
          topLeft={<span className="font-mono">02</span>}
          topRight={<Icon name="diagonalUpArrow" width="16px" height="16px" />}
          classnames="bg-teal-60 border-teal-60"
        />
        <ResourceCard
          title="Host a Meetup"
          description="Sign up to host a meetup with other Based builders anywhere in the world"
          href="https://docs.google.com/forms/d/e/1FAIpQLSf5wnzD_czyYOyHFeOmFK_rjsJj7Utovo3jWwR40JizPqmDZg/viewform"
          topLeft={<span className="font-mono">03</span>}
          topRight={<Icon name="diagonalUpArrow" width="16px" height="16px" />}
          classnames="bg-teal-80 border-teal-80"
        />
        <ResourceCard
          title="Use Apps on Base"
          description="Browse and use projects being built on the Base ecosystem"
          href="https://www.base.org/ecosystem?utm_source=dotorg&utm_medium=builderkit"
          topLeft={<span className="font-mono">04</span>}
          topRight={<Icon name="diagonalUpArrow" width="16px" height="16px" />}
          classnames="bg-teal-60 border-teal-60"
        />
      </div>
    </div>
  );
}
