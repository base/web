import satori from 'satori';
import {
  getBasenameImage,
  getChainForBasename,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import twemoji from 'twemoji';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { fetchResolverAddress } from 'apps/web/src/utils/usernames';
import { isDevelopment } from 'apps/web/src/constants';
import ImageRaw from 'apps/web/src/components/ImageRaw';
import { getIpfsGatewayUrl, IpfsUrl, IsValidIpfsUrl } from 'apps/web/src/utils/urls';
import { logger } from 'apps/web/src/utils/logger';
import { Basename } from '@coinbase/onchainkit/identity';
import { getCloudinaryMediaUrl } from 'apps/web/src/utils/images';
// WARNING: fs/promises is not available in Edge Runtime. Use fetch/static import for fonts.
// import { readFile } from 'node:fs/promises';
// import { join } from 'path';

// --- CONSTANTS & CONFIGURATION ---

const EMOJI_CACHE: Record<string, Promise<string>> = {};

// Default font file must be fetched via URL or statically imported in Edge Runtime.
// NOTE: Assuming font data is fetched successfully or replaced with a static import helper.
async function loadFontData(): Promise<ArrayBuffer> {
  // Placeholder for Edge-compatible font loading. Replace with actual logic.
  const fontPath = 'src/fonts/CoinbaseDisplay-Regular.ttf';
  const fontUrl = `/${fontPath}`; // Assuming font is served as a public asset.
  const response = await fetch(fontUrl);
  if (!response.ok) {
    logger.error('Failed to fetch font data from Edge environment.');
    throw new Error('Font loading failed');
  }
  return response.arrayBuffer();
}

async function loadEmoji(emojiString: string): Promise<string> {
  const code = twemoji.convert.toCodePoint(emojiString);

  if (code in EMOJI_CACHE) {
    return EMOJI_CACHE[code];
  }

  // Fetch the SVG content for the emoji.
  const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code.toLowerCase()}.svg`;

  return (EMOJI_CACHE[code] = fetch(url).then(async (r) => {
    if (!r.ok) {
      logger.error('Failed to fetch emoji SVG.', { url });
      return ''; // Return empty string on failure.
    }
    return r.text();
  }));
}

export const config = {
  // Explicitly defined for Vercel Edge Runtime.
  runtime: 'edge',
};

// --- API ROUTE HANDLER ---

export async function GET(request: Request, { params }: { params: { name: string } }) {
  // Load font data (Edge-compatible fetch used here)
  const fontData = await loadFontData();

  const url = new URL(request.url);

  // Corrected params assumption: params is generally a direct object in Next.js route handlers.
  const username = params.name ?? 'yourname';
  const domainName = isDevelopment ? `${url.protocol}//${url.host}` : 'https://www.base.org';
  
  // Initialize image source with the default Basename image.
  let imageSource = domainName + getBasenameImage(username as Basename).src;

  try {
    const chain = getChainForBasename(username as Basename);
    const client = getBasenamePublicClient(chain.id);
    const resolverAddress = await fetchResolverAddress(username as Basename);
    
    // Fetch Avatar URL from ENS text record.
    const avatar = await client.getEnsText({
      name: username,
      key: UsernameTextRecordKeys.Avatar,
      universalResolverAddress: resolverAddress,
    });

    if (avatar) {
      let resolvedAvatarUrl = avatar;
      
      // 1. IPFS Resolution
      if (IsValidIpfsUrl(avatar)) {
        const ipfsUrl = getIpfsGatewayUrl(avatar as IpfsUrl);
        if (ipfsUrl) {
          resolvedAvatarUrl = ipfsUrl;
        }
      }
      
      // 2. Cloudinary Optimization / Resizing
      // This applies to both successfully resolved IPFS and standard HTTP URLs.
      imageSource = getCloudinaryMediaUrl({ media: resolvedAvatarUrl, format: 'png', width: 120 });
    }
  } catch (error) {
    // Log error but proceed with the default imageSource.
    logger.error('Error fetching basename Avatar, using default image.', { username, error });
  }

  // --- SATORI SVG GENERATION ---

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
          // Complex box shadow style for visual effect.
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
      // Custom asset loader for Twemoji SVG handling.
      loadAdditionalAsset: async (code: string, segment: string) => {
        if (code === 'emoji') {
          // Encode the SVG data to Base64 for Satori rendering.
          const emojiSvg = await loadEmoji(segment);
          if (emojiSvg) {
              return `data:image/svg+xml;base64,${btoa(emojiSvg)}`;
          }
        }
        return code;
      },
    },
  );

  // --- RESPONSE ---

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      // Cache control can be added here for better edge performance.
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
