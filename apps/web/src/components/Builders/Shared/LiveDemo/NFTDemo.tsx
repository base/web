import classNames from 'classnames';
import Image from 'next/image';
import { useCallback } from 'react';
import { base } from 'viem/chains';
import { type UseNFTData, NFTMintCard } from '@coinbase/onchainkit/nft';
import {
  NFTAssetCost,
  NFTCollectionTitle,
  NFTMintButton,
  NFTQuantitySelector,
} from '@coinbase/onchainkit/nft/mint';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { Name } from '@coinbase/onchainkit/identity';
import demoAvatar from './assets/nft-demo-avatar.webp';
import demoNftAnimation from './assets/nft-demo-animation.mp4';

export function NFTDemo() {
  const nftData = useCallback(
    () => ({
      name: 'OCK Mint Component',
      description: 'OnchainKit highlights',
      imageUrl: 'https://ipfs.io/ipfs/bafybeifbnyvwfrbdr4r3nn7joi5eznbype27fynyat7rr52ckmqnz3camm',
      animationUrl: demoNftAnimation,
      mimeType: 'video/mp4',
      contractType: 'ERC1155',
      price: {
        amount: '0.000111',
        currency: 'ETH',
        amountUSD: '0.264674505',
      },
      mintFee: {
        amount: '0.0001',
        currency: 'ETH',
        amountUSD: '0.2384455',
      },
      maxMintsPerWallet: 2,
      isEligibleToMint: true,
      creatorAddress: '0xb4e741b761d8b69103cc986f1b7cd71ed627f8cc',
      network: 'networks/base-mainnet',
      totalTokens: '1',
      totalOwners: '1',
    }),
    [],
  ) as UseNFTData;

  const buildMintTransaction = useCallback(
    async () =>
      Promise.resolve([
        { to: '0x0000000000000000000000000000000000000000' as `0x${string}`, callData: '0x' },
      ]),
    [],
  );

  return (
    <div className="flex items-center justify-center">
      <NFTMintCard
        contractAddress="0xed2f34043387783b2727ff2799a46ce3ae1a34d2"
        tokenId="2"
        useNFTData={nftData}
        buildMintTransaction={buildMintTransaction}
      >
        <DemoNFTCreator />
        <NFTMedia />
        <NFTCollectionTitle />
        <NFTQuantitySelector />
        <NFTAssetCost />
        <NFTMintButton disabled />
      </NFTMintCard>
    </div>
  );
}

function DemoNFTCreator() {
  return (
    <div className={classNames('-my-1 flex justify-between')}>
      <div className={classNames('flex flex-col px-4 py-1')}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="h-4 w-4 overflow-hidden rounded-full">
                <Image
                  className="min-h-full min-w-full object-cover"
                  loading="lazy"
                  width={16}
                  height={16}
                  decoding="async"
                  src={demoAvatar}
                  alt="Demo Avatar"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Name address="0xb4e741b761d8b69103cc986f1b7cd71ed627f8cc" chain={base} />
          </div>
        </div>
      </div>
    </div>
  );
}
