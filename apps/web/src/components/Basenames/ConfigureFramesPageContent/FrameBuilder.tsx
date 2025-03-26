/* eslint-disable react-perf/jsx-no-new-function-as-prop */
'use client';
import { PlusIcon } from '@heroicons/react/24/solid';
import * as Accordion from '@radix-ui/react-accordion';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import Frame from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Frame';
import { SuggestionCard } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/SuggestionCard';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Input from 'apps/web/src/components/Input';
import { isValidUrl } from 'apps/web/src/utils/urls';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDebounceValue, useMediaQuery } from 'usehooks-ts';
import buyFromMe from './ui/buy-from-me.svg';
import payMe from './ui/currencies.svg';
import email from './ui/email.svg';
import mintMe from './ui/mint-me.svg';
import nftProduct from './ui/nftProduct.svg';
import previewBackground from './ui/preview-background.svg';
import emptyPreviewFrame from './ui/preview-frame.svg';

export default function FrameBuilder() {
  const params = useParams();
  const router = useRouter();
  const basename = params?.username ?? '';
  const [newFrameUrl, setNewFrameUrl] = useState('');
  const [debouncedNewFrameUrl] = useDebounceValue(newFrameUrl, 250);

  const [step, setStep] = useState<'select' | 'preview'>('select');
  const handleNextStep = useCallback(() => {
    setStep('preview');
    scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const handlePrevStep = useCallback(() => {
    setStep('select');
    scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const emptyFrameUrl = !debouncedNewFrameUrl;
  const isValidFrameUrl = isValidUrl(debouncedNewFrameUrl);
  const { logEventWithContext } = useAnalytics();

  const [customFrameURL, setCustomFrameURL] = useState('');
  const handleCustomFrameUrlChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCustomFrameURL(e.target.value);
      if (isValidUrl(e.target.value)) {
        logEventWithContext('basename_profile_frame_preview', ActionType.click, {
          context: e.target.value,
        });
        setNewFrameUrl(e.target.value);
      }
    },
    [logEventWithContext],
  );
  const [sliceSOFrameURL, setSliceSOFrameURL] = useState('');
  const handleSliceSOFrameURLChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSliceSOFrameURL(e.target.value);
      if (isValidUrl(e.target.value)) {
        logEventWithContext('basename_profile_frame_preview', ActionType.click, {
          context: 'slice.so',
        });
        setNewFrameUrl(e.target.value);
      }
    },
    [logEventWithContext],
  );
  const [hypersubXYZFrameURL, setHypersubXYZFrameURL] = useState('');
  const handleHypersubXYZFrameURLChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setHypersubXYZFrameURL(e.target.value);
      if (isValidUrl(e.target.value)) {
        logEventWithContext('basename_profile_frame_preview', ActionType.click, {
          context: 'hypersub.xyz',
        });
        setNewFrameUrl(e.target.value);
      }
    },
    [logEventWithContext],
  );
  const [highlightXYZFrameURL, setHighlightXYZFrameURL] = useState('');
  const handleHighlightXYZFrameURLChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setHighlightXYZFrameURL(e.target.value);
      if (isValidUrl(e.target.value)) {
        logEventWithContext('basename_profile_frame_preview', ActionType.click, {
          context: 'highlight.xyz',
        });
        setNewFrameUrl(e.target.value);
      }
    },
    [logEventWithContext],
  );
  const [eventsXYZFrameURL, setEventsXYZFrameURL] = useState('');
  const handleEventsXYZFrameURLChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEventsXYZFrameURL(e.target.value);
      if (isValidUrl(e.target.value)) {
        logEventWithContext('basename_profile_frame_preview', ActionType.click, {
          context: 'events.xyz',
        });
        setNewFrameUrl(e.target.value);
      }
    },
    [logEventWithContext],
  );

  const { pendingFrameChange, addFrame } = useFrameContext();

  const handlePaycasterClick = useCallback(() => {
    if (basename) {
      logEventWithContext('basename_profile_frame_preview', ActionType.click, {
        context: 'paycaster.co',
      });
      setNewFrameUrl(`https://app.paycaster.co/api/frames/users/${basename}`);
      handleNextStep();
    } else {
      setNewFrameUrl('');
    }
  }, [basename, handleNextStep, logEventWithContext]);

  const handleAddFrameClick = useCallback(() => {
    if (!newFrameUrl) return;
    addFrame(newFrameUrl)
      .then(() => router.push(`/name/${basename}`))
      .catch(console.warn);
  }, [newFrameUrl, addFrame, router, basename]);

  // corresponds to tailwind's md: rule
  // this might be breaking ssr hydration
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 769px)');

  if (!isDesktop && !isMobile) return null;

  const suggestionCards = (
    <>
      <SuggestionCard
        handleTriggerClick={() =>
          logEventWithContext('basename_profile_frame_pay_opened', ActionType.click)
        }
        imgData={payMe as StaticImageData}
        title="Pay me"
        description="Get paid with Paycaster."
      >
        <div className="flex flex-row items-center justify-between gap-4">
          <p className="text-sm text-palette-foreground">
            Let others pay your Basename with{' '}
            <a
              href="https://paycaster.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Paycaster.co
            </a>
            .
          </p>
          <Button
            rounded
            variant={ButtonVariants.Black}
            size={ButtonSizes.Tiny}
            onClick={handlePaycasterClick}
          >
            Show preview
          </Button>
        </div>
      </SuggestionCard>
      <SuggestionCard
        handleTriggerClick={() =>
          logEventWithContext('basename_profile_frame_buy_opened', ActionType.click)
        }
        imgData={buyFromMe as StaticImageData}
        title="Buy from me"
        description="Sell products from your Slice shop"
      >
        <p className="text-sm">To pin a frame:</p>
        <ol className="list-inside list-decimal indent-1 text-sm text-palette-foreground">
          <li>
            Visit your onchain shop on{' '}
            <a
              href="http://slice.so"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              slice.so
            </a>
          </li>
          <li>Find the product you want to sell on your profile</li>
          <li>Click on the “share“ icon to copy a link to the product and paste it here</li>
        </ol>
        <Input
          placeholder="https://"
          value={sliceSOFrameURL}
          onChange={handleSliceSOFrameURLChange}
          type="text"
          className="mr-3 mt-3 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
        />
        <Button
          rounded
          variant={ButtonVariants.Black}
          size={ButtonSizes.Small}
          className="mx-auto mt-2 md:hidden"
          onClick={handleNextStep}
          disabled={emptyFrameUrl || !isValidFrameUrl}
        >
          Show Preview
        </Button>
      </SuggestionCard>
      <SuggestionCard
        handleTriggerClick={() =>
          logEventWithContext('basename_profile_frame_sub_opened', ActionType.click)
        }
        imgData={nftProduct as StaticImageData}
        title="Subscribe to me"
        description="Get subscriptions to your Hypersub"
      >
        <p className="text-sm">To pin a frame:</p>
        <ol className="list-inside list-decimal indent-1 text-sm text-palette-foreground">
          <li>
            Visit{' '}
            <a
              href="http://hypersub.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              hypersub.xyz
            </a>
          </li>
          <li>Paste a link to your Hypersub Subscription page</li>
        </ol>
        <Input
          placeholder="https://"
          value={hypersubXYZFrameURL}
          onChange={handleHypersubXYZFrameURLChange}
          type="text"
          className="mr-3 mt-3 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
        />
        <Button
          rounded
          variant={ButtonVariants.Black}
          size={ButtonSizes.Small}
          className="mx-auto mt-2 md:hidden"
          onClick={handleNextStep}
          disabled={emptyFrameUrl || !isValidFrameUrl}
        >
          Show Preview
        </Button>
      </SuggestionCard>
      <SuggestionCard
        handleTriggerClick={() =>
          logEventWithContext('basename_profile_frame_mint_opened', ActionType.click)
        }
        imgData={mintMe as StaticImageData}
        title="Mint me"
        description="Mint your Base NFT on Highlight"
      >
        <p className="text-sm">To pin a frame:</p>
        <ol className="list-inside list-decimal indent-1 text-sm text-palette-foreground">
          <li>
            Visit{' '}
            <a
              href="http://highlight.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              highlight.xyz
            </a>
          </li>
          <li>Paste a link to the Base NFT you want others to mint</li>
        </ol>
        <Input
          placeholder="https://"
          value={highlightXYZFrameURL}
          onChange={handleHighlightXYZFrameURLChange}
          type="text"
          className="mr-3 mt-3 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
        />
        <Button
          rounded
          variant={ButtonVariants.Black}
          size={ButtonSizes.Small}
          className="mx-auto mt-2 md:hidden"
          onClick={handleNextStep}
          disabled={emptyFrameUrl || !isValidFrameUrl}
        >
          Show Preview
        </Button>
      </SuggestionCard>
      <SuggestionCard
        handleTriggerClick={() =>
          logEventWithContext('basename_profile_frame_rsvp_opened', ActionType.click)
        }
        imgData={email as StaticImageData}
        title="RSVP me"
        description="Get RSVPs to your events on events.xyz"
      >
        <p className="text-sm">To pin a frame:</p>
        <ol className="list-inside list-decimal indent-1 text-sm text-palette-foreground">
          <li>
            Visit{' '}
            <a
              href="http://events.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              events.xyz
            </a>
          </li>
          <li>Create a new event, or paste a link to the event you want others to RSVP to</li>
        </ol>
        <Input
          placeholder="https://"
          value={eventsXYZFrameURL}
          onChange={handleEventsXYZFrameURLChange}
          type="text"
          className="mr-3 mt-3 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
        />
        <Button
          rounded
          variant={ButtonVariants.Black}
          size={ButtonSizes.Small}
          className="mx-auto mt-2 md:hidden"
          onClick={handleNextStep}
          disabled={emptyFrameUrl || !isValidFrameUrl}
        >
          Show Preview
        </Button>
      </SuggestionCard>
      <SuggestionCard
        handleTriggerClick={() =>
          logEventWithContext('basename_profile_frame_custom_opened', ActionType.click)
        }
        icon={<PlusIcon width="24px" />}
        title="Add custom frame"
        description="Add a custom link to your frame"
      >
        <Input
          placeholder="https://"
          value={customFrameURL}
          onChange={handleCustomFrameUrlChange}
          type="text"
          className="mr-3 mt-1 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
        />
        <Button
          rounded
          variant={ButtonVariants.Black}
          size={ButtonSizes.Small}
          className="mx-auto mt-2 md:hidden"
          onClick={handleNextStep}
          disabled={emptyFrameUrl || !isValidFrameUrl}
        >
          Show Preview
        </Button>
      </SuggestionCard>
    </>
  );

  if (isDesktop) {
    return (
      <div className="flex w-full flex-col">
        <Link
          href={`/name/${basename}`}
          className="mb-8 flex max-w-36 items-center justify-start gap-2 text-base font-medium hover:underline"
        >
          <Icon name="backArrow" color="currentColor" height="1rem" width="1rem" /> Back to profile
        </Link>
        <h1 className="font-display text-3xl">Choose a frame to pin</h1>
        <div className="mt-4 flex flex-row justify-between gap-12">
          <Accordion.Root
            className="mt-4 flex flex-1 flex-col overflow-x-scroll"
            type="single"
            defaultValue="item-1"
            collapsible
          >
            {suggestionCards}
          </Accordion.Root>
          <div className="flex flex-1 flex-col">
            <div
              className="flex min-h-96 w-full items-center justify-center rounded-3xl bg-cover bg-center bg-no-repeat p-6"
              style={{ backgroundImage: `url(${previewBackground.src})` }}
            >
              {Boolean(emptyFrameUrl || !isValidFrameUrl) ? (
                <Image
                  className="pointer-events-none select-none"
                  src={emptyPreviewFrame as StaticImageData}
                  alt="preview frame"
                />
              ) : (
                <Frame className="w-[414px]" url={debouncedNewFrameUrl} />
              )}
            </div>
            <Button
              rounded
              variant={ButtonVariants.Black}
              className="mt-4 self-end"
              onClick={handleAddFrameClick}
              disabled={pendingFrameChange || emptyFrameUrl || !isValidFrameUrl}
            >
              Add frame
            </Button>
          </div>
        </div>
      </div>
    );
  }
  const mobileContent = {
    select: (
      <>
        <Link
          href={`/name/${basename}`}
          className="mb-3 flex max-w-36 items-center justify-start gap-2 text-base hover:underline"
        >
          <Icon name="backArrow" color="currentColor" height="1rem" width="1rem" /> Back to profile
        </Link>
        <h1 className="mb-4 font-display text-2xl">Choose a frame to pin</h1>
        <Accordion.Root
          className="mt-2 flex flex-col overflow-y-scroll"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          {suggestionCards}
        </Accordion.Root>
      </>
    ),
    preview: (
      <>
        <div className="mb-4 flex flex-col items-start">
          <Button
            variant={ButtonVariants.Gray}
            size={ButtonSizes.Small}
            rounded
            className="mb-4"
            onClick={handlePrevStep}
          >
            <Icon name="backArrow" color="currentColor" height="1rem" width="1rem" /> Back
          </Button>
          <h1 className="mb-4 font-display text-2xl">Preview your frame</h1>
          <div
            className="flex w-full items-center justify-center rounded-3xl bg-cover bg-center bg-no-repeat p-6"
            style={{ backgroundImage: `url(${previewBackground.src})` }}
          >
            {Boolean(emptyFrameUrl || !isValidFrameUrl) ? (
              <Image
                className="pointer-events-none select-none"
                src={emptyPreviewFrame as StaticImageData}
                alt="preview frame"
              />
            ) : (
              <Frame url={debouncedNewFrameUrl} />
            )}
          </div>
        </div>
        <Button
          rounded
          variant={ButtonVariants.Black}
          className="mx-auto mt-4"
          disabled={pendingFrameChange || emptyFrameUrl || !isValidFrameUrl}
          onClick={handleAddFrameClick}
        >
          Add Frame
        </Button>
      </>
    ),
  };

  return <div className="p-4">{mobileContent[step]}</div>;
}
