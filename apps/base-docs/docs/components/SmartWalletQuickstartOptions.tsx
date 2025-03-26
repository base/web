import { Link } from 'react-router-dom';
import NextjsSvgSW from './svg/NextjsSvgSW.tsx';
import OnchainKitSvgSW from './svg/OnchainKitSvgSW.tsx';
import ReactNativeSvg from './svg/ReactNativeSvg.tsx';
export default function SmartWalletQuickstartOptions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FrameworkCard
        name="Quick Demo (5 mins)"
        href="/identity/smart-wallet/quickstart/quick-demo"
        icon={<OnchainKitSvgSW />}
      />
      <FrameworkCard
        name="Next.js Integration (15 mins)"
        href="/identity/smart-wallet/quickstart/nextjs-project"
        icon={<NextjsSvgSW />}
      />
      <FrameworkCard
        name="React Native Integration"
        href="/identity/smart-wallet/introduction/install-react-native"
        icon={<ReactNativeSvg />}
      />
    </div>
  );
}

type FrameworkProps = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

function FrameworkCard({ name, href, icon }: FrameworkProps) {
  return (
    <Link
      to={href}
      className="m-2 rounded-md border-2 border-zinc-300 text-zinc-950 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
    >
      <div className="flex flex-col items-center gap-2 py-10 ">
        <div className="mb-2 h-10 w-10 text-white dark:text-black">{icon}</div>
        <span>{name}</span>
      </div>
    </Link>
  );
}
