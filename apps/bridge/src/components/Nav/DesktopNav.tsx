import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion, cubicBezier } from 'framer-motion';
import Link from 'next/link';
import useClickAway from 'base-ui/hooks/useClickAway';
import { Icon } from 'base-ui';
import { REVERSE_COLOR, reverseTextColor } from 'apps/bridge/src/utils/colors';

// Dropdown Link
type DropdownLinkProps = {
  href: string;
  label: string;
  color: 'white' | 'black';
  externalLink?: boolean;
};

function DropdownLink({ href, label, color, externalLink }: DropdownLinkProps) {
  return externalLink ? (
    <a
      href={href}
      className={`flex items-center whitespace-nowrap px-10 py-[1.25rem] font-mono text-xl hover:underline ${reverseTextColor(
        color,
      )}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      {label}
    </a>
  ) : (
    <Link
      href={href}
      className={`whitespace-nowrap px-10 py-[1.25rem] font-mono text-xl hover:underline ${reverseTextColor(
        color,
      )}`}
    >
      {label}
    </Link>
  );
}

// Dropdown
type DropdownProps = {
  label: JSX.Element | string;
  color: 'white' | 'black';
  children: React.ReactElement[];
  className?: string;
};

const dropdownInitial = { opacity: 0, y: 10 };
const dropdownAnimation = { opacity: 1, y: 20 };
const dropdownTransition = { ease: cubicBezier(0.6, 0.0, 1.0, 1.0), duration: 0.2 };

function Dropdown({ label, color, children, className }: DropdownProps) {
  const [showDropdown, toggleDropdown] = useState<boolean>(false);
  const handleHideDropdown = useCallback(() => toggleDropdown(false), []);
  const ref = useClickAway<HTMLDivElement>(handleHideDropdown);

  return (
    <div ref={ref} className={`relative inline-block ${className ?? ''}`}>
      <button
        type="button"
        aria-label={typeof label === 'string' ? label : undefined}
        onClick={useCallback(() => toggleDropdown(!showDropdown), [showDropdown])}
        className={`flex appearance-none items-center font-mono text-xl ${
          showDropdown ? 'underline' : ''
        } ${color === 'black' ? 'text-black' : 'text-white'}`}
      >
        <span className="mr-2">{label}</span>
        <span className={`transition duration-200 ${showDropdown ? 'rotate-180' : ''}`}>
          <Icon name="caret" width="16" height="16" color={color} />
        </span>
      </button>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className={`absolute left-0 top-5 flex flex-col bg-black py-[1.25rem] font-mono text-xl ${
              color === 'black' ? 'bg-[#141519]' : 'bg-white'
            }`}
            initial={dropdownInitial}
            animate={dropdownAnimation}
            exit={dropdownInitial}
            transition={dropdownTransition}
            onClick={handleHideDropdown}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Desktop Nav
type DesktopNavProps = {
  color: 'white' | 'black';
};

function IconLink({
  href,
  icon,
  label,
  color,
  title,
}: {
  href: string;
  icon: string;
  label: string;
  color: 'white' | 'black';
  title: string;
}) {
  return (
    <a href={href} title={title} className="p-4">
      <div className="flex flex-row items-center gap-4">
        <Icon name={icon} width="24" height="24" color={REVERSE_COLOR[color]} />
        <span className={`${reverseTextColor(color)}`}>{label}</span>
      </div>
    </a>
  );
}

function DesktopNav({ color }: DesktopNavProps) {
  return (
    <div className="hidden h-full w-fit flex-grow flex-row items-center justify-between lg:flex">
      <Dropdown label="Ecosystem" color={color}>
        <DropdownLink href="https://base.org/ecosystem" label="Apps" color={color} />
        <DropdownLink
          href="https://paragraph.xyz/@grants.base.eth/calling-based-builders"
          label="Grants"
          color={color}
          externalLink
        />
      </Dropdown>
      <Dropdown label="Developers" color={color}>
        <DropdownLink href="https://docs.base.org" label="Docs" color={color} externalLink />
        <DropdownLink href="https://base.org/learn" label="Learn" color={color} externalLink />
        <DropdownLink
          href="https://base.blockscout.com/"
          label="Block Explorer"
          color={color}
          externalLink
        />
        <DropdownLink href="https://status.base.org" label="Status" color={color} externalLink />
        <DropdownLink
          href="https://hackerone.com/coinbase"
          label="Bug Bounty"
          color={color}
          externalLink
        />
        <DropdownLink
          href="https://github.com/base-org"
          label="GitHub"
          color={color}
          externalLink
        />
      </Dropdown>
      <Dropdown label="About" color={color}>
        <DropdownLink href="https://base.org/about" label="Mission" color={color} />
        <DropdownLink href="https://base.mirror.xyz" label="Blog" color={color} externalLink />
        <DropdownLink href="https://base.org/jobs" label="Jobs" color={color} />
      </Dropdown>
      <Dropdown label="Socials" className="align-text-bottom" color={color}>
        <IconLink
          href="https://warpcast.com/base"
          icon="farcaster"
          label="Farcaster"
          color={color}
          title="Join us on Warpcast"
        />
        <IconLink
          href="https://discord.com/invite/buildonbase"
          icon="discord"
          label="Discord"
          color={color}
          title="Join us on Discord"
        />
        <IconLink
          href="https://twitter.com/base"
          icon="twitter"
          label="Twitter"
          color={color}
          title="Join us on Twitter"
        />
        <IconLink
          href="https://github.com/base-org"
          icon="github"
          label="Github"
          color={color}
          title="Join us on Github"
        />
      </Dropdown>
    </div>
  );
}

export default DesktopNav;
