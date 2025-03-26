'use client';

import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import NeynarFrame from 'apps/web/src/components/NeynarFrame';
import { fetchCast, NeynarCastData } from 'apps/web/src/utils/frames';
import Link from 'next/link';
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Hls from 'hls.js';
import { useErrors } from 'apps/web/contexts/Errors';
import classNames from 'classnames';

// Image embed
const isImageUrl = (url: string): boolean => {
  try {
    // This will trigger an error if it's not a valid URL
    const parsedUrl = new URL(url);

    // Ends with an image format
    return /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/.test(parsedUrl.pathname);
  } catch (error) {
    return false;
  }
};

// Video embed
const isVideoUrl = (url: string): boolean => url.endsWith('.m3u8') || url.endsWith('.mp4');

type NativeVideoPlayerProps = {
  url: string;
};

function NativeVideoPlayer({ url }: NativeVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported() && url.endsWith('.m3u8')) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
      } else {
        videoRef.current.src = url;
      }
    }
  }, [url]);

  return <video ref={videoRef} controls muted className="overflow-hidden rounded-2xl" />;
}

// Links in text
const WARPCAST_DOMAIN = 'https://warpcast.com';

const channelRegex = /(^|\s)\/\w+/g;
const mentionRegex = /@\w+(\.eth)?/g;
const urlRegex = /((https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?)/g;
const combinedRegex = new RegExp(
  `(${channelRegex.source})|(${mentionRegex.source})|(${urlRegex.source})`,
  'g',
);

const generateUrl = (match: string): string => {
  if (channelRegex.test(match)) {
    return `${WARPCAST_DOMAIN}/~/channel${match.trim()}`;
  } else if (mentionRegex.test(match)) {
    return `${WARPCAST_DOMAIN}/${match.substring(1)}`;
  } else if (urlRegex.test(match)) {
    return match.startsWith('http') ? match : `http://${match}`;
  }
  return '';
};

function ParagraphWithLinks({ text }: { text: string }) {
  const textWithLinks = useMemo(() => {
    let match;
    let lastIndex = 0;
    const results: React.ReactNode[] = [];
    while ((match = combinedRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      if (lastIndex < matchIndex) {
        const justText = text.slice(lastIndex, matchIndex);

        results.push(justText);
      }

      const matchedUrl = match[0].trim();
      const url = generateUrl(matchedUrl);
      results.push(
        <Link key={matchIndex} href={url} target="_blank" className="break-words text-blue-500">
          {matchedUrl}
        </Link>,
      );

      lastIndex = combinedRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      const justText = text.slice(lastIndex);
      results.push(justText);
    }
    return results;
  }, [text]);

  return textWithLinks;
}

export default function NeynarCast({
  identifier,
  type,
}: {
  identifier: string;
  type: 'url' | 'hash';
}) {
  const [data, setData] = useState<NeynarCastData['cast']>();
  const { logError } = useErrors();
  useEffect(() => {
    fetchCast({ type, identifier })
      .then((result) => {
        if (result) setData(result);
      })
      .catch((error) => {
        logError(error, 'Failed to load Cast');
      });
  }, [identifier, logError, type]);

  const onClickCast = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const target = event.target as HTMLElement;

      const isLink = target.tagName === 'a';
      const parentIsLink = target.closest('a');

      if (isLink || parentIsLink) return;

      window.open(identifier, '_blank');
    },
    [identifier],
  );

  if (!data) return null;

  const frames = data.frames ?? [];
  const framesUrls = frames.map((frame) => frame.frames_url);
  const embeds = data.embeds ?? [];

  // Frames are both in .frames and .embed
  const filteredEmbeds = embeds.filter((embed) => !framesUrls.includes(embed.url));
  const { hash, text, author, parent_url: parentUrl } = data;

  const textParagraph = text.split('\n\n');

  const castWrapperClasses = classNames(
    'flex cursor-pointer flex-col gap-4 text-left',
    'max-h-[30rem] overflow-hidden rounded-3xl border border-gray-40/20 p-8 relative',
    'hover:border-blue-500 transition-all',
    "after:content-[''] after:absolute after:w-full after:h-[2rem]  after:bottom-0 after:left-0",
    'after:bg-gradient-to-b after:from-transparent after:to-white',
  );

  return (
    <button className={castWrapperClasses} onClick={onClickCast} type="button">
      {author && (
        <Link href={parentUrl} target="_blank">
          <header className="flex items-center gap-4">
            {author.pfp_url && (
              <ImageWithLoading
                src={author.pfp_url}
                wrapperClassName="rounded-full h-[3rem] max-h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] max-w-[3rem]"
                imageClassName="object-cover min-h-full min-w-full"
                alt={`${author.display_name} Profile picture`}
                width={48}
                height={48}
              />
            )}
            <div>
              <strong className="block">{author.display_name}</strong>
              <span className="text-gray-40">@{author.username}</span>
            </div>
          </header>
        </Link>
      )}
      {textParagraph.length > 0 && (
        <ul className="flex flex-col gap-2">
          {textParagraph.map((paragraph, index) => (
            // It's fine to disable index warning here since the order will never change (static cast)
            // eslint-disable-next-line react/no-array-index-key
            <li key={`${paragraph}_${index}`}>
              <ParagraphWithLinks text={paragraph} />
            </li>
          ))}
        </ul>
      )}
      {filteredEmbeds.length > 0 && (
        <ul>
          {filteredEmbeds.map((embed, index) => (
            <li key={embed.url}>
              {embed.url && isImageUrl(embed.url) && (
                <ImageWithLoading
                  src={`${embed.url}_${index}`}
                  alt="image"
                  wrapperClassName="rounded-3xl overflow-hidden"
                />
              )}
              {embed.url && isVideoUrl(embed.url) && <NativeVideoPlayer url={embed.url} />}
            </li>
          ))}
        </ul>
      )}
      {frames.length > 0 && (
        <ul className="flex flex-col gap-2">
          {frames.map((frame) => (
            <li key={frame.title}>
              <NeynarFrame frame={frame} hash={hash} />
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
