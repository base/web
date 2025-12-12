import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export default function ShopifyBaseUsdcArticle({ className }: Props) {
  return (
    <article
      className={classNames(
        'prose prose-neutral mx-auto flex flex-col font-sans prose-headings:font-normal prose-headings:text-black prose-strong:font-medium',
        className,
      )}
    >
      <header className="">
        <Title level={TitleLevel.H1Regular}>USDC on Base in Shopify</Title>

        <Text variant={TextVariant.Body}>
          Shopify wanted payments that feel like the internet: instant, global, programmable.
          Together, Shopify and Base made USDC on Base a native option inside Shopify Payments—so
          eligible merchants can add stablecoin checkout with minimal extra work and keep using the
          tools they already trust.
        </Text>

        <Text variant={TextVariant.Body}>
          This is a blueprint for every commerce platform, PSP, and marketplace that wants to do the
          same.
        </Text>
      </header>

      <section className="" aria-labelledby="challenge">
        <h2 id="challenge">The challenge: card-centric rails in an onchain world</h2>

        <Text variant={TextVariant.Body}>
          Global commerce is still running on rails built for plastic cards and batch files:
        </Text>

        <ul className="">
          <li>
            Cross-border payments are slow and expensive, with intermediaries taking a cut at every
            step.
          </li>
          <li>Chargebacks and dispute fraud erode already thin margins.</li>
          <li>
            Rewards and loyalty are bolted on after the fact, not built into the money itself.
          </li>
        </ul>

        <Text variant={TextVariant.Body}>
          At the same time, stablecoins have become a kind of digital cash for the internet—
          programmable, always-on, and moving at the speed of software. But for most merchants, that
          liquidity lives far away from their actual checkout.
        </Text>

        <Text variant={TextVariant.Body}>Shopify’s question was simple:</Text>

        <figure>
          <blockquote>
            What if programmable internet money could show up as just another payment option in
            Shopify Payments?
          </blockquote>
        </figure>
      </section>

      <section aria-labelledby="decision">
        <h2 id="decision">The decision: Shopify + Base for stablecoin payments</h2>

        <Text variant={TextVariant.Body}>
          Shopify chose USDC on Base as its first stablecoin payment rail inside Shopify Payments.
        </Text>

        <h3>Why Base</h3>

        <Text variant={TextVariant.Body}>
          <strong>Ethereum security, L2 speed.</strong> Base is an Ethereum Layer 2 with sub-second,
          low-cost settlement—built to feel instant to the buyer.
        </Text>

        <Text variant={TextVariant.Body}>
          <strong>Compliance and trust.</strong> Base is incubated by Coinbase, a public company
          that’s regularly audited, operates within regulatory frameworks, and brings that standard
          to how the network is run.
        </Text>

        <Text variant={TextVariant.Body}>
          <strong>Open ecosystem.</strong> USDC on Base works with an open ecosystem of
          EVM-compatible wallets and apps, letting buyers pay from the wallet experiences they
          already use.
        </Text>

        <Text variant={TextVariant.Body}>
          For Shopify, that meant shipping a modern, onchain payment rail without asking every
          merchant to become a crypto expert—or rebuild their stack.
        </Text>

        <figure>
          <blockquote>
            We wanted programmable money under the hood, not a brand-new flow for merchants to
            learn. Base let us keep the Shopify experience and upgrade the rails.
          </blockquote>
          <figcaption>(Hypothetical quote)</figcaption>
        </figure>
      </section>

      <section aria-labelledby="solution">
        <h2 id="solution">The solution: USDC on Base, native inside Shopify Payments</h2>

        <Text variant={TextVariant.Body}>
          With this integration, merchants can now opt in to accept USDC on Base—no new gateways, no
          custom plug-ins, no separate reconciliation system.
        </Text>

        <Text variant={TextVariant.Body}>
          Under the hood, the Shopify and Base teams partnered to build a checkout experience
          powered by:
        </Text>

        <ul>
          <li>
            <strong>Stablecoin checkout</strong> — a fast, wallet-based experience for buyers paying
            with USDC on Base.
          </li>
          <li>
            <strong>Shopify’s ecommerce engine</strong> — the existing auth, capture, refund, and
            order management flows merchants rely on today.
          </li>
          <li>
            <strong>Commerce Payments Protocol on Base</strong> — open-source smart contracts that
            bring card-like flows (authorize, capture, refunds, escrow, delayed capture) onchain.
          </li>
        </ul>

        <h3>For buyers</h3>
        <ul>
          <li>
            Pay from an EVM-compatible wallet or smart-wallet experience with familiar login methods
            like Face ID or passkeys.
          </li>
          <li>
            See payments confirm in seconds, without ever needing to think about or pay network fees
            directly.
          </li>
        </ul>

        <h3>For merchants</h3>
        <ul>
          <li>
            Orders still flow through Shopify Payments. Fulfillment, refunds, and reporting stay
            exactly where they are today.
          </li>
          <li>
            Payouts default to local currency, or merchants can choose to hold USDC where they want
            onchain treasury exposure.
          </li>
        </ul>
      </section>

      <section aria-labelledby="why-it-matters">
        <h2 id="why-it-matters">Why it matters: better economics, new experiences</h2>

        <Text variant={TextVariant.Body}>
          This isn’t about ripping out card rails. It’s about adding a new rail alongside them—one
          that behaves like digital cash and unlocks new economics.
        </Text>

        <Text variant={TextVariant.Body}>With stablecoin payments on Base:</Text>

        <ul>
          <li>
            <strong>Chargeback risk is dramatically reduced.</strong> Onchain “digital cash” doesn’t
            work like traditional card chargebacks, which can significantly lower fraud and
            dispute-related costs.
          </li>
          <li>
            <strong>Settlement is near-instant and always on.</strong> Funds settle on Base in
            seconds, across borders and time zones, 24/7/365.
          </li>
          <li>
            <strong>There’s room to reward everyone.</strong> Because the rails are cheaper and
            programmable, Shopify and Base can design 1% back incentives for both merchants and
            buyers paying in USDC, turning what used to be pure processing cost into growth capital.
          </li>
        </ul>

        <Text variant={TextVariant.Body}>
          Zooming out, this integration brings stablecoin payments on Base within reach of millions
          of merchants around the globe through a platform they already use, in countries where USDC
          on Base via Shopify Payments is being rolled out.
        </Text>
      </section>

      <section aria-labelledby="pattern">
        <h2 id="pattern">A pattern any platform can copy</h2>

        <Text variant={TextVariant.Body}>
          Shopify didn’t bolt a crypto widget onto the side of checkout. They embedded stablecoins
          into the heart of their payments stack—and kept the merchant experience almost unchanged.
        </Text>

        <Text variant={TextVariant.Body}>
          If you’re a commerce platform, PSP, marketplace, or large merchant network, you can
          replicate this model:
        </Text>

        <ul>
          <li>
            Keep your existing flows. Work with Base to mirror your current auth, capture, and
            refund logic onchain using the Commerce Payments Protocol.
          </li>
          <li>
            Offer “digital cash” at checkout. Give customers a USDC on Base option that settles
            instantly, works globally, and plugs into the EVM wallet ecosystem.
          </li>
          <li>
            Settle how your merchants want. Let them receive local currency by default or hold USDC
            where it makes sense—without exposing them to protocol complexity.
          </li>
          <li>
            Use savings to fuel demand. Reinvest improved payment economics into loyalty, pricing,
            and new experiences that would never be possible on legacy rails alone.
          </li>
        </ul>

        <Text variant={TextVariant.Body}>
          Base is the leading Ethereum L2 for builders, incubated in a regulated environment and
          secured by Ethereum. It’s built for an internet where money moves like software: open,
          programmable, always-on.
        </Text>
      </section>
    </article>
  );
}
