import { useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { truncateMiddle } from 'base-ui/utils/string';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import { Address } from 'viem';

export type UserAddressProps = {
  address: Address;
};

export function UserAddress({ address }: UserAddressProps) {
  const { data: ensName, isLoading: ensNameIsLoading } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  const { data: baseEnsName, isLoading: baseEnsNameIsLoading } = useBaseEnsName({
    address,
  });

  const isLoading = ensNameIsLoading || baseEnsNameIsLoading;

  const addressOrName =
    (baseEnsName as string) || (ensName as string) || truncateMiddle(address, 6, 4);

  if (isLoading) return <Icon name="spinner" color="currentColor" />;

  return (
    <CopyToClipboard text={address}>
      <div className="flex cursor-pointer flex-row items-center gap-2">
        <span className="max-w-[9rem] truncate md:max-w-full">{addressOrName}</span>
        <Icon name="copy" color="currentColor" width="1rem" height="1rem" />
      </div>
    </CopyToClipboard>
  );
}
