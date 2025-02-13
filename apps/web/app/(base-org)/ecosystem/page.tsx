import type { Metadata } from 'next';
import { Suspense } from 'react';
import Content from 'apps/web/src/components/Ecosystem/Content';
import Container from 'apps/web/src/components/base-org/Container';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import RotatingCircle from 'apps/web/src/components/base-org/ecosystem/RotatingCircle';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Ecosystem`,
  openGraph: {
    title: `Base | Ecosystem`,
    url: `/ecosystem`,
  },
};

async function EcosystemHero() {
  const generateKeys = (prefix: string, count: number) =>
    Array.from(
      { length: count },
      (_, i) => `${prefix}-${i}-${Math.random().toString(36).substr(2, 9)}`,
    );

  const topKeys = generateKeys('top', 4);
  const middleKeys = generateKeys('middle', 5);
  const bottomKeys = generateKeys('bottom', 4);

  return (
    <div className="flex w-full flex-col items-center overflow-hidden bg-black pb-20 pt-20">
      <Container>
        <div className="flex w-full flex-col items-center justify-between gap-12 py-20 md:flex-row">
          <div className="flex w-full flex-col gap-8 md:max-w-lg">
            <Title level={TitleLevel.Display3}>Built on Base to bring the world onchain.</Title>
            <a
              href="https://github.com/base/web?tab=readme-ov-file#updating-the-base-ecosystem-page"
              target="_blank"
              rel="noreferrer noopener"
              className="max-w-fit"
              tabIndex={-1} // Prevents focus on anchor (want to focus on button)
            >
              <Button variant={ButtonVariants.Secondary}>Submit your app</Button>
            </a>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-shrink-0 justify-center gap-4">
              {topKeys.map((key, i) => (
                <div key={key} className="w-[80px] md:w-[100px]">
                  <RotatingCircle theme={i % 5} />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              {middleKeys.map((key, i) => (
                <div key={key} className="w-[80px] md:w-[100px]">
                  <RotatingCircle theme={i % 5} />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              {bottomKeys.map((key, i) => (
                <div key={key} className="w-[80px] md:w-[100px]">
                  <RotatingCircle theme={i % 5} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default async function Ecosystem() {
  return (
    <main className="flex w-full flex-col items-center bg-black">
      <EcosystemHero />

      <Container>
        <Suspense fallback={<div />}>
          <Content />
        </Suspense>
      </Container>
    </main>
  );
}
