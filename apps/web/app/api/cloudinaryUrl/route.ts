import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { createHash } from 'crypto';
import { logger } from 'apps/web/src/utils/logger';
import { requireEnv } from 'apps/web/src/utils/env';

const folderName = 'base-org-uploads';

export type CloudinaryMediaUrlRequest = {
  media: string;
  width: number;
};

export type CloudinaryMediaUrlResponse = {
  url: string;
};

function generateAssetId(media: string): string {
  return createHash('md5').update(media).digest('hex');
}

async function checkAssetExists(assetId: string): Promise<string | false> {
  try {
    const response = await cloudinary.api.resources_by_ids([`${folderName}/${assetId}`]);
    if (response && response.resources.length > 0) {
      const image = response.resources[0];
      return image.secure_url;
    } else {
      return false;
    }
  } catch (error) {
    // For other errors, log and assume the asset doesn't exist
    logger.error('Error checking if asset exists in Cloudinary', error, { assetId });
    return false;
  }
}

async function uploadToCloudinary(media: string, width: number) {
  try {
    const assetId = generateAssetId(media);

    // Otherwise upload it to group
    const result = await cloudinary.uploader.upload(media, {
      public_id: assetId,
      folder: folderName,
      format: 'webp',
      transformation: {
        width: width,
      },
    });

    return result;
  } catch (error) {
    logger.error('Failed to upload asset', error, { media });
    return false;
  }
}

async function getCloudinaryMediaUrl({
  media,
  width,
}: CloudinaryMediaUrlRequest): Promise<string | false> {
  // Asset ID based on URL
  const assetId = generateAssetId(media);

  // Return the asset if already uploaded
  const existingAssetUrl = await checkAssetExists(assetId);
  if (existingAssetUrl) {
    return existingAssetUrl;
  }

  const cloudinaryUpload = await uploadToCloudinary(media, width);

  if (cloudinaryUpload) {
    return cloudinaryUpload.secure_url;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Only validate when this API route is actually invoked.
    cloudinary.config({
      cloud_name: requireEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', { feature: 'Cloudinary' }),
      api_key: requireEnv('CLOUDINARY_API_KEY', { feature: 'Cloudinary' }),
      api_secret: requireEnv('CLOUDINARY_API_SECRET', { feature: 'Cloudinary' }),
    });

    const body = (await request.json()) as CloudinaryMediaUrlRequest;

    const { media, width } = body;

    if (!media || !width) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const cloudinaryUrl = await getCloudinaryMediaUrl({ media, width });
    if (cloudinaryUrl) {
      const response: CloudinaryMediaUrlResponse = {
        url: cloudinaryUrl,
      };
      return NextResponse.json(response);
    } else {
      return NextResponse.json({ error: 'Failed to upload Cloudinary URL' }, { status: 500 });
    }
  } catch (error) {
    logger.error('Error processing Cloudinary URL:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process Cloudinary URL';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
