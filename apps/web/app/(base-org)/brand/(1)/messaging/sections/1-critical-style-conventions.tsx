import { List, ListContent } from 'apps/web/src/components/Brand/List';

export function CriticalStyleConventions() {
  return <List content={sectionContent} />;
}

const sectionContent: ListContent = {
  id: 'critical-style-conventions',
  label: 'Critical Style Conventions',
  items: [
    {
      content: 'Whenever possible, just say "Base"',
    },
    {
      content: (
        <>
          Use the word <span className="font-medium">onchain</span> instead of &quot;on-chain&quot;
          or &quot;on chain&quot; or &quot;On Chain&quot;.
        </>
      ),
    },
    {
      content:
        'Skip "web3" and use "crypto" sparingly. Avoid technical terms, and when you need to use them, explain in full.',
    },
    {
      content: (
        <>
          Active voice → passive voice.{' '}
          <span className="font-medium">&quot;Send money in seconds&quot;</span> not &quot;Money can
          be sent.&quot;
        </>
      ),
    },
    {
      content: 'Write visually. White space, bullets, bold hooks.',
    },
    {
      content: 'Focus on one idea. Speed matters. Make it count.',
    },
  ],
  hierarchy: 'md',
};
