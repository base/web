import { DropdownContext } from 'apps/web/src/components/Dropdown';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { ReactNode, useCallback, useContext, useEffect, useId, useRef } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export type DropdownItemProps = {
  children: ReactNode;
  copyValue?: string;
  onClick?: () => void;
};

export default function DropdownItem({ children, copyValue, onClick }: DropdownItemProps) {
  const { lastCopiedId, setLastCopiedId, setOpen } = useContext(DropdownContext);
  const id = useId();

  const timer = useRef<NodeJS.Timeout>();

  const dropdownItemClasses = classNames(
    'px-4 py-2 hover:bg-gray-10 max-w-full text-ellipsis truncate w-full text-left',
    {
      'cursor-pointer': onClick,
    },
  );

  const copied = lastCopiedId === id;

  const onCopy = useCallback(() => {
    setLastCopiedId(id);
  }, [id, setLastCopiedId]);

  const onClickHandler = useCallback(() => {
    setOpen(false);
    onClick?.();
  }, [onClick, setOpen]);

  useEffect(() => {
    if (copied) {
      timer.current = setTimeout(() => {
        setLastCopiedId(undefined);
      }, 5000);
    } else {
      clearTimeout(timer.current);
    }

    clearTimeout(timer.current);

    return () => clearTimeout(timer.current);
  }, [copied, setLastCopiedId]);

  return (
    <button type="button" className={dropdownItemClasses} onClick={onClickHandler}>
      {copyValue ? (
        <CopyToClipboard text={copyValue} onCopy={onCopy}>
          <div className="flex w-full cursor-pointer flex-row items-center justify-between gap-4">
            <span className="inline-block w-full truncate">{children}</span>
            <i className={copied ? 'text-green-50' : 'text-gray-50'}>
              <Icon
                name={copied ? 'checkmark' : 'copy'}
                color="currentColor"
                width="1rem"
                height="1rem"
              />
            </i>
          </div>
        </CopyToClipboard>
      ) : (
        <span className="inline-block w-full truncate">{children}</span>
      )}
    </button>
  );
}
