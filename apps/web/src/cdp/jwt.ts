import { SignJWT } from 'jose';
import crypto from 'crypto';
import { cdpBaseUri, cdpKeyName } from 'apps/web/src/cdp/constants';

const algorithm = 'ES256';

type APIKeyClaims = {
  iss: string;
  sub: string;
  nbf: number;
  exp: number;
  uri: string;
  aud: string[];
};

/**
 * Gets the CDP key secret from environment variables.
 * SECURITY: This function validates the secret exists before use.
 * 
 * @throws {Error} If CDP_KEY_SECRET is not set or invalid
 * @returns The CDP key secret from environment variables
 */
function getCdpKeySecret(): string {
  const secret = process.env.CDP_KEY_SECRET;
  
  if (!secret || secret.trim().length === 0) {
    throw new Error(
      'CDP_KEY_SECRET environment variable is missing or empty. ' +
      'This is required for CDP API authentication. Ensure it is set in your .env file.'
    );
  }
  
  return secret;
}

export async function generateCdpJwt(requestMethod: string, requestPath: string): Promise<string> {
  const uri = `${requestMethod} ${cdpBaseUri}/${requestPath}`;
  const nonce = crypto.randomBytes(16).toString('hex');
  const claims: APIKeyClaims = {
    iss: 'cdp',
    sub: cdpKeyName,
    nbf: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60,
    uri: uri,
    aud: ['cb-gpt-api'],
  };
  
  // Get and validate secret at runtime
  const cdpKeySecret = getCdpKeySecret();
  const key = crypto.createPrivateKey(cdpKeySecret.replace(/\\n/g, '\n'));

  const jwt = await new SignJWT(claims)
    .setProtectedHeader({ alg: algorithm, kid: cdpKeyName, nonce })
    .setIssuedAt()
    .setExpirationTime('60s')
    .sign(key);

  return jwt;
}
