import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export async function Cost() {
  return (
    <Container>
      <div className="flex w-full flex-col space-y-20 bg-black py-12">
        <div className="grid grid-cols-2">
          <Title level={TitleLevel.Display3}>Cost</Title>

          <div className="text-md font-sans text-white">
            <p>
              Base Bootcamp is <span className="font-bold">free</span>. However, we require you to{' '}
              <span className="font-bold">deposit 1 ETH</span>, which we will return to you upon
              your successful, on-time graduation. We’re doing this so that you have skin in the
              game. The program is going to be difficult and we need you to have as many reasons as
              necessary to push through.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
