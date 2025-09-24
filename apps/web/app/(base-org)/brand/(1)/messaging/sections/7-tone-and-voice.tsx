import { ListGrid, ListGridContent } from 'apps/web/src/components/Brand/ListGridMasonry';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

export function ToneAndVoice() {
  return <ListGrid content={sectionContent} />;
}

const renderBulletPoints = (items: string[]) => (
  <>
    {items.map((item) => (
      <span key={item} className="relative mb-4 ml-3 flex items-start md:mb-6 lg:ml-5">
        <span className="absolute -left-1.5 top-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#000000] xl:top-2" />
        <span className="pl-1">{item}</span>
      </span>
    ))}
  </>
);

const TONE_ITEMS = [
  'Progressive and future-thinking',
  'Conversational and human',
  'Direct (e.g., using "offers" over "that aims to offer")',
  'Optimistic but realistic (not overly idealistic)',
  'Appreciative (not prideful)',
  'Witty',
  'Championing of builders',
  'Relatable (using cultural references familiar to the audience)',
];

const VOICE_ITEMS = [
  'Brief and punchy, with clarity and impact',
  'Avoids overly technical jargon or corporate talk',
  'Acknowledges challenges directly but remains solutions-oriented',
  'Not too casual, but still conversational',
  'Provides unique, thought-provoking insights',
  'Engages in trending topics wisely (and rarely)',
  'Offers compelling reasons to return through memorable and engaging content',
  'Minimal use of emojis (one at most)',
];

const sectionContent: ListGridContent = {
  id: 'tone-and-voice',
  label: 'Tone and voice',
  description: (
    <>
      &quot;Although tone and voice are often used together, they are not at all the same thing.
      Voice is the overall personality of your brand and can be described in adjectives like
      helpful, witty, or friendly. […] your brand&apos;s voice will not change. However, tone, or
      tone of voice, is the attitude of your writing for a particular content piece.&quot; - Shelby
      Crawford
    </>
  ),
  items: [
    {
      title: 'Tone',
      items: [
        {
          content: renderBulletPoints(TONE_ITEMS),
        },
      ],
    },
    {
      title: 'Voice',
      items: [
        {
          content: renderBulletPoints(VOICE_ITEMS),
        },
      ],
    },
  ],
  appendix: (
    <>
      <Title level={TitleLevel.H6Regular} className="flex flex-col !text-pretty pb-4 lg:pb-6">
        <span className="text-base-gray-200">
          Here&apos;s an example of writing that feels appropriate in both tone and voice:
        </span>
      </Title>
      <div className="border-l-2 border-base-gray-200">
        <Text className="flex flex-col pl-4">
          <span>
            The old internet was for the few. The new one is for everyone. Welcome to an onchain
            internet that&apos;s open, global, and built by people who actually care.
          </span>
          <span>
            Millions of builders are already creating what they love. Tools, apps, communities,
            movements.
          </span>
          <span>Base is for everyone.</span>
        </Text>
      </div>
      <div className="grid pt-8 md:grid-cols-2 md:gap-8 md:pt-12">
        <div className="flex flex-col gap-2 border-t border-[#D9D9E3] py-4 md:pb-0">
          <Text className="underline">Tone in Writting: A Simple Guide</Text>
          <Text className="!text-base-gray-200">
            ”…voice is what you say, and tone is how you say it.”
          </Text>
        </div>
        <div className="flex flex-col gap-2 border-t border-[#D9D9E3] py-4 md:pb-0">
          <Text className="underline">A Word About Style, Voice, and Tone</Text>
          <Text className="!text-base-gray-200">
            “When you hear an author talking inside your head, “voice” is what that author sounds
            like. […] You can develop your own voice in your writing by paying special attention to
            rhythm, diction, and punctuation.”
          </Text>
        </div>
        <div className="flex flex-col gap-2 border-t border-[#D9D9E3] py-4 md:pb-0">
          <Text className="underline">Point of View</Text>
          <Text className="!text-base-gray-200">
            First, second, or third person? Omniscient, limited, or objective? Check for
            consistency.
          </Text>
        </div>
      </div>
    </>
  ),
};
