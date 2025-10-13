import { QueryParams, urlWithQueryParams } from 'apps/web/src/utils/urls';

/*
 * Series of constant and utilities to share content on social platform
 */

export enum SocialPlatform {
  Twitter = 'twitter', // Never surrender
  Farcaster = 'farcaster',
}

export const socialPlatformsNameForDisplay = {
  [SocialPlatform.Twitter]: 'X',
  [SocialPlatform.Farcaster]: 'Farcaster',
};

export const socialPlatformHandle = {
  [SocialPlatform.Twitter]: '@base',
  [SocialPlatform.Farcaster]: '@base',
};

export const socialPlatformCtaForDisplay = {
  [SocialPlatform.Twitter]: 'Share',
  [SocialPlatform.Farcaster]: 'Share',
};

export const socialPlatformIconName: Record<SocialPlatform, string> = {
  [SocialPlatform.Twitter]: 'x',
  [SocialPlatform.Farcaster]: 'farcaster',
};

export type SocialMediaShareParams = {
  text: string;
  url: string;
};

type SocialShareFunction = ({ text, url }: SocialMediaShareParams) => string;
type SocialPlatformShareLinkFunction = Record<SocialPlatform, false | SocialShareFunction>;

export const socialPlatformShareLinkFunction: SocialPlatformShareLinkFunction = {
  [SocialPlatform.Twitter]: ({ text, url }: SocialMediaShareParams) => {
    const shareParams: QueryParams = {
      text: text,
      url: url,
    };

    return urlWithQueryParams('https://x.com/intent/tweet', shareParams);
  },
  [SocialPlatform.Farcaster]: ({ text, url }: SocialMediaShareParams) => {
    const shareParams: QueryParams = {
      'embeds[]': url,
      text: text,
    };

    return urlWithQueryParams('https://warpcast.com/~/compose', shareParams);
  },
};

export type SocialMediaHandleParams = {
  handle: string;
};
type SocialHandleFunction = ({ handle }: SocialMediaHandleParams) => string;
type SocialPlatformHandleFunction = Record<SocialPlatform, SocialHandleFunction>;

export const socialPlatformHandleFunction: SocialPlatformHandleFunction = {
  [SocialPlatform.Twitter]: ({ handle }: SocialMediaHandleParams) => {
    return `@${handle}`;
  },
  [SocialPlatform.Farcaster]: ({ handle }: SocialMediaHandleParams) => {
    return `@${handle}`;
  },
};
