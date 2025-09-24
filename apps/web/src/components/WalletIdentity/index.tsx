'use client';
import { Avatar } from '@coinbase/onchainkit/identity';
import BasenameAvatar from 'apps/web/src/components/Basenames/BasenameAvatar';
import useBaseEnsAvatar from 'apps/web/src/hooks/useBaseEnsAvatar';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { getBasenameImage } from 'apps/web/src/utils/usernames';
import { truncateMiddle } from 'libs/base-ui/utils/string';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import { Address } from 'viem';
import { mainnet } from 'viem/chains';
import { useEnsAvatar, useEnsName } from 'wagmi';

export default function WalletIdentity({ address }: { address: Address }) {
  const { basenameChain } = useBasenameChain();
  const { data: basename } = useBaseEnsName({
    address: address,
  });

  const { data: basenameAvatar } = useBaseEnsAvatar({
    name: basename,
  });

  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
    query: {
      retry: false,
    },
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: basename ?? undefined,
    chainId: mainnet.id,
    query: {
      retry: false,
    },
  });

  const deterministicName = basename ?? ensName ?? address ?? 'default-avatar';
  const defaultSelectedProfilePicture = getBasenameImage(deterministicName);
  const avatar = basenameAvatar ?? ensAvatar ?? defaultSelectedProfilePicture;

  return (
    <div className="flex items-center gap-4">
      {basename ? (
        <BasenameAvatar basename={basename} width={32} height={32} />
      ) : (
        <Avatar
          address={address}
          chain={basenameChain}
          defaultComponent={
            <ImageWithLoading
              src={avatar}
              alt={deterministicName}
              width={32}
              height={32}
              wrapperClassName="h-8 w-8 overflow-hidden rounded-full"
              imageClassName="object-cover w-full h-full"
              backgroundClassName="bg-blue-500"
            />
          }
        />
      )}

      <div>
        <strong>{basename ?? truncateMiddle(address, 6, 4)}</strong>
        {!!basename && <p className="text-gray-40">{truncateMiddle(address, 6, 4)}</p>}
      </div>
    </div>
  );
}
