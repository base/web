'use client';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import { CLOUDFARE_IPFS_PROXY } from 'apps/web/src/utils/urls';
import BasenameAvatar from 'apps/web/src/components/Basenames/BasenameAvatar';

export function UserAvatar() {
  const { address } = useAccount();

  // L1 Name & Avatar
  const { data: ensName, isLoading: ensNameIsLoading } = useEnsName({
    address,
    chainId: mainnet.id,
    query: {
      retry: false,
    },
  });

  const { data: ensAvatar, isLoading: ensAvatarIsLoading } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    assetGatewayUrls: {
      ipfs: CLOUDFARE_IPFS_PROXY,
    },
    query: {
      retry: false,
    },
  });

  // L2 Name
  const { data: baseEnsName, isLoading: baseEnsNameIsLoading } = useBaseEnsName({
    address,
  });

  const isLoading = ensNameIsLoading || ensAvatarIsLoading || baseEnsNameIsLoading;
  const avatar = ensAvatar;

  if (baseEnsName) {
    return (
      <BasenameAvatar
        basename={baseEnsName}
        width={32}
        height={32}
        wrapperClassName="rounded-full h-[2rem] max-h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] max-w-[2rem]"
      />
    );
  }

  if (!avatar) return null;

  return (
    <ImageWithLoading
      src={avatar}
      alt="Avatar"
      wrapperClassName="rounded-full h-[2rem] max-h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] max-w-[2rem]"
      backgroundClassName="bg-blue-500"
      imageClassName="group-hover:rotate-[-1deg] group-hover:scale-105 object-cover h-full w-full"
      width={32}
      height={32}
      forceIsLoading={isLoading}
    />
  );
}
