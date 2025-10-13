import { Dialog, Transition } from '@headlessui/react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { Fragment, PropsWithChildren } from 'react';

export enum ModalSizes {
  Medium = 'medium',
  Large = 'large',
  FlexLarge = 'flex-large',
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  title?: JSX.Element | string;
  titleAlign?: 'left' | 'center' | 'right';
  modalAlign?: 'top' | 'center';
  size?: ModalSizes;
};

export default function Modal({
  children,
  isOpen,
  title,
  onClose,
  onBack,
  titleAlign = 'center',
  modalAlign = 'center',
  size = ModalSizes.Medium,
  ...rest
}: PropsWithChildren<ModalProps>) {
  const mainClasses = classNames('text-3xl text-illoblack w-full font-bold', {
    'text-center': titleAlign === 'center',
    'text-left': titleAlign === 'left',
    'text-right': titleAlign === 'right',
  });

  const dialogWrapperClasses = classNames(
    'items-center fixed inset-0 flex w-screen justify-center md:p-4',
    {
      'items-center': modalAlign === 'center',
      'items-start': modalAlign === 'top',
    },
  );

  const dialogClasses = classNames(
    'md:border-gray-40/20 flex h-screen max-h-screen overflow-y-auto md:h-full w-full flex-col gap-4 md:rounded-3xl md:border bg-white p-6 md:p-10 shadow-lg sm:h-auto ',
    {
      'max-w-lg': size === ModalSizes.Medium,
      'max-w-xl': size === ModalSizes.Large,
    },
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-illoblack/40" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 ">
          <div className={dialogWrapperClasses}>
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-1/4"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95 translate-y-1/4"
            >
              <Dialog.Panel className={dialogClasses} {...rest}>
                <div className="flex">
                  {onBack && (
                    <button
                      type="button"
                      className="mr-auto text-xl text-[#0A0B0D]"
                      onClick={onBack}
                      aria-label="Back"
                    >
                      <Icon name="backArrow" width={14} height={14} color="currentColor" />
                    </button>
                  )}
                  {!!onClose && (
                    <button
                      type="button"
                      className="ml-auto text-xl text-[#0A0B0D]"
                      onClick={onClose}
                      aria-label="Close modal"
                    >
                      <Icon name="close" width={14} height={14} color="currentColor" />
                    </button>
                  )}
                </div>
                <div className="flex flex-1 flex-col place-content-center place-items-center gap-2">
                  {Boolean(title) && (
                    <Dialog.Title as="h2" className={mainClasses}>
                      {title}
                    </Dialog.Title>
                  )}
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
