'use client';
import { Basename } from '@coinbase/onchainkit/identity';
import useBasenameResolver from 'apps/web/src/hooks/useBasenameResolver';
import BasenameAvatar from 'apps/web/src/components/Basenames/BasenameAvatar';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { truncateMiddle } from 'libs/base-ui/utils/string';
import { useEnsAddress } from 'wagmi';

export default function BasenameIdentity({ username }: { username: Basename }) {
  const { basenameChain } = useBasenameChain();
  const { data: resolverAddress } = useBasenameResolver({ username });

  const { data: basenameAddress } = useEnsAddress({
    name: username,
    universalResolverAddress: resolverAddress,
    chainId: basenameChain.id,
    query: { enabled: !!resolverAddress },
  });

  return (
    <div className="flex items-center gap-4">
      <BasenameAvatar
        basename={username}
        width={32}
        height={32}
        wrapperClassName="rounded-full h-[2rem] max-h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] max-w-[2rem]"
      />
      <div>
        <strong>{username}</strong>
        {basenameAddress && <p className="text-gray-40">{truncateMiddle(basenameAddress, 6, 4)}</p>}
      </div>
    </div>
  );
}
