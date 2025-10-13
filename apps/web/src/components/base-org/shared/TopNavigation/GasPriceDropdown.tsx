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
    <div className="group relative hidden md:block">
      <div className="flex flex-row cursor-pointer items-center gap-2 rounded-xl bg-black px-4 py-3 transition-all group-hover:bg-[#333]">
        <span className="animate-pulse text-palette-positive">
          <Icon name="blueCircle" color="currentColor" height="0.75rem" width="0.75rem" />
        </span>
        <strong>{baseGasPriceInWei ? convertWeiToMwei(baseGasPriceInWei) : <>&mdash;</>}</strong>
        <small>Mwei</small>
      </div>
      <div className="absolute left-0 top-full hidden pt-2 group-hover:inline-block">
        <Card innerClassName="p-4 bg-dark-palette-backgroundAlternate">
          <ul className="flex flex-col gap-2 whitespace-nowrap">
            <li className="flex gap-2">
              <strong className="font-normal">{base.name}</strong>
              <span className="opacity-50">
                {baseGasPriceInWei ? convertWeiToMwei(baseGasPriceInWei) : <>&mdash;</>}{' '}
                <span>Mwei</span>
              </span>
            </li>
            <li className="flex gap-2">
              <strong className="font-normal">{mainnet.name}</strong>
              <span className="opacity-50">
                {mainnetGasPriceInWei ? convertWeiToMwei(mainnetGasPriceInWei) : <>&mdash;</>}{' '}
                <span>Mwei</span>
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
