import Container from 'apps/web/src/components/base-org/Container';
import Link from 'next/link';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonSizes, ButtonVariants } from 'apps/web/src/components/base-org/Button/types';

export async function Dates() {
  return (
    <Container>
      <div className="flex w-full flex-col gap-12 bg-black py-12">
        <Title level={TitleLevel.Display3}>Dates and deadlines</Title>

        <div className="grid grid-cols-2">
          <div className="text-md font-sans text-white">
            <p className="pb-2">
              <span className="font-bold">Cohort 4: Approximately</span> March 18, 2024
            </p>
            <p>
              <span className="font-bold">Application deadline:</span> March 11, 2024
            </p>

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
        </div>
      </div>
    </Container>
  );
}
