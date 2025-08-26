import Link from 'next/link';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useCallback, useState } from 'react';

type BannerProps = {
  bgColor?: string;
  textColor?: string;
  message: string;
} & (
  | {
      actionText: string;
      actionUrl: string;
    }
  | {
      actionText?: never;
      actionUrl?: never;
    }
);

export function Banner({
  bgColor = 'bg-yellow-20',
  textColor = 'text-black',
  message,
  actionText,
  actionUrl,
}: BannerProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`flex w-full flex-row justify-center ${bgColor} ${textColor}`}>
      <div
        className={`flex w-full max-w-[1440px] flex-row items-center justify-between self-center ${bgColor} p-2 px-6`}
      >
        <span className="text-xs font-semibold md:text-base">{message}</span>
        <div className="flex flex-row items-center gap-4">
          {actionText && actionUrl && (
            <Link href={actionUrl}>
              <span className="text-xs font-semibold underline md:text-base">{actionText}</span>
            </Link>
          )}
          <button
            className="cursor-pointer p-2 text-xs"
            type="button"
            aria-label="Close banner"
            onClick={handleClose}
          >
            <Icon name="close" color="black" width="16" height="16" />
          </button>
        </div>
      </div>
    </div>
  );
}
