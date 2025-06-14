'use client';

import { useNameList } from 'apps/web/src/components/Basenames/ManageNames/hooks';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { redirect } from 'next/navigation';
import { useIsMounted } from 'usehooks-ts';
import { Icon } from 'apps/web/src/components/Icon/Icon';

type RenewalBoundaryProps = {
  name: string;
  children: JSX.Element;
};

export function RenewalBoundary({ name, children }: RenewalBoundaryProps) {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { namesData, isLoading } = useNameList();
  const { basenameChain } = useBasenameChain();
  const isMounted = useIsMounted();
  const fullDomain = formatBaseEthDomain(name, basenameChain.id);

  const isOwned = useMemo(() => {
    return !!namesData?.data.find((n) => n.domain === fullDomain);
  }, [fullDomain, namesData?.data]);

  if (!isMounted() || isLoading || isConnecting) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Icon name="spinner" color="currentColor" />
      </div>
    );
  }

  if (isDisconnected) {
    redirect(`/name/${fullDomain}`);
  }

  if (!!address && !isOwned) {
    redirect(`/name/${fullDomain}`);
  }

  return children;
}
