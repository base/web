import { ListContent, ListGrid } from 'apps/web/src/components/Brand/ListGrid';

export function Copy() {
  return <ListGrid content={sectionContent} />;
}

const sectionContent: ListContent = {
  id: 'copy',
  label: 'Copy',
  items: [
    {
      content: (
        <>
          <p>
            The next internet won&apos;t be built by big platforms. It&apos;ll be built by people.
          </p>
          <p>
            Creators, coders, communities. People who want something better. That&apos;s what&apos;s
            appening on Base.
          </p>
          <p>And it&apos;s just getting started.</p>
          <p>We&apos;re bringing the world onchain, and you&apos;re invited.</p>
        </>
      ),
    },
    {
      content: (
        <>
          <p>The internet is broken.</p>
          <p>We&apos;re building a new one.</p>
          <p>
            One where you own what you create, connect with anyone, anywhere, and build what
            actually matters.
          </p>
          <p>A better internet starts here.</p>
        </>
      ),
    },
    {
      content: (
        <>
          <p>Tired of being a guest on someone else&apos;s platform?</p>
          <p>We are too.</p>
          <p>That&apos;s why Base is built for you.</p>
          <p>
            Your content, your data, your feed. Yours to shape, yours to share, yours to scale. No
            gatekeepers telling you what&apos;s possible, and no centralized platforms taking all
            your money.
          </p>
          <p>This time, the internet belongs to you.</p>
          <p>Make it yours.</p>
        </>
      ),
    },
    {
      content: (
        <>
          <p>The internet as it exists today is built to keep you scrolling, not creating.</p>
          <p>To spend your time, not to reward it. It&apos;s time to change that.</p>
          <p>Base gives you the tools to build something real.</p>
          <p>Because your ideas, your posts, your work, all mean something.</p>
          <p>It&apos;s time to build something you believe in.</p>
        </>
      ),
    },
    {
      content: (
        <>
          <p>Post something. Not for likes, but for value.</p>
          <p>Not for an algorithm, but for you.</p>
          <p>On Base, your content doesn&apos;t vanish into a feed.</p>
          <p>It lives. It earns. It&apos;s yours.</p>
          <p>Post. Own. Earn.</p>
        </>
      ),
    },
  ],
};
