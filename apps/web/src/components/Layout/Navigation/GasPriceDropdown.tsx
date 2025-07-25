'use client';

import Card from 'apps/web/src/components/base-org/Card';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { base, mainnet } from 'viem/chains';
import { useGasPrice } from 'wagmi';
import { DynamicCryptoProviders } from 'apps/web/app/CryptoProviders.dynamic';

const convertWeiToMwei = (weiValue: bigint): number => {
  // 1 mwei = 10^6 wei
  const mweiValue = Number(weiValue) / 1_000_000;
  return Number(mweiValue.toFixed(2)); // Round to 2 decimal places
};

export function DynamicWrappedGasPriceDropdown() {
  return (
    <DynamicCryptoProviders>
      <GasPriceDropdown />
    </DynamicCryptoProviders>
  );
}

export function GasPriceDropdown() {
  const { data: baseGasPriceInWei } = useGasPrice({
    chainId: base.id,
    query: {
      refetchInterval: 10_000,
    },
  });

  const { data: mainnetGasPriceInWei } = useGasPrice({
    chainId: mainnet.id,
    query: {
      refetchInterval: 10_000,
    },
  });

  return (
    <div className="relative group">
      <div className="flex cursor-pointer flex-row items-center gap-2 rounded-lg bg-[#FAFAFA] px-3 py-1 transition-all">
        <span className="animate-pulse text-palette-positive">
          <Icon name="blueCircle" color="currentColor" height="0.5rem" width="0.5rem" />
        </span>
        <div className="flex gap-1 items-center">
          <span className="font-bold text-black font-doto">
            {baseGasPriceInWei ? convertWeiToMwei(baseGasPriceInWei) : <>&mdash;</>}
          </span>
          <span className="text-sm text-base-gray-200">Mwei</span>
        </div>
      </div>
      <div className="hidden absolute right-0 top-full pt-2 lg:group-hover:inline-block">
        <Card
          innerClassName="p-3 border border-base-black bg-white hover:bg-white font-sans text-[0.875rem]"
          radius={9}
        >
          <ul className="flex flex-col gap-2 whitespace-nowrap">
            <li className="flex gap-2">
              <strong className="font-normal">{base.name}</strong>
              <div className="flex gap-1 items-center">
                <span className="font-bold font-doto">
                  {baseGasPriceInWei ? convertWeiToMwei(baseGasPriceInWei) : <>&mdash;</>}
                </span>
                <span className="text-base-gray-200">Mwei</span>
              </div>
            </li>
            <li className="flex gap-2">
              <strong className="font-normal">{mainnet.name}</strong>
              <div className="flex gap-1 items-center">
                <span className="font-bold font-doto">
                  {mainnetGasPriceInWei ? convertWeiToMwei(mainnetGasPriceInWei) : <>&mdash;</>}
                </span>
                <span className="text-base-gray-200">Mwei</span>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

export function DynamicWrappedGasPriceDropdownItem() {
  return (
    <DynamicCryptoProviders>
      <GasPriceDropdownItem />
    </DynamicCryptoProviders>
  );
}

export function GasPriceDropdownItem() {
  const { data: baseGasPriceInWei } = useGasPrice({
    chainId: base.id,
    query: {
      refetchInterval: 10_000,
    },
  });

  return (
    <div className="flex cursor-pointer flex-row items-center gap-2 rounded-lg bg-[#FAFAFA] px-3 py-2 transition-all">
      <span className="animate-pulse text-palette-positive">
        <Icon name="blueCircle" color="currentColor" height="0.5rem" width="0.5rem" />
      </span>
      <div className="flex gap-1 items-center">
        <span className="font-bold text-black font-doto">
          {baseGasPriceInWei ? convertWeiToMwei(baseGasPriceInWei) : <>&mdash;</>}
        </span>
        <span className="text-sm text-base-gray-200">Mwei</span>
      </div>
    </div>
  );
}
