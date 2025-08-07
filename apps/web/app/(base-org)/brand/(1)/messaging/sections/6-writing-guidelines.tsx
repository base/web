import { ListContent, ListGrid } from 'apps/web/src/components/Brand/ListGrid';

export function WritingGuidelines() {
  return <ListGrid content={sectionContent} />;
}

const sectionContent: ListContent = {
  id: 'writing-guidelines',
  label: 'Writing Guidelines',
  items: [
    {
      title: <>Emphasize Base&apos;s vision and mission</>,
      content: (
        <span className="text-base-gray-200">
          <p>
            Base has a grand vision to bring a billion people onchain and a mission to build a
            global onchain economy that increases innovation, creativity, and freedom.
          </p>
          <p>
            Highlight how Base aims to make this decentralized future more accessible for everyone,
            everywhere.
          </p>
        </span>
      ),
    },
    {
      title: <>Highlight progress and what&apos;s next</>,
      content: (
        <span className="text-base-gray-200">
          <p>
            When discussing Base&apos;s ongoing developments, celebrate recent milestones and
            accomplishments. Outline the priorities and initiatives planned for the current or
            upcoming period, grounding them in Base&apos;s overarching vision and mission. Invite
            collaboration from the community, fostering an environment where external perspectives
            can contribute ideas and feedback.
          </p>
        </span>
      ),
    },
    {
      title: 'Focus on concrete examples over abstract concepts',
      content: (
        <span className="text-base-gray-200">
          <p>
            Avoid excessive abstract language about &quot;web3&quot; or technical language around
            &quot;blockchains&quot;, etc.
          </p>
          <p>
            Ground writing in concrete examples of what Base enables: Affordable transactions,
            seamless user onboarding, simple developer tooling, etc.
          </p>
        </span>
      ),
    },
    {
      title: 'Use clear examples to illustrate concepts',
      content: (
        <span className="text-base-gray-200">
          <p>
            While some technical depth is unavoidable, aim to make abstract onchain concepts
            accessible through clear examples and analogies. Compare new paradigms to familiar ones
            to build understanding. Use specifics and walk through sample user flows to demonstrate
            core value propositions.
          </p>
        </span>
      ),
    },
    {
      title: 'Whenever possible, celebrate builders',
      content: (
        <span className="text-base-gray-200">
          <p>
            Base exists to empower those building a decentralized future, and building can be
            defined with a wide net: Creators, artists, developers, writers, etc. Frequently
            highlight and celebrate the projects, people, and communities utilizing Base.
          </p>
        </span>
      ),
    },
    {
      title: 'Be a bridge',
      content: (
        <span className="text-base-gray-200">
          <p>
            Assume your audience includes crypto newcomers. Use analogies and examples to make clear
            connections between the tools and platforms people know and the future Base is building.
          </p>
        </span>
      ),
    },
  ],
};
