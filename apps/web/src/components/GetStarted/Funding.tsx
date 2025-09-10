import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from '../Icon/Icon';
import ResourceCard from './ResourceCard/ResourceCard';
import { gridClasses } from './styles';
import Title from 'apps/web/src/components/base-org/typography/Title';

export const FUNDING_SECTION_ID = 'GetFunded';

export default async function Funding() {
  return (
    <div id={FUNDING_SECTION_ID}>
      <Title level={TitleLevel.Display2} className="mb-6">
        Fund Your Project
      </Title>
      <div className={gridClasses}>
        <ResourceCard
          title="Base Ecosystem Fund"
          description="Early stage projects (pre-seed to seed) building on Base can apply for investment"
          href="https://docs.google.com/forms/d/e/1FAIpQLSeiSAod4PAbXlvvDGtHWu-GqzGpvHYfaTQR2f77AawD7GYc4Q/viewform"
          topLeft={<span className="font-mono">01</span>}
          topRight={<Icon name="diagonalUpArrow" width="16px" height="16px" />}
          classnames="bg-green-80 border-green-80"
        />
        <ResourceCard
          title="Rounds Grants"
          description="Post to /base-builds on Farcaster to be eligible for 2.25 ETH in weekly rewards"
          href="https://warpcast.com/base/0xb3f1428b?utm_source=dotorg&urm_medium=builderkit"
          topLeft={<span className="font-mono">02</span>}
          topRight={<Icon name="diagonalUpArrow" width="16px" height="16px" />}
          classnames="bg-green-60 border-green-60"
        />
        <ResourceCard
          title="Gas Credits"
          description="Eligible projects may receive up to $15K in gas credits for their users"
          href="https://www.smartwallet.dev/base-gasless-campaign/?utm_source=dotorg&utm_medium=builderkit"
          topLeft={<span className="font-mono">03</span>}
          topRight={<Icon name="diagonalUpArrow" width="16px" height="16px" />}
          classnames="bg-green-80 border-green-80"
        />
      </div>
    </div>
  );
}
