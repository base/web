import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import Modal from 'apps/web/src/components/Modal';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import baseGuildCard from './images/baseGuildCard.png';
import baseLearnCard from './images/baseLearnCard.png';
import grantsCard from './images/grantsCard.png';
import onChainSummerRegistryCard from './images/onChainSummerRegistryCard.png';
import roundsWftIllustrationfrom from './images/roundsWftIllustration.svg';
import verificationCard from './images/verificationCard.png';

export type UsernameProfileSectionExploreLink = {
  title: string;
  image: StaticImageData;
  backgroundClassName: string;
  href?: string;
  modal?: (utmsWithUsername: string) => React.ReactNode;
};

const utms = `?utm_source=baseprofile&utm_medium=badge&utm_campaign=registry`;

const USERNAME_PROFILE_SECTION_EXPLORE_LINKS: UsernameProfileSectionExploreLink[] = [
  {
    title: 'Add project to Onchain Registry',
    image: onChainSummerRegistryCard,
    href: 'https://buildonbase.deform.cc/registry',
    backgroundClassName: 'bg-blue-500',
  },
  {
    title: 'Get roles on Base Guild',
    image: baseGuildCard,
    href: 'https://guild.xyz/base',
    backgroundClassName: 'bg-blue-500',
  },
  {
    title: 'Get a Rounds Grant',
    image: grantsCard,
    backgroundClassName: 'bg-[#F7D43B]',
    modal: (utmsWithUsername) => (
      <>
        <ImageWithLoading
          src={roundsWftIllustrationfrom as StaticImageData}
          alt="rounds.wtf logo"
          title="rounds.wtf logo"
          wrapperClassName="rounded-3xl"
          width="160"
          height="160"
          backgroundClassName="bg-transparent"
          imageClassName="group-hover:rotate-[-1deg] group-hover:scale-105"
        />
        <p className="mt-6 text-lg">
          Post to{' '}
          <Link
            href={`https://rounds.wtf/base-builds${utmsWithUsername}`}
            className="text-blue-500"
            target="_blank"
          >
            rounds.wtf/base-builds
          </Link>{' '}
          between every Friday and Monday to be eligible for weekly rewards from Rounds.
        </p>
        <p className="text-lg">
          Rewards are based on votes from eligible curators. Posts must have at least one vote to be
          eligible.
        </p>
        <Link
          href={`https://rounds.wtf/base-builds${utmsWithUsername}`}
          target="_blank"
          className="mt-6 w-full"
        >
          <Button variant={ButtonVariants.Black} rounded fullWidth>
            Get a Rounds grant
          </Button>
        </Link>
      </>
    ),
  },
  {
    title: 'Get a Verification',
    image: verificationCard,
    href: 'https://www.coinbase.com/onchain-verify',
    backgroundClassName: 'bg-black',
  },

  {
    title: 'Go to Base Learn',
    image: baseLearnCard,
    href: 'https://docs.base.org/base-learn/progress',
    backgroundClassName: 'bg-blue-500',
  },
];

function ExploreLink(
  usernameProfileSectionExploreLink: UsernameProfileSectionExploreLink,
  utmsWithUsername: string,
  onCardClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    usernameProfileSectionExploreLink: UsernameProfileSectionExploreLink,
  ) => void,
) {
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      onCardClick(event, usernameProfileSectionExploreLink);
    },
    [onCardClick, usernameProfileSectionExploreLink],
  );
  return (
    <li key={usernameProfileSectionExploreLink.title} className="inline-block w-full">
      <Link
        href={`${usernameProfileSectionExploreLink.href}${utmsWithUsername}`}
        target="_blank"
        className="group flex w-full flex-col gap-2 hover:text-blue-600"
        onClick={onClick}
      >
        <ImageWithLoading
          src={usernameProfileSectionExploreLink.image}
          alt={usernameProfileSectionExploreLink.title}
          title={usernameProfileSectionExploreLink.title}
          wrapperClassName="rounded-3xl"
          backgroundClassName={usernameProfileSectionExploreLink.backgroundClassName}
          imageClassName="group-hover:rotate-[-1deg] group-hover:scale-105"
        />
        <h4 className="mt-2 flex items-center gap-2 transition-all group-hover:gap-4">
          {usernameProfileSectionExploreLink.title}
          <Icon name="arrowRight" color="currentColor" height="1rem" width="1rem" />
        </h4>
      </Link>
    </li>
  );
}

export default function UsernameProfileSectionExplore() {
  const { profileUsername } = useUsernameProfile();
  const utmsWithUsername = `${utms}&utm_term=${profileUsername}`;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Rounds link --> link to a modal with instructions on how to apply, then a "Get a Rounds grant" button that links to /base-builds on Rounds. Copy should read:

  const onCardClick = useCallback(
    (
      event: React.MouseEvent<HTMLAnchorElement>,
      usernameProfileSectionExploreLink: UsernameProfileSectionExploreLink,
    ) => {
      if (usernameProfileSectionExploreLink.modal) {
        event.preventDefault();
        setModalContent(usernameProfileSectionExploreLink.modal(utmsWithUsername));
        setIsOpen(true);
      }
    },
    [utmsWithUsername],
  );

  return (
    <section>
      <UsernameProfileSectionTitle title="Explore ways to build your profile" />
      <ul className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        {USERNAME_PROFILE_SECTION_EXPLORE_LINKS.map((usernameProfileSectionExploreLink) =>
          ExploreLink(usernameProfileSectionExploreLink, utmsWithUsername, onCardClick),
        )}
      </ul>
      <Modal isOpen={isOpen} onClose={closeModal} title="" titleAlign="left">
        {modalContent}
      </Modal>
    </section>
  );
}
