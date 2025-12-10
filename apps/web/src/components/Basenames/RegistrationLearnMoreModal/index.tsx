import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import { Discount } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import Link from 'next/link';
import baseBuildathonParticipant from './images/base-buildathon-participant.svg';
import summerPassLvl3 from './images/summer-pass-lvl-3.svg';
import cbidVerification from './images/cbid-verification.svg';
import BNSOwnership from './images/bns.jpg';
import BaseNFT from './images/base-nft.svg';
import DevconPNG from './images/devcon.png';
import coinbaseOneVerification from './images/coinbase-one-verification.svg';
import coinbaseVerification from './images/coinbase-verification.svg';
import BaseWorldNFT from './images/base-around-the-world-nft.svg';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';

function InfoIcon() {
  return <InformationCircleIcon width={12} height={12} className="fill-gray-40" />;
}

type DiscountItem = {
  discount: Discount;
  icon: StaticImageData;
  alt: string;
  label: string;
  tooltipContent: string;
};

const DISCOUNT_ITEMS: DiscountItem[] = [
  {
    discount: Discount.COINBASE_VERIFIED_ACCOUNT,
    icon: coinbaseVerification as StaticImageData,
    alt: 'icon of coinbase',
    label: 'Coinbase verification',
    tooltipContent: 'Verifies you have a valid trading account on Coinbase',
  },
  {
    discount: Discount.CB1,
    icon: coinbaseOneVerification as StaticImageData,
    alt: 'icon of coinbase one',
    label: 'Coinbase One verification',
    tooltipContent: 'Verifies you have an active Coinbase One subscription',
  },
  {
    discount: Discount.CBID,
    icon: cbidVerification as StaticImageData,
    alt: 'icon of CBID',
    label: 'A cb.id username',
    tooltipContent: 'cb.id must have been claimed prior to August 9, 2024.',
  },
  {
    discount: Discount.BASE_BUILDATHON_PARTICIPANT,
    icon: baseBuildathonParticipant as StaticImageData,
    alt: 'icon of base buildathon',
    label: 'Base buildathon participant',
    tooltipContent: 'Available for anyone holding a Base Buildathon participant NFT.',
  },
  {
    discount: Discount.SUMMER_PASS_LVL_3,
    icon: summerPassLvl3 as StaticImageData,
    alt: 'icon of summer pass',
    label: 'Summer Pass Level 3',
    tooltipContent:
      'Available for anyone holding a Summer Pass Level 3 NFT. Go to wallet.coinbase.com/ocs to get your Summer Pass',
  },
  {
    discount: Discount.BNS_NAME,
    icon: BNSOwnership,
    alt: 'icon of BNS',
    label: 'BNS username',
    tooltipContent: 'BNS (.base) username holders are eligible for a 0.01 ETH discount',
  },
  {
    discount: Discount.BASE_DOT_ETH_NFT,
    icon: BaseNFT as StaticImageData,
    alt: 'icon of Base',
    label: 'Base.eth NFT',
    tooltipContent: 'Available for anyone holding a base.eth NFT',
  },
  {
    discount: Discount.BASE_WORLD,
    icon: BaseWorldNFT as StaticImageData,
    alt: 'icon of Base World',
    label: 'Base around the world NFT',
    tooltipContent: 'Available for anyone holding one of the Base around the world NFTs',
  },
  {
    discount: Discount.DEVCON,
    icon: DevconPNG,
    alt: 'icon of Devcon',
    label: 'Devcon attendance NFT',
    tooltipContent: 'Available for anyone holding one of the Base Devcon NFTs',
  },
];

export default function RegistrationLearnMoreModal({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean;
  toggleModal: () => void;
}) {
  const { allActiveDiscounts } = useRegistration();

  const hasDiscount = allActiveDiscounts.size > 0;
  const rowClasses = 'flex flex-row items-center justify-start';

  const qualifiedClasses = classNames(
    'flex flex-row items-center justify-center py-3 px-1 h-5 text-xs bg-green-0 rounded ml-3',
  );
  return (
    <Modal isOpen={isOpen} onClose={toggleModal} title="">
      <div className="flex max-w-prose flex-1 flex-col place-content-center place-items-center gap-3">
        <span className="w-full text-2xl font-bold">
          {hasDiscount ? "You're getting a discounted name" : 'Register for free'}
        </span>
        <p className="mb-3 text-illoblack">
          {hasDiscount
            ? "You're receiving your name for free (5+ characters for 1 year) because your wallet has one of the following:"
            : "You'll receive a name for free (5+ characters for 1 year) if your wallet has any of the following:"}
        </p>
        <ul className="mb-3 flex flex-col gap-3 self-start">
          {DISCOUNT_ITEMS.map(({ discount, icon, alt, label, tooltipContent }) => (
            <li key={discount} className="flex items-center gap-3">
              <Tooltip content={tooltipContent}>
                <div className="flex flex-row items-center justify-start gap-2">
                  <ImageWithLoading
                    src={icon}
                    alt={alt}
                    width={30}
                    height={30}
                    wrapperClassName="rounded-full"
                    imageClassName={classNames(rowClasses, {
                      'opacity-40': hasDiscount && !allActiveDiscounts.has(discount),
                    })}
                  />
                  <p
                    className={classNames(rowClasses, {
                      'opacity-40': hasDiscount && !allActiveDiscounts.has(discount),
                    })}
                  >
                    {label}
                  </p>
                  <InfoIcon />
                </div>
              </Tooltip>
              {allActiveDiscounts.has(discount) && (
                <div className={qualifiedClasses}>
                  <p className="text-green-60">Qualified</p>
                </div>
              )}
            </li>
          ))}
        </ul>
        {!hasDiscount && (
          <>
            <p className="mb-3 w-full text-illoblack">
              Your registration will be gasless with{' '}
              <Link
                href="http://wallet.coinbase.com/smart-wallet"
                className="underline"
                target="_blank"
              >
                a smart wallet
              </Link>
              .
            </p>
            <div className="text-md w-full rounded-xl border border-[#CED2DB] bg-palette-backgroundAlternate p-4 font-medium text-illoblack">
              Don&apos;t have any of these?{' '}
              <Link
                href="https://www.coinbase.com/onchain-verify"
                className="underline"
                target="_blank"
              >
                Get a verification
              </Link>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
