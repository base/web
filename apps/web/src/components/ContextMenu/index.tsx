'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Link from 'next/link';
import * as React from 'react';
import { useState, useCallback } from 'react';

export function ContextMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();

    setOpen(true);
  }, []);

  const handleClick = useCallback(() => {
    if (open) {
      setOpen(false);
    }
  }, [open]);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild disabled>
        <div onContextMenu={handleContextMenu}>{children}</div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="fixed left-8 top-2 z-[200] flex h-fit w-fit -translate-x-1/2 flex-col rounded-lg 
      border !border-base-gray-150 bg-base-white p-1 dark:border-base-gray-150 dark:bg-black"
      >
        <DropdownMenu.Item className="group w-full cursor-pointer rounded-[4px] p-2 !text-sm hover:bg-[#fafafa] dark:hover:bg-white/20">
          <Link
            download="/base-square.svg"
            href="/base-square.svg"
            className="flex gap-2 items-center"
            onClick={handleClick}
          >
            <DownloadIcon />
            <Text
              variant={TextVariant.Caption}
              className="flex-1 !whitespace-nowrap !text-sm !leading-none"
            >
              Download icon as <span className="text-base-gray-150">.svg</span>
            </Text>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="group w-full cursor-pointer rounded-[4px] p-2 !text-sm hover:bg-[#fafafa] dark:hover:bg-white/20">
          <Link
            download="/base-logo.svg"
            href="/base-logo.svg"
            className="flex gap-2 items-center"
            onClick={handleClick}
          >
            <DownloadIcon />
            <Text
              variant={TextVariant.Caption}
              className="flex-1 !whitespace-nowrap !text-sm !leading-none"
            >
              Download full logo as <span className="text-base-gray-150">.svg</span>
            </Text>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="my-1 border border-base-gray-50 dark:border-base-gray-200" />
        <DropdownMenu.Item className="group w-full cursor-pointer rounded-[4px] p-2 !text-sm hover:bg-[#fafafa] dark:hover:bg-white/20">
          <Link
            prefetch={false}
            download="/base-brand.zip"
            href="/base-brand.zip"
            className="flex gap-2 items-center"
            onClick={handleClick}
          >
            <FolderIcon className="!fill-base-gray-200" />
            <Text
              variant={TextVariant.Caption}
              className="flex-1 !whitespace-nowrap !text-sm !leading-none"
            >
              Download brand kit as <span className="text-base-gray-150">.zip</span>
            </Text>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="group w-full cursor-pointer rounded-[4px] p-2 !text-sm hover:bg-[#fafafa] dark:hover:bg-white/20">
          <Link
            target="_blank"
            prefetch={false}
            href="https://www.figma.com/community/file/1529530736583775083/base-brand-guidelines-community-kit"
            className="flex gap-2 items-center"
            onClick={handleClick}
          >
            <FolderIcon />
            <Text
              variant={TextVariant.Caption}
              className="flex-1 !whitespace-nowrap !text-sm !leading-none"
            >
              View brand kit as <span className="text-base-gray-150">Figma</span>
            </Text>
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9888 1.49518H7.48877L6.98877 2.49518L1.98877 2.49518V3.69518H10.2888V4.49518H0.48877L1.48877 10.4952H11.4888L11.4888 2.49518L10.9888 1.49518ZM2.47253 9.29518L1.95253 5.69518H9.505L10.025 9.29518H2.47253Z"
        fill="#0A0B0D"
      />
    </svg>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.98877 3.64671L5.38879 6.04673V0.995178H6.58879V6.04658L8.98877 3.64661V5.34366L5.98872 8.34371L2.98877 5.34377V3.64671Z"
        fill="#0A0B0D"
      />
      <path d="M0.98877 9.79518H10.9888V10.9952H0.98877V9.79518Z" fill="#0A0B0D" />
    </svg>
  );
}
