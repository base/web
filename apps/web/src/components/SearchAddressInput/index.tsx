import { useCallback, useEffect, useState } from 'react';
import Input from 'apps/web/src/components/Input';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import { Address, isAddress } from 'viem';
import { useEnsAddress } from 'wagmi';
import { isBasename, isEnsName } from 'apps/web/src/utils/usernames';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { truncateMiddle } from 'apps/web/src/utils/truncateMiddle';
import Link from 'next/link';
import Hint from 'apps/web/src/components/Hint';
import Fieldset from 'apps/web/src/components/Fieldset';
import { mainnet } from 'viem/chains';

type SearchAddressInputProps = {
  onChange: (value: string) => void;
};
export default function SearchAddressInput({ onChange }: SearchAddressInputProps) {
  const [value, setValue] = useState<string>('');

  /* 1. User enters an address */
  const valueIsAddress = isAddress(value);

  /* Resolve name */
  const { data: username, isLoading: usernameIsLoading } = useBaseEnsName({
    address: value as Address,
  });

  /* 2. User enters an Basename */
  const validBasename = isBasename(value);

  const { basenameChain } = useBasenameChain();

  const { data: basenameAddress, isLoading: basenameAddressIsLoading } = useEnsAddress({
    name: value.toLowerCase(),
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
    chainId: basenameChain.id,
    query: {
      enabled: validBasename,
      retry: false,
    },
  });

  /* 3. User enters an ENS name */
  const validEnsName = isEnsName(value);
  const { data: ensAddress, isLoading: ensAddressIsLoading } = useEnsAddress({
    name: value.toLowerCase(),
    chainId: mainnet.id,
    query: {
      enabled: validEnsName,
      retry: false,
    },
  });

  /* 4. Format and display a block explorer link accordingly */

  // Value is an address that resolves to a name (ens/basename)
  const showUsername = valueIsAddress && !!username;

  // Explorer url & name
  const baseBlockExplorerUrl = basenameChain.blockExplorers?.default.url;
  const baseBlockExplorerName = basenameChain.blockExplorers?.default.name;

  // Final address
  const finalAddress = basenameAddress ?? ensAddress ?? value;
  const finalAddressIsValid = isAddress(finalAddress);

  // Explorer link with valid address
  const explorerLink = finalAddressIsValid && `${baseBlockExplorerUrl}/address/${finalAddress}`;

  const isLoading = usernameIsLoading || basenameAddressIsLoading || ensAddressIsLoading;

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  useEffect(() => {
    onChange?.(finalAddress);
  }, [finalAddress, onChange, value]);

  return (
    <Fieldset className="w-full">
      <Input
        type="text"
        value={value}
        onChange={onInputChange}
        className="w-full flex-1 rounded-xl border border-gray-40/20 p-4 text-black"
        placeholder="Search by Basename, ENS name or wallet address"
      />
      <p>
        {isLoading ? (
          <Icon name="spinner" color="currentColor" />
        ) : explorerLink ? (
          <Hint>
            <Link
              href={explorerLink}
              target="_blank"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              <span>
                View {showUsername && <strong>{username}</strong>}
                {!showUsername && finalAddress && (
                  <strong>{truncateMiddle(finalAddress, 6, 4)}</strong>
                )}{' '}
                {baseBlockExplorerName}
              </span>
              <Icon name="external-link" color="currentColor" height="0.8rem" width="0.8rem" />
            </Link>
          </Hint>
        ) : (
          <Hint>Enter a valid Basename, ENS name or ETH address</Hint>
        )}
      </p>
    </Fieldset>
  );
}
