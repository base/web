import { pinata } from 'apps/web/src/utils/pinata';
import { isDevelopment } from 'libs/base-ui/constants';
import { NextResponse, NextRequest } from 'next/server';

export const ALLOWED_IMAGE_TYPE = [
  'image/svg+xml',
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
];

export const MAX_IMAGE_SIZE_IN_MB = 1; // max 1mb

export async function POST(request: NextRequest) {
  try {
    // Referer validation
    const requestUrl = new URL(request.url);

    // Username must be provided
    const username = requestUrl.searchParams.get('username');
    if (!username) return NextResponse.json({ error: 'Invalid request' }, { status: 500 });

    // Must have a referer
    const referer = request.headers.get('referer');
    if (!referer) return NextResponse.json({ error: 'Invalid request' }, { status: 500 });

    // referer can only be us
    // TODO: Won't work on vercel previews
    const refererUrl = new URL(referer);
    const allowedReferrersHost = isDevelopment ? 'localhost:3000' : 'www.base.org';
    if (allowedReferrersHost !== refererUrl.host) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 500 });
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    // Validation: file is present in request
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 500 });

    // Validation: file is an image
    if (!ALLOWED_IMAGE_TYPE.includes(file.type))
      return NextResponse.json({ error: 'Invalid file type' }, { status: 500 });

    // Validation: file is less than 1mb
    const bytes = file.size;
    const bytesToMegaBytes = bytes / (1024 * 1024);
    if (bytesToMegaBytes > MAX_IMAGE_SIZE_IN_MB)
      return NextResponse.json({ error: 'File is too large' }, { status: 500 });

    // Upload
    const uploadData = await pinata.upload.file(file, {
      groupId: '765ab5e4-0bc3-47bb-9d6a-35b308291009',
      metadata: {
        name: username,
      },
    });
    return NextResponse.json(uploadData, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
