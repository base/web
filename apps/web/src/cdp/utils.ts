import { cdpBaseUri } from 'apps/web/src/cdp/constants';
import { generateCdpJwt } from 'apps/web/src/cdp/jwt';
import { Response } from 'node-fetch';

export async function cdpGet(endpoint: string, authed: boolean): Promise<Response> {
  const headers = new Headers();

  const uri = `https://${cdpBaseUri}/${endpoint}`;
  if (authed) {
    const jwt = await generateCdpJwt('GET', endpoint);
    headers.set('Authorization', `Bearer ${jwt}`);
  }
  return fetch(uri, {
    method: 'GET',
    headers,
  });
}

export async function cdpPost(endpoint: string, body: unknown, authed: boolean): Promise<Response> {
  const uri = `https://${cdpBaseUri}/${endpoint}`;
  const headers = new Headers();
  if (authed) {
    const jwt = await generateCdpJwt('POST', endpoint);
    headers.set('Authorization', `Bearer ${jwt}`);
  }
  return fetch(uri, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });
}
