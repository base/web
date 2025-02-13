import satori from 'satori';
import {
  getBasenameImage,
  getChainForBasename,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import twemoji from 'twemoji';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { isDevelopment } from 'apps/web/src/constants';
import ImageRaw from 'apps/web/src/components/ImageRaw';
import { getIpfsGatewayUrl, IpfsUrl, IsValidIpfsUrl } from 'apps/web/src/utils/urls';
import { logger } from 'apps/web/src/utils/logger';
import { Basename } from '@coinbase/onchainkit/identity';
import { getCloudinaryMediaUrl } from 'apps/web/src/utils/images';
import { readFile } from 'node:fs/promises';
import { join } from 'path';

const emojiCache: Record<string, Promise<string>> = {};

async function loadEmoji(emojiString: string) {
  const code = twemoji.convert.toCodePoint(emojiString);

  if (code in emojiCache) {
    return emojiCache[code];
  }

  // TODO: Is this okay? Vercel's OG image already does these calls
  const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code.toLowerCase()}.svg`;

  return (emojiCache[code] = fetch(url).then(async (r) => r.text()));
}

export const config = {
  runtime: 'edge',
};

export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  const fontData = await readFile(join(process.cwd(), 'src/fonts/CoinbaseDisplay-Regular.ttf'));

  const url = new URL(request.url);

  const username = (await params).name ?? 'yourname';
  const domainName = isDevelopment ? `${url.protocol}//${url.host}` : 'https://www.base.org';
  const profilePicture = getBasenameImage(username as Basename);
  const chain = getChainForBasename(username as Basename);
  let imageSource = domainName + profilePicture.src;

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
      imageSource = getCloudinaryMediaUrl({ media: imageSource, format: 'png', width: 120 });
    }
  } catch (error) {
    logger.error('Error fetching basename Avatar:', error);
  }

  // Using Satori for an SVG response
  const svg = await satori(
    <div
      style={{
        color: 'black',
        height: 1000,
        width: 1000,
        background: '#F7F7F7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0455FF',
          borderRadius: '5rem',
          padding: '7%',
          width: '100%',
          height: '100%',
          maxHeight: '55%',
          maxWidth: '90%',
          boxShadow:
            '0px 8px 16px 0px rgba(0,82,255,0.32),inset 0px 8px 16px 0px rgba(255,255,255,0.25) ',
        }}
      >
        <figure style={{ borderRadius: '100%', overflow: 'hidden', height: 120, width: 120 }}>
          <ImageRaw src={imageSource} height={120} width={120} alt={username} />
        </figure>
        <span
          style={{
            color: 'white',
            paddingBottom: '0.75rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: 'auto',
            fontSize: '5rem',
          }}
        >
          {username}
        </span>
      </div>
    </div>,
    {
      width: 1000,
      height: 1000,
      fonts: [
        {
          name: 'CoinbaseDisplay',
          data: fontData,
          weight: 500,
          style: 'normal',
        },
      ],
      loadAdditionalAsset: async (code: string, segment: string) => {
        if (code === 'emoji') {
          return `data:image/svg+xml;base64,${btoa(await loadEmoji(segment))}`;
        }

        return code;
      },
    },
  );

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}
