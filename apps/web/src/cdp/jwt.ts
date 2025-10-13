import { SignJWT } from 'jose';
import crypto from 'crypto';
import { cdpBaseUri, cdpKeyName, cdpKeySecret } from 'apps/web/src/cdp/constants';

const algorithm = 'ES256';

type APIKeyClaims = {
  iss: string;
  sub: string;
  nbf: number;
  exp: number;
  uri: string;
  aud: string[];
};

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
  const key = crypto.createPrivateKey(cdpKeySecret.replace(/\\n/g, '\n'));

  const jwt = await new SignJWT(claims)
    .setProtectedHeader({ alg: algorithm, kid: cdpKeyName, nonce })
    .setIssuedAt()
    .setExpirationTime('60s')
    .sign(key);

  return jwt;
}
