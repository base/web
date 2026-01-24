import { PinataSDK } from 'pinata';
import { requireEnv } from 'apps/web/src/utils/env';

let _pinata: PinataSDK | undefined;

export function getPinata(): PinataSDK {
  if (_pinata) return _pinata;

  // Only validate when the feature is actually used (e.g. IPFS upload route).
  const pinataJwt = requireEnv('PINATA_API_KEY', { feature: 'Pinata' });
  const pinataGateway = requireEnv('PINATA_GATEWAY_URL', { feature: 'Pinata' });

  _pinata = new PinataSDK({ pinataJwt, pinataGateway });
  return _pinata;
}
