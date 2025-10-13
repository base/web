import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import {
  SocialMediaShareParams,
  SocialPlatform,
  socialPlatformHandle,
  socialPlatformIconName,
  socialPlatformShareLinkFunction,
} from 'apps/web/src/utils/socialPlatforms';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import Link from 'next/link';

import { useCallback } from 'react';

export const socialPlatformsEnabled = [SocialPlatform.Farcaster, SocialPlatform.Twitter];

function SocialPlatformButton({ socialPlatform }: { socialPlatform: SocialPlatform }) {
  const { selectedName } = useRegistration();
  const { logEventWithContext } = useAnalytics();
  const popupWidth = 600;
  const popupHeight = 600;
  const text = [
    'I just got my Basename as part of Onchain Summer! 😎',
    `Basenames are ENS names supercharged by ${socialPlatformHandle[socialPlatform]}: low-cost (or free!), easy to use, and a powerful tool for connecting builders across the onchain economy.`,
    'Get yours today.',
  ].join('\n\n');

  const socialMediaShareParams: SocialMediaShareParams = {
    text: text,
    url: `https://base.org/name/${selectedName}`,
  };

  const shareLinkFunction = socialPlatformShareLinkFunction[socialPlatform];
  const shareLink = shareLinkFunction && shareLinkFunction(socialMediaShareParams);
  const left = window.innerWidth / 2 - popupWidth / 2;
  const top = window.innerHeight / 2 - popupHeight / 2;
  const options = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      logEventWithContext(`share_on_social_${socialPlatform}`, ActionType.click);
      if (shareLink) window.open(shareLink, '_blank', options);
    },
    [logEventWithContext, socialPlatform, shareLink, options],
  );

  if (!shareLink) return null;

  return (
    <Link onClick={onClick} href={shareLink} target="_blank">
      <Icon
        name={socialPlatformIconName[socialPlatform]}
        color="currentColor"
        height="1.5rem"
        width="1.5rem"
      />
    </Link>
  );
}

export default function RegistrationShareOnSocials() {
  return (
    <p className="flex items-center justify-center gap-4 text-center font-bold uppercase tracking-widest text-white">
      Share your name
      {socialPlatformsEnabled.map((socialPlatform) => (
        <SocialPlatformButton socialPlatform={socialPlatform} key={socialPlatform} />
      ))}
    </p>
  );
}
