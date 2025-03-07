import { CoinbaseVerifications } from '../hooks/useCoinbaseVerifications';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import { GuildBadges } from '../hooks/useBaseGuild';

// image imports
import verifiedIdentity from './images/verifiedIdentity.webp';
import verifiedCountry from './images/verifiedCountry.webp';
import verifiedCoinbaseOne from './images/verifiedCoinbaseOne.webp';
import baseBuilder from './images/baseBuilder.webp';
import baseGrantee from './images/baseGrantee.webp';
import baseInitiate from './images/baseInitiate.webp';
import baseLearnNewcomer from './images/baseLearnNewcomer.webp';
import buildathonParticipant from './images/buildathonParticipant.webp';
import buildathonWinner from './images/buildathonWinner.webp';
import talentScore from './images/talentScore.webp';

// gray image imports
import verifiedIdentityGray from './images/verifiedIdentityGray.webp';
import verifiedCountryGray from './images/verifiedCountryGray.webp';
import verifiedCoinbaseOneGray from './images/verifiedCoinbaseOneGray.webp';
import baseBuilderGray from './images/baseBuilderGray.webp';
import baseGranteeGray from './images/baseGranteeGray.webp';
import baseInitiateGray from './images/baseInitiateGray.webp';
import baseLearnNewcomerGray from './images/baseLearnNewcomerGray.webp';
import buildathonParticipantGray from './images/buildathonParticipantGray.webp';
import buildathonWinnerGray from './images/buildathonWinnerGray.webp';
import talentScoreGray from './images/talentScoreGray.webp';
import { useBadgeContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/BadgeContext';
import Modal from 'apps/web/src/components/Modal';
import { useCallback } from 'react';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Link from 'next/link';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';

export type BadgeNames = CoinbaseVerifications | GuildBadges | 'TALENT_SCORE';

export const BADGE_INFO: Record<
  BadgeNames,
  {
    name: string;
    title: string;
    description: string;
    cta: string;
    ctaLink: string;
    image: StaticImageData;
    grayImage: StaticImageData;
  }
> = {
  VERIFIED_IDENTITY: {
    name: 'Coinbase Verified ID',
    title: 'Coinbase Verified ID',
    description: "You've got a Coinbase account and you verified your ID. Thanks for being legit!",
    cta: 'Get verified',
    ctaLink: 'https://coinbase.com/onchain-verify',
    image: verifiedIdentity,
    grayImage: verifiedIdentityGray,
  },
  VERIFIED_COUNTRY: {
    name: 'Verified Country',
    title: 'Verified Country',
    description: "You've verified what country you live in. It's a beautiful country, no doubt.",
    cta: 'Get verified',
    ctaLink: 'https://coinbase.com/onchain-verify',
    image: verifiedCountry,
    grayImage: verifiedCountryGray,
  },
  VERIFIED_COINBASE_ONE: {
    name: 'Coinbase One',
    title: 'Coinbase One',
    description: "You've got an active Coinbase One membership. Hope you enjoy the perks!",
    cta: 'Get Coinbase One',
    ctaLink: 'https://coinbase.com/onchain-verify',
    image: verifiedCoinbaseOne,
    grayImage: verifiedCoinbaseOneGray,
  },
  BASE_BUILDER: {
    name: 'Based Builder',
    title: 'Base Builder',
    description: "You've deployed 5 or more smart contracts on Base. Impressive!",
    cta: 'Deploy a smart contract',
    ctaLink: 'https://guild.xyz/base/based-developers',
    image: baseBuilder,
    grayImage: baseBuilderGray,
  },
  BASE_GRANTEE: {
    name: 'Base Grant',
    title: 'Base Grant',
    description: 'You were the recipient of a Base Grant. Congrats!',
    cta: 'Learn more',
    ctaLink: 'https://paragraph.xyz/@grants.base.eth/calling-based-builders',
    image: baseGrantee,
    grayImage: baseGranteeGray,
  },
  BASE_INITIATE: {
    name: 'Based Initiate',
    title: 'Base Initiate',
    description: "You've deployed a smart contract on Base. Thanks for building with us!",
    cta: 'Deploy a smart contract',
    ctaLink: 'https://guild.xyz/base/based-developers',
    image: baseInitiate,
    grayImage: baseInitiateGray,
  },
  BASE_LEARN_NEWCOMER: {
    name: 'Base Learn Newcomer',
    title: 'Base Learn Newcomer',
    description:
      'You completed these Base Learn Modules: Basic Contracts, Storage, Control Structures, Arrays, Inheritance, Mappings, Structs, Error Flags, New Keyword, and Imports.',
    cta: 'Go to Base Learn',
    ctaLink: 'https://guild.xyz/base/base-learn',
    image: baseLearnNewcomer,
    grayImage: baseLearnNewcomerGray,
  },
  BUILDATHON_PARTICIPANT: {
    name: 'Buildathon Participant',
    title: 'Buildathon Participant',
    description:
      'You were a participant in our 2024 Onchain Summer Buildathon. Thanks for building with us!',
    cta: 'Learn more',
    ctaLink: 'https://www.base.org/onchainsummer',
    image: buildathonParticipant,
    grayImage: buildathonParticipantGray,
  },
  BUILDATHON_WINNER: {
    name: 'Buildathon Winner',
    title: 'Buildathon Winner',
    description: 'You submitted a winning project in the Onchain Summer 2024 Buildathon. Congrats!',
    cta: 'Learn more',
    ctaLink: 'https://www.base.org/onchainsummer',
    image: buildathonWinner,
    grayImage: buildathonWinnerGray,
  },
  TALENT_SCORE: {
    name: 'Builder Score',
    title: 'Builder Score',
    description:
      "Builder Score is the sum of all credentials in your Talent Passport. You're legit!",
    cta: 'Increase your Builder Score',
    ctaLink: 'https://passport.talentprotocol.com/',
    image: talentScore,
    grayImage: talentScoreGray,
  },
};

type BadgeImageProps = {
  badge: BadgeNames;
  claimed?: boolean;
  score?: number;
  size: number;
  name: string;
};

export function BadgeImage({ badge, claimed, score, size, name }: BadgeImageProps) {
  const showTalentScore = Boolean(claimed && score && badge === 'TALENT_SCORE');

  return (
    <div className="group relative flex items-center justify-center p-6">
      <ImageWithLoading
        src={BADGE_INFO[badge][claimed ? 'image' : 'grayImage']}
        alt={name}
        height={size}
        wrapperClassName="rounded-full"
        width={size}
        imageClassName="group-hover:rotate-[-1deg] group-hover:scale-105"
      />
      {showTalentScore && (
        <span className="absolute font-sans text-3xl font-bold text-white">{score}</span>
      )}
    </div>
  );
}

export function Badge({
  badge,
  claimed,
  score,
  size = 120,
}: {
  badge: BadgeNames;
  claimed?: boolean;
  score?: number;
  size?: number;
}) {
  const { selectBadge } = useBadgeContext();
  const onClick = useCallback(() => {
    selectBadge({ badge, claimed: !!claimed, score });
  }, [selectBadge, badge, claimed, score]);

  const name = BADGE_INFO[badge].name;

  return (
    <div className="flex flex-col gap-4">
      <div
        onClick={onClick}
        onKeyDown={onClick}
        aria-label={`See details for ${name}`}
        role="button"
        tabIndex={0}
        className="rounded-[24px] border border-gray-10"
      >
        <BadgeImage badge={badge} claimed={claimed} score={score} size={size} name={name} />
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

export function BadgeModal() {
  const { modalOpen, closeModal, selectedClaim } = useBadgeContext();

  if (!modalOpen || !selectedClaim) return null;

  const badge = selectedClaim.badge;
  const name = BADGE_INFO[badge]?.name;

  return (
    <Modal isOpen={modalOpen} onClose={closeModal} title="">
      <div className="flex max-w-[380px] flex-col items-center">
        <BadgeImage badge={badge} claimed size={120} name={name} score={selectedClaim.score} />
        <span className="mb-4 text-2xl font-medium">{name}</span>
        <p className="mb-10 text-center">{BADGE_INFO[badge].description}</p>
        <span className="text-l mb-8 font-bold uppercase">
          status: {selectedClaim.claimed ? 'claimed' : 'unclaimed'}
        </span>
        <Link href={BADGE_INFO[badge].ctaLink} target="_blank" className="w-full">
          <Button variant={ButtonVariants.Black} rounded fullWidth>
            {BADGE_INFO[badge].cta}
          </Button>
        </Link>
      </div>
    </Modal>
  );
}
