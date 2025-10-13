const { logger } = require('apps/web/src/utils/logger');
const { Contract } = require('ethers');

const erc721Abi = [
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function tokenURI(uint256 _tokenId) external view returns (string)',
];

const erc1155Abi = [
  'function balanceOf(address _owner, uint256 _id) view returns (uint256)',
  'function uri(uint256 _id) view returns (string)',
];

function getGatewayUrl(uri, tokenId) {
  const match = /([a-z]+)(?::\/\/|\/)(.*)/.exec(uri);

  if (!match || match.length < 3) {
    return uri;
  }

  const id = match[2];
  let url = uri;

  switch (match[1]) {
    case 'ar': {
      url = `https://arweave.net/${id}`;
      break;
    }
    case 'ipfs':
      if (id.includes('ipfs') || id.includes('ipns')) {
        url = `https://gateway.ipfs.io/${id}`;
      } else {
        url = `https://gateway.ipfs.io/ipfs/${id}`;
      }
      break;
    case 'ipns':
      if (id.includes('ipfs') || id.includes('ipns')) {
        url = `https://gateway.ipfs.io/${id}`;
      } else {
        url = `https://gateway.ipfs.io/ipns/${id}`;
      }
      break;
    case 'http':
    case 'https':
    default:
      break;
  }

  return tokenId ? url.replaceAll('{id}', tokenId) : url;
}

async function getAvatarUri(address, uri, provider) {
  const match = /([a-z]+):\/\/(.*)/.exec(uri);
  const match721 = /eip155:1\/erc721:(\w+)\/(\w+)/.exec(uri);
  const match1155 = /eip155:1\/erc1155:(\w+)\/(\w+)/.exec(uri);

  if (match721 && match721.length === 3) {
    const contractId = match721[1].toLowerCase();
    const tokenId = match721[2];
    const normalizedAddress = address?.toLowerCase();

    const erc721Contract = new Contract(contractId, erc721Abi, provider);

    if (normalizedAddress) {
      const owner = await erc721Contract.ownerOf(tokenId);

      if (!owner || owner.toLowerCase() !== normalizedAddress) {
        // ERC721 token not owned by address
        return null;
      }
    }

    const tokenURI = await erc721Contract.tokenURI(tokenId);
    if (tokenURI.startsWith('data:application/json;base64')) {
      const json = Buffer.from(tokenURI.substring(29), 'base64').toString();
      const data = JSON.parse(json);
      return getGatewayUrl(data.image);
    }

    const res = await fetch(getGatewayUrl(tokenURI, BigInt(tokenId).toString(16)));
    const data = await res.json();
    return getGatewayUrl(data.image);
  }

  if (match1155 && match1155.length === 3) {
    const contractId = match1155[1].toLowerCase();
    const tokenId = match1155[2];

    const erc1155Contract = new Contract(contractId, erc1155Abi, provider);

    if (address) {
      const balance = await erc1155Contract.balanceOf(address, tokenId);
      if (balance.isZero()) {
        // ERC1155 token not owned by address
        return null;
      }
    }

    const tokenURI = await erc1155Contract.uri(tokenId);
    const res = await fetch(getGatewayUrl(tokenURI, BigInt(tokenId).toString(16)));
    const data = await res.json();
    return getGatewayUrl(data.image);
  }

  if (match && match.length === 3) {
    const protocol = match[1];
    const id = match[2];

    switch (protocol) {
      case 'ar': {
        const baseUrl = 'https://arweave.net';

        try {
          const transactionRes = await fetch(`${baseUrl}/graphql`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
              query: `
                {
                  transactions(ids: ["${id}"]) {
                    edges {
                      node {
                        id
                        owner {
                          address
                        }
                      }
                    }
                  }
                }
              `,
            }),
          });

          const transactionData = await transactionRes.json();
          const tx = transactionData.data.transactions.edges[0].node;

          const relatedTransactionRes = await fetch(`${baseUrl}/graphql`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
              query: `
                {
                  transactions(
                    owners: ["${tx.owner.address}"],
                    tags: { name: "Origin", values: ["${tx.id}"] },
                    sort: HEIGHT_DESC
                  ) {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
              `,
            }),
          });
          const relatedTransactionData = await relatedTransactionRes.json();

          if (
            relatedTransactionData.data &&
            relatedTransactionData.data.transactions.edges.length > 0
          ) {
            return `${baseUrl}/${relatedTransactionData.data.transactions.edges[0].node.id}`;
          }
          return `${baseUrl}/${id}`;
        } catch (e) {
          logger.error('error getting avatar URI', error);
          return null;
        }
      }
      case 'ipfs':
        return `https://gateway.ipfs.io/ipfs/${id}`;
      case 'ipns':
        return `https://gateway.ipfs.io/ipns/${id}`;
      case 'http':
      case 'https':
        return uri;
      default:
        // fall-through for other matchers
        break;
    }
  }

  return getGatewayUrl(uri);
}

module.exports = {
  getGatewayUrl,
  getAvatarUri,
};
