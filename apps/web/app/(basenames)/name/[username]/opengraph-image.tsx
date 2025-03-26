import { UsernameProfileProps } from 'apps/web/app/(basenames)/name/[username]/page';
import ImageRaw from 'apps/web/src/components/ImageRaw';
import { ImageResponse } from 'next/og';
import coverImageBackground from 'apps/web/app/(basenames)/name/[username]/coverImageBackground.png';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { isDevelopment } from 'apps/web/src/constants';
import {
  formatBaseEthDomain,
  getBasenameImage,
  getChainForBasename,
  USERNAME_DOMAINS,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import { base, baseSepolia } from 'viem/chains';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { getIpfsGatewayUrl, IpfsUrl, IsValidIpfsUrl } from 'apps/web/src/utils/urls';
import { Basename } from '@coinbase/onchainkit/identity';
import { getCloudinaryMediaUrl } from 'apps/web/src/utils/images';
import { logger } from 'apps/web/src/utils/logger';
export const runtime = 'edge';

const size = {
  width: 1200,
  height: 630,
};

export async function generateImageMetadata(props: UsernameProfileProps) {
  const params = await props.params;
  let username = params.username;
  if (
    username &&
    !username.endsWith(`.${USERNAME_DOMAINS[baseSepolia.id]}`) &&
    !username.endsWith(`.${USERNAME_DOMAINS[base.id]}`)
  ) {
    username = formatBaseEthDomain(username, base.id);
  }

  // Remove funky char which breaks OG image path
  const alphanumericRegex = /[^a-zA-Z0-9]/g;
  const sanitizedId = username.replace(alphanumericRegex, '');

  return [
    {
      alt: `Basenames | ${username}`,
      contentType: 'image/png',
      size,
      id: sanitizedId,
    },
  ];
}

type ImageRouteProps = { id: string; params: { username: string } };

export default async function OpenGraphImage(props: ImageRouteProps) {
  // Decode emoji
  let username = decodeURIComponent(props.params.username);

  if (
    username &&
    !username.endsWith(`.${USERNAME_DOMAINS[baseSepolia.id]}`) &&
    !username.endsWith(`.${USERNAME_DOMAINS[base.id]}`)
  ) {
    username = formatBaseEthDomain(username, base.id);
  }

  const fontData = await fetch(
    new URL('apps/web/src/fonts/CoinbaseDisplay-Regular.ttf', import.meta.url),
  ).then(async (res) => res.arrayBuffer());

  const domainName = isDevelopment ? `http://localhost:3000` : 'https://www.base.org';
  const profilePicture = getBasenameImage(username);
  const chain = getChainForBasename(username as Basename);
  let imageSource = domainName + profilePicture.src;

  // NOTE: Do we want to fail if the name doesn't exist?
  try {
    const client = getBasenamePublicClient(chain.id);
    const avatar = await client.getEnsText({
      name: username,
      key: UsernameTextRecordKeys.Avatar,
      universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[chain.id],
    });

    if (avatar) {
      // IPFS Resolution
      if (IsValidIpfsUrl(avatar)) {
        const ipfsUrl = getIpfsGatewayUrl(avatar as IpfsUrl);
        if (ipfsUrl) {
          imageSource = ipfsUrl;
        }
      } else {
        imageSource = avatar;
      }

      // Cloudinary resize / fetch
      imageSource = getCloudinaryMediaUrl({ media: imageSource, format: 'png', width: 80 });
    }
  } catch (error) {
    logger.error('Error fetching basename Avatar:', error);
  }

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${domainName + coverImageBackground.src})`,
          backgroundPosition: 'center',
          backgroundSize: '100% 100%',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0455FF',
            borderRadius: '5rem',
            padding: '1rem',
            paddingRight: '1.5rem',
            paddingLeft: '1.5rem',
            fontSize: '5rem',
            maxWidth: '100%',
            boxShadow:
              '0px 8px 16px 0px rgba(0,82,255,0.32),inset 0px 8px 16px 0px rgba(255,255,255,0.25) ',
          }}
        >
          <figure style={{ borderRadius: '100%', overflow: 'hidden' }}>
            <ImageRaw src={imageSource} height={80} width={80} alt={username} />
          </figure>
          <span
            style={{
              color: 'white',
              paddingBottom: '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: 'auto',
            }}
          >
            {username}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'CoinbaseDisplay',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}
