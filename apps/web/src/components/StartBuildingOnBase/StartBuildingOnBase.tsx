import Button from 'apps/web/src/components/base-org/Button';
import { ButtonSizes, ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { docsUrl } from 'apps/web/src/constants';
import Link from 'next/link';

async function ReadTheDocsButton() {
  return (
    <div className="w-[200px]">
      <Link href={docsUrl} target="_blank" rel="noreferrer noopener">
        <Button variant={ButtonVariants.Secondary} size={ButtonSizes.Large}>
          Read the docs
        </Button>
      </Link>
    </div>
  );
}

export async function StartBuildingOnBase() {
  return (
    <Container>
      <section className="flex w-full flex-col items-start  justify-between bg-black py-8 md:flex-row">
        <div className="py-16">
          <Title level={TitleLevel.Display2} className="mb-12">
            Start building on Base
          </Title>
          <ReadTheDocsButton />
        </div>
        <div className="relative h-[460px] w-full max-w-[678px]">
          <ImageAdaptive
            src="/images/start-building-on-base.png"
            className="object-contain"
            alt="Start building on base"
            fill
            quality={100}
          />
        </div>
      </section>
    </Container>
  );
}
