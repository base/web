import Card from '../Card/index.tsx';
import { Icon } from '../Icon/Icon.tsx';
import { base, mainnet } from 'viem/chains';
import { useGasPrice } from 'wagmi';

const convertWeiToMwei = (weiValue: bigint): number => {
  // 1 mwei = 10^6 wei
  const mweiValue = Number(weiValue) / 1_000_000;
  return Number(mweiValue.toFixed(2)); // Round to 2 decimal places
};

export default function GasPriceDropdown() {
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
      <div className="flex flex cursor-pointer items-center gap-2 rounded-xl bg-black px-4 py-3 transition-all group-hover:bg-[#333]">
        <span className="text-palette-positive animate-pulse">
          <Icon name="blueCircle" color="currentColor" height="0.75rem" width="0.75rem" />
        </span>
        <strong>{baseGasPriceInWei ? convertWeiToMwei(baseGasPriceInWei) : <>&mdash;</>}</strong>
        <small>Mgwei</small>
      </div>
      <div className="absolute left-0 top-full hidden pt-2 group-hover:inline-block">
        <Card innerClassName="p-4 bg-[#191919]">
          <ul className="flex flex-col gap-2 whitespace-nowrap">
            <li className="flex gap-2">
              <strong className="font-normal">{base.name}</strong>
              <span className="opacity-50">
                {baseGasPriceInWei ? convertWeiToMwei(baseGasPriceInWei) : <>&mdash;</>}{' '}
                <span>Mgwei</span>
              </span>
            </li>
            <li className="flex gap-2">
              <strong className="font-normal">{mainnet.name}</strong>
              <span className="opacity-50">
                {mainnetGasPriceInWei ? convertWeiToMwei(mainnetGasPriceInWei) : <>&mdash;</>}{' '}
                <span>Mgwei</span>
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
