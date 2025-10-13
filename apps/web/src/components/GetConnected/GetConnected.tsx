import Container from 'apps/web/src/components/base-org/Container';
import GetConnectedButton from './GetConnectedButton';

export async function GetConnected() {
  return (
    <Container>
      <div className="flex min-h-[300px] w-full  flex-row flex-wrap items-start justify-between bg-black">
        <div className="pb-16 font-display text-2xl uppercase text-white lg:text-3xl">
          <h3 className="mb-[12px]">Get Connected</h3>
        </div>
        <div className="flex flex-row gap-4 lg:h-full lg:items-center lg:gap-8">
          <GetConnectedButton
            iconName="farcaster"
            href="https://warpcast.com/base"
            eventName="farcaster"
            title="Join us on Warpcast"
            aria-label="Join us on Warpcast"
          />
          <GetConnectedButton
            iconName="discord"
            href="https://discord.com/invite/buildonbase"
            eventName="discord"
            title="Join us on Discord"
            aria-label="Join us on Discord"
          />
          <GetConnectedButton
            iconName="twitter"
            href="https://x.com/base"
            eventName="twitter"
            title="Join us on X"
            aria-label="Join us on X"
          />
          <GetConnectedButton
            iconName="github"
            href="https://github.com/base-org"
            eventName="github"
            title="Join us on Github"
            aria-label="Join us on Github"
          />
        </div>
      </div>
    </Container>
  );
}
