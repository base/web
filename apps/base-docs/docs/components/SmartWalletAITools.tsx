import { Link } from 'react-router-dom';
import McpSvg from './svg/McpSvg.tsx';
import LLMsTxtSvg from './svg/LLMsTxtSvg.tsx';
import AgentKitSvgSW from './svg/AgentKitSvgSW.tsx';

export default function SmartWalletAITools() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FrameworkCard
        name="Base Builder MCP"
        href="https://github.com/base/base-builder-mcp"
        icon={<McpSvg />}
      />
      <FrameworkCard
        name="LLMs.txt File"
        href="/identity/smart-wallet/llms.txt"
        icon={<LLMsTxtSvg />}
      />
      <FrameworkCard
        name="Agent Kit"
        href="https://docs.cdp.coinbase.com/agentkit/docs/welcome"
        icon={<AgentKitSvgSW />}
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
      target="_blank"
      rel="noopener noreferrer"
      className="m-2 rounded-md border-2 border-zinc-300 text-zinc-950 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
    >
      <div className="flex flex-col items-center justify-center gap-2 py-10">
        <div className="mb-2 flex h-16 w-16 items-center justify-center text-white dark:text-black">
          {icon}
        </div>
        <span>{name}</span>
      </div>
    </Link>
  );
}
