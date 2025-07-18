import { ListGrid, ListGridContent } from 'apps/web/src/components/Brand/ListGridMasonry';

export function Naunces() {
  return <ListGrid content={sectionContent} />;
}

const sectionContent: ListGridContent = {
  id: 'nuances',
  label: 'Nuances',
  items: [
    {
      title: 'Capitalization',
      items: [
        {
          content: (
            <span className="text-base-gray-200">
              In general, follow the <u>Purdue OWL</u> guidelines for capitalization.
            </span>
          ),
        },
        {
          content: (
            <span className="text-base-gray-200">
              <p className="mb-2">For headlines, use title case, not sentence case.</p>
              <p>
                Example: <u>Onchain Summer II is Coming</u>
              </p>
            </span>
          ),
        },
      ],
    },
    {
      title: 'Punctuation',
      items: [
        {
          content: (
            <span className="text-base-gray-200">
              <p className="mb-1">
                <u className="text-[#000000]">Oxford Comma</u> - Base uses the Oxford comma. For
                example:
              </p>
              <p className="mb-1">
                <span className="text-[#FC401F]">(WRONG)</span> apples, oranges and bananas (no
                Oxford comma)
              </p>
              <p className="mb-1">
                <span className="text-[#66C800]">(RIGHT)</span> apples, oranges<strong>,</strong>{' '}
                and bananas (Oxford comma)
              </p>
            </span>
          ),
        },
        {
          content: (
            <span className="text-base-gray-200">
              <p className="mb-2">
                <span className="text-[#000000]">Em Dashes</span> - Write em dashes as ( — ). Add
                spaces on both sides. For example:
              </p>
              <p className="mb-2">
                Em dash: &quot;Facilitators accept responsibility to move groups through an agenda,
                ensure adherence to mutually agreed-upon process mechanics, and — if necessary —
                suggest alternates or additional discussion.&quot;
              </p>
              <p>
                Consult <u>Merriam-Webster</u> for general guidance on em dashes.
              </p>
            </span>
          ),
        },
        {
          content: (
            <p className="text-base-gray-200">
              <span className="text-[#000000]">Parentheticals</span> -{' '}
              <u>Where to place that period?</u>
              As per <u>Typos of the NYT</u>: &quot;When a sentence ends with a parenthetical, the
              sentence&apos;s period goes outside the parentheses (unless the entire sentence is
              parenthetical).&quot;
            </p>
          ),
        },
        {
          content: (
            <p className="text-base-gray-200">
              <span className="text-[#000000]">Colons and Semicolons</span> - For lists included as
              part of the text, use semicolons as separators when at least one of the list items
              contains a comma. Otherwise, use commas.
            </p>
          ),
        },
      ],
    },
    {
      title: 'Tips for Improving Clarity',
      items: [
        {
          content: (
            <p className="text-base-gray-200">
              <span className="text-[#000000]">Basics</span> - Consult the Purdue OWL for basic
              guidelines.
            </p>
          ),
        },
        {
          content: (
            <span className="text-base-gray-200">
              <p className="mb-2">
                <span className="text-[#000000]">Numerals</span> - Write out numerals 0 through 9 as
                words: zero, one, two, three, etc.
              </p>
              <p className="mb-2">Exception: Write 1-for-1, not one-for-one.</p>
              <p className="mb-2">
                Write numerals 10 and above as Arabic numerals: 10, 59, 100, 9888, etc.
              </p>
              <p>
                Abbreviate 10,000 and above with a K instead of using a comma. For example: write
                100,000 as 100K. Abbreviate 1,000,000 and above with an M. Abbreviate 1,000,000,000
                and above with a B.
              </p>
            </span>
          ),
        },
        {
          content: (
            <p className="text-base-gray-200">
              <span className="text-[#000000]">Dates</span> - Write dates (e.g., in blog post titles
              and images) as &quot;September <span className="font-medium">2</span>, 2022&quot; (or
              in shortened form as &quot;Sep. 2, 2022&quot;) rather than &quot;September{' '}
              <span className="font-medium">2nd</span>, 2022.&quot;
            </p>
          ),
        },
        {
          content: (
            <p className="text-base-gray-200">
              <span className="text-[#000000]">Time Spans</span> - Write full-year ranges of time as
              &quot;2009—2022&quot; with an em-dash and no spaces.
            </p>
          ),
        },
        {
          content: (
            <p className="text-base-gray-200">
              <span className="text-[#000000]">Decades</span> - Write out the first reference to a
              decade as &quot;1960s&quot; and abbreviate subsequent instances as &quot;60s&quot; (no
              apostrophe).
            </p>
          ),
        },
        {
          content: (
            <p className="text-base-gray-200">
              <span className="text-[#000000]">Clock Times</span> - When referring to the time,
              always reference both the period of day and time zone, with the period lowercase and
              the time zone uppercase. Do not use a space between the numeral and period of day, and
              then use a space for the time zone: &quot;7am ET&quot;, &quot;1:30am PT&quot; etc.
              When not referencing a specific location, default to PT.
            </p>
          ),
        },
        {
          content: (
            <p className="text-base-gray-200">
              <span className="text-[#000000]">Software Versioning Prefixes</span> - Base uses
              lowercase version number prefixes for software (v1, v1.5, v2.6.4, etc.) rather than
              uppercase (V1, V1.5, V2.6.4, etc.) While there is no fixed standard, most software
              versioning at a low level uses Semantic Versioning Specification, aka <u>semver</u>.
            </p>
          ),
        },
      ],
    },
  ],
};
