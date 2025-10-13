import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import CoreContributors from 'apps/web/src/components/CoreContributors/CoreContributors';

export default async function BuildingBase() {
  return (
    <Container>
      <section className="flex w-full flex-col gap-24 pb-10 lg:flex-row lg:gap-16 lg:pb-40">
        <Title level={TitleLevel.Display1}>
          We&#39;ve been building towards Base for the last 10 years.
        </Title>
        <div className="flex w-full flex-col font-display text-lg text-white ">
          <p>
            From the beginning,{' '}
            <a
              href="https://www.coinbase.com/blog/the-coinbase-secret-master-plan"
              rel="noreferrer noopener"
              target="_blank"
              className="underline"
            >
              our secret master plan
            </a>{' '}
            has been clear and consistent: create an open financial system that increases economic
            freedom globally by moving deliberately through four phases.
          </p>
          <h2 className="pt-8 text-xl font-bold">Phase 1: Develop the protocol (1M people)</h2>
          <p>
            New protocols (Bitcoin, Ethereum, etc) were invented and people began to tinker with
            them. Open source communities developed around each protocol and early adopters began
            experimenting with how they could be used.
          </p>
          <h2 className="pt-8 text-xl font-bold">
            Phase 2: Build a digital currency exchange (10M people)
          </h2>
          <p>
            Coinbase started here. Investment or speculation is a bootstrapping mechanism for a
            payment network (in other words, it is the{' '}
            <a
              href="https://cdixon.org/2010/06/12/designing-products-for-single-and-multiplayer-modes"
              target="_blank"
              rel="noreferrer noopener"
              className="underline"
            >
              single-player mode
            </a>{' '}
            of digital currency). And the creation of safe and easy to use exchanges served as a{' '}
            <a
              href="https://medium.com/the-coinbase-blog/building-the-bridge-why-compliance-is-key-to-digital-currencys-success-7bfdd88a084c#.e39dojmef"
              target="_blank"
              rel="noreferrer noopener"
              className="underline"
            >
              bridge
            </a>{' '}
            for people to get their local currency into and out of digital currency.
          </p>
          <h2 className="pt-8 text-xl font-bold">
            Phase 3: Build a mass market interface for digital currency apps (100M people)
          </h2>
          <p>
            To move beyond just exchange and investment, consumers and businesses needed an easy
            interface to start using digital currency and its applications. Countless applications
            have been built to let anyone, anywhere access the nascent cryptoeconomy, including
            Coinbase, Coinbase Wallet, Metamask, Rainbow, Trust Wallet, and others.
          </p>
          <h2 className="pt-8 text-xl font-bold">
            Phase 4: Build the onchain apps of an open financial system (1B+ people)
          </h2>
          <p>
            With the interfaces in place, our existing financial system now needs to be recreated on
            open networks and made globally accessible. We’re seeing this happen in front of our
            eyes: USDC has brought billions of dollars onchain, cbETH enables holders anywhere to
            secure the financial system while earning rewards, and hundreds of onchain apps are
            enabling countless individuals and institutions to transact with lower fees, more
            security, and unparalleled access.
          </p>
          <p className="pt-8">
            We&#39;ve had countless conversations about how we can accelerate Phase 4 of this plan
            with both internal teams and external collaborators. The takeaway is that in order to
            unlock the scale, usability, and security needed for the final phase, we actually need
            to go back to the beginning: developing the underlying protocols that enable the end
            user applications.
          </p>
          <p className="pt-8">
            We started by doing this on Ethereum, driving{' '}
            <a
              href="https://www.coinbase.com/blog/supporting-eip-4844-reducing-fees-for-ethereum-layer-2-rollups"
              target="_blank"
              rel="noreferrer noopener"
              className="underline"
            >
              EIP4844
            </a>{' '}
            with Optimism to enable L2 rollups to scale.{' '}
            <span>But we don&#39;t believe that&#39;s enough, so here we are.</span>
          </p>
          <p className="pt-8">Base is our “all in” commitment to onchain.</p>
          <p className="pt-8">
            We believe that the onchain platform is the most important builder platform since the
            internet (“online”). We believe that the onchain platform should be open source, free to
            use, and globally available. And we believe that in order to make it really work, we
            need all hands on deck, working together to scale in a secure, safe, easy-to-use way.
          </p>
          <p className="pt-8">Join us.</p>
          <h2 className="pt-8 font-bold">
            <a
              href="https://etherscan.io/address/0xd1633593373974e94b2dd7ebd3c6452328ffe079"
              target="_blank"
              rel="noreferrer noopener"
              className="underline"
            >
              Base Contributors
            </a>
          </h2>
          <CoreContributors />
        </div>
      </section>
    </Container>
  );
}
