import Button from 'apps/web/src/components/base-org/Button';
import { ButtonSizes, ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';

import Link from 'next/link';

const subtitleCopy =
  'Base Bootcamp is an async, cohort-based training program designed to turn web developers into Smart Contract developers.';

export async function Hero() {
  return (
    <header className="flex h-[700px] w-full flex-col items-center bg-black bg-bootcamp_background_image bg-cover">
      <Container>
        <div className="mt-48 flex w-full flex-col pt-12">
          <div className="flex w-full flex-col font-display text-4xl text-white md:text-6xl lg:text-7xl">
            <p>Learn to build onchain</p>
            <p className="max-w-sm pt-6 font-display text-sm text-white md:max-w-md md:text-lg lg:text-left">
              {subtitleCopy}
            </p>
          </div>
          <div className="mt-10 w-[200px]">
            <Link
              className="w-full"
              href="https://forms.gle/iqZqJ6WAqkWaouLn8"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button variant={ButtonVariants.Secondary} size={ButtonSizes.Large} fullWidth>
                Apply now
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
