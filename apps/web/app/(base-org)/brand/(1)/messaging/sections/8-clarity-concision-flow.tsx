import { ListGrid, ListGridContent } from 'apps/web/src/components/Brand/ListGridMasonry';

export function ClarityConcisionFlow() {
  return <ListGrid content={sectionContent} />;
}

const sectionContent: ListGridContent = {
  id: 'clarity-concision-and-flow',
  label: 'Clarity, Concision, and Flow',
  description: (
    <>
      “The goal is to make your paper as simple and clear, as immediately intelligible to the reader
      as possible. This doesn&apos;t mean that you should ignore subtle and sophisticated
      complexities in your theory - but the challenge is to state those complexities simply and
      clearly. Avoid making your subject seem more complex than necessary (for example, if something
      &quot;creates habits&quot;, it&apos;s probably neither necessary nor helpful to say that it
      &quot;exhibits a habit-formation process&quot;).” ~ R. Wicks
    </>
  ),
  items: [
    {
      title: 'Tips for Improving Clarity',
      items: [
        {
          title: 'Sentence Clarity',
          content: (
            <p className="text-base-gray-200">
              Strategies for improving sentence clarity include using transitional words, properly
              placing subordinate clauses, and choosing action verbs over &apos;be&apos; verbs (e.g.
              is, are).
            </p>
          ),
        },
        {
          title: 'Plain Style',
          content: (
            <p className="text-base-gray-200">
              Because we specialize in reducing complex topics into concise summaries that are
              digestible to the average user, Base encourages contributors to write in plain style.
              For example: opt for simple words like use rather than utilize.
            </p>
          ),
        },
        {
          title: 'Passive and Active Voice',
          content: (
            <span className="text-base-gray-200">
              <p className="mb-1">
                Base prefers active voice. Sometimes{' '}
                <u>passive voice can be rhetorically effective</u>, but in most cases contributors
                should <u>change passive to active voice</u>. For example: &quot;Base is for
                creators, builders, traders, and more.&quot;
              </p>
              <p className="mb-1">
                <span className="text-[#FC401F]">(WRONG)</span> “Experiences that are sticky, that
                make it easy for anyone to get started, and that offer a seamless user experience
                that abstracts onchain complexity as much as possible are what we&apos;re looking
                for.” (passive)
              </p>
              <p>
                <span className="text-[#66C800]">(RIGHT)</span> “We&apos;re looking for experiences
                that make it easy for anyone to get started and offer a seamless user experience
                that abstracts complexity as much as possible.” (active)
              </p>
            </span>
          ),
        },
        {
          title: 'Nuances',
          content: (
            <p className="text-base-gray-200">
              Nuances are short, punchy phrases that are used to grab attention and make a
              statement. For example: &quot;Base is for creators, builders, traders, and more.&quot;
            </p>
          ),
        },
      ],
    },
    {
      title: 'Tips for Improving Concision',
      items: [
        {
          content: (
            <p className="text-base-gray-200">
              Avoid redundancies. When in doubt, opt for two shorter sentences over one longer one.
              The Hemingway App can point out areas for improvement.
            </p>
          ),
        },
        {
          content: (
            <p className="text-base-gray-200">
              Consult the Purdue OWL page on concision for examples of “wordy vs. concise”
              sentences.
            </p>
          ),
        },
        {
          content: (
            <span className="text-base-gray-200">
              <p>
                Avoid phrasing that adds little useful information for the reader, such as ending
                sentences with “…and more.” For example:
              </p>
              <p className="mb-1">
                <span className="text-[#FC401F]">(WRONG)</span> ”Base and leading builders are
                hosting a global hackathon with dedicated tracks like payments, discovery, social,
                gaming, and more.
              </p>
              <p className="mb-1">
                <span className="text-[#66C800]">(RIGHT)</span> ”Base and leading builders are
                hosting a global hackathon dedicated to bringing the world onchain.”
              </p>
            </span>
          ),
        },
      ],
    },
    {
      title: 'Tips for Improving Flow',
      items: [
        {
          content: (
            <p className="text-base-gray-200">
              Avoid <u>sentence fragments</u>.
            </p>
          ),
        },
        {
          content: (
            <p className="text-base-gray-200">
              <u>Vary</u> sentence structure, rhythm, opening words, and length..
            </p>
          ),
        },
      ],
    },
  ],
};
