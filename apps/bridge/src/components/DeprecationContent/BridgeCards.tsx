import linkIcon from 'apps/bridge/public/images/ui/diagonalUpArrow.svg';
import Image from 'next/image';

import getConfig from 'next/config';
import wonderbridgeLogo from 'apps/bridge/public/images/wonderbridge.png';
import superbridgeLogo from 'apps/bridge/public/images/superbridge.png';
const { publicRuntimeConfig } = getConfig();

const chainId = parseInt(publicRuntimeConfig.l1ChainID) ?? 1;

const superbridgeUrls: Record<number, string> = {
  1: 'https://superbridge.app/base',
  11155111: 'https://testnets.superbridge.app/base-sepolia',
};

const wonderbridgeUrls: Record<number, string> = {
  1: 'https://brid.gg/base?token=ETH',
  11155111: 'https://testnet.brid.gg/base-sepolia?token=ETH',
};

function coinflip<T>(array: [T, T]): [T, T] {
  if (Math.random() < 0.5) {
    return [array[1], array[0]];
  } else {
    return array;
  }
}

const bridges = coinflip([
  {
    name: 'Superbridge',
    url: superbridgeUrls[chainId],
    logo: superbridgeLogo,
    color: '#305FF6',
    team: 'Blob Engineering',
  },
  {
    name: 'Brid.gg',
    url: wonderbridgeUrls[chainId],
    logo: wonderbridgeLogo,
    color: '#0F152A',
    team: 'Bridgg',
  },
]);

function BridgeCard({ name, url, logo, color, team }: (typeof bridges)[0]) {
  return (
    <a
      href={url}
      className={`flex flex-col items-center justify-center rounded-lg bg-${color} group`}
    >
      <div
        className="flex h-60 w-full flex-col items-center justify-center duration-500 group-hover:brightness-150 md:h-80 lg:h-60"
        style={{ backgroundColor: color }}
      >
        <Image src={logo} alt={name} className="mb-4" />
      </div>
      <div className="flex w-full flex-row items-start justify-between bg-gray p-12 group-hover:bg-hover-gray">
        <div className="flex flex-col">
          <h2 className="font-mono text-3xl uppercase">{name}</h2>
          <p className="mt-2 text-xl text-muted">By {team}</p>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image src={linkIcon} alt="Link" className="" />
      </div>
    </a>
  );
}

export default function BridgeCards() {
  return (
    <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
      {bridges.map((bridge) => (
        <BridgeCard key={bridge.name} {...bridge} />
      ))}
    </div>
  );
}
