import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { HowItWorksCard } from 'apps/web/src/components/Bootcamp/HowItWorks/HowItWorksCard';

const featureItems = [
  {
    number: '1',
    title: 'Apply',
    description: (
      <div className="text-md font-sans text-white">
        <p>
          Are you a crypto-proficient software engineer interested in learning to build smart
          contracts? Start out by applying to Base Bootcamp.
        </p>
      </div>
    ),
  },
  {
    number: '2',
    title: 'Onboard',
    description:
      'Upon acceptance, you’ll receive an email with all relevant onboarding materials (student handbook, mentor-pairing info, invite to the private Base Bootcamp Discord channel, and invite to the launch day).',
  },
  {
    number: '3',
    title: 'Kickoff',
    description:
      'Gather virtually for our initial kick-off. We’ll pair you with your mentor (an experienced Smart Contract Developer) and you’ll start the program.',
  },
  {
    number: '4',
    title: 'Build!',
    description: (
      <div className="text-md font-sans text-white">
        <p>
          Work through{' '}
          <a
            className="underline"
            target="_blank"
            href="https://docs.base.org/base-learn/docs/welcome"
            rel="noreferrer"
          >
            Base Learn
          </a>
          , meeting regularly with your mentor. You’ll build your final project during the final two
          weeks - a real-world, onchain app that you’ll demo virtually on Demo Day.
        </p>

        <br />

        <p>
          Upon graduation, you’ll earn an exclusive soulbound{' '}
          <a
            className="underline"
            href="https://opensea.io/collection/base-bootcamp-grad"
            target="_blank"
            rel="noreferrer"
          >
            Base Bootcamp Grad NFT
          </a>
          .
        </p>
      </div>
    ),
  },
];

export async function HowItWorks() {
  return (
    <Container>
      <div className="flex w-full flex-col gap-12 bg-black py-12 pt-20">
        <div className="flex w-full flex-col font-display">
          <Title level={TitleLevel.Display3}>How it works</Title>
        </div>
        <div className=" flex w-full flex-row justify-between gap-6 pb-8 ">
          {featureItems.map((item) => (
            <HowItWorksCard key={item.number} featureItem={item} />
          ))}
        </div>
      </div>
    </Container>
  );
}
