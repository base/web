// Mock for is-ipfs module
// This module only exports ESM and Jest has trouble with it

export const cid = (str) => {
  if (!str || typeof str !== 'string') return false;
  // Basic check for common CID patterns
  // CIDv0 starts with Qm and is 46 characters
  if (str.startsWith('Qm') && str.length === 46) return true;
  // CIDv1 in base32 starts with b and has various lengths
  if (str.startsWith('b') && str.length > 40) return true;
  return false;
};

export const multihash = (str) => {
  return cid(str);
};

export const ipfsUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.includes('/ipfs/') || url.includes('.ipfs.');
};

export const ipnsUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.includes('/ipns/') || url.includes('.ipns.');
};

export const url = (url) => {
  return ipfsUrl(url) || ipnsUrl(url);
};

export const path = (path) => {
  if (!path || typeof path !== 'string') return false;
  return path.startsWith('/ipfs/') || path.startsWith('/ipns/');
};
