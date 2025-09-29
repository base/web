import { List, ListContent } from 'apps/web/src/components/Brand/List';

export function Taglines() {
  return <List content={sectionContent} />;
}

const sectionContent: ListContent = {
  id: 'taglines',
  label: 'Taglines',
  items: [
    {
      content: (
        <>
          Base is for [<span className="inline-block w-[140px]" />
          ].
        </>
      ),
    },
    {
      content: 'Bringing the world onchain.',
    },
    {
      content: 'Build something you believe in.',
    },
    {
      content: 'A better internet starts here.',
    },
    {
      content: 'Post. Own. Earn.',
    },
  ],
  hierarchy: 'lg',
};
