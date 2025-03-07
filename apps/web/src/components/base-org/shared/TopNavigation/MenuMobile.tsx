'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { TopNavigationLink } from 'apps/web/src/components/base-org/shared/TopNavigation';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import logo from './assets/logo.svg';
import Image, { StaticImageData } from 'next/image';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Link from 'apps/web/src/components/Link';

type MenuMobileProps = {
  links: TopNavigationLink[];
};

function MenuMobileButton({
  link,
  activeLinkId,
  linkId,
  toggleLink,
  toggleMenu,
}: {
  link: TopNavigationLink;
  linkId: string;
  toggleLink: (key: string) => void;
  toggleMenu: () => void;
  activeLinkId?: string;
}) {
  const onClickHandler = useCallback(() => toggleLink(linkId), [linkId, toggleLink]);
  const isActive = linkId === activeLinkId;
  const [height, setHeight] = useState<number>(0);
  const subMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const subMenu = subMenuRef.current;
    if (subMenu) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setHeight(entry.contentRect.height);
        }
      });

      resizeObserver.observe(subMenu);

      return () => {
        if (subMenu) {
          resizeObserver.unobserve(subMenu);
        }
      };
    }
  }, []);

  const caretClasses = classNames(
    'inline-block transition-all opacity-50',
    isActive ? 'rotate-0' : '-rotate-90',
  );

  return (
    <AnalyticsProvider context={link.analyticContext}>
      <button
        type="button"
        onClick={onClickHandler}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <Title level={TitleLevel.Display3}>{link.name}</Title>
        <span className={caretClasses}>
          <Icon name="caret" color="currentColor" />
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: isActive ? `${height}px` : '0px' }}
      >
        <ul ref={subMenuRef} className="flex flex-col gap-2">
          {link.subItems?.map((subItem) => (
            <li
              key={`${linkId}-subitem-${subItem.name}`.toLowerCase()}
              className="first:mt-4 last:mb-6"
            >
              <Link
                href={subItem.href + '?utm_source=dotorg&utm_medium=nav'}
                target={subItem.href.startsWith('https://') ? '_blank' : undefined}
                onClick={toggleMenu}
                className="group/sublink inline-block flex w-full items-center justify-between gap-2 rounded-2xl py-2 "
              >
                <Title level={TitleLevel.Title4}>{subItem.name}</Title>
                <span className="pr-1 opacity-50 group-hover/sublink:opacity-100">
                  <Icon name="arrowRight" color="currentColor" height="0.75rem" width="0.75rem" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AnalyticsProvider>
  );
}

export default function MenuMobile({ links }: MenuMobileProps) {
  const [activeLinkId, setActiveLinkId] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleLink = useCallback((linkId: string) => {
    setActiveLinkId((prevLinkId) => (linkId === prevLinkId ? undefined : linkId));
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="mr-auto">
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Open Menu"
        className="relative z-20 rounded-xl bg-black px-4 py-2"
      >
        <Icon name="more-menu" color="currentColor" />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black px-[1.75rem] pb-20 pt-5">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link href="/" className="-ml-3 flex min-h-[2.875rem] min-w-[2.875rem]">
              <Image src={logo as StaticImageData} alt="Base Logo" />
            </Link>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Close Menu"
              className="rounded-xl relative z-20 bg-black px-4 py-2 pr-1"
            >
              <Icon name="close" color="currentColor" height="1rem" width="1rem" />
            </button>
          </div>
          <ul className="flex flex-col gap-6">
            {links.map((link) => {
              const linkId = `link-${link.name}`.toLowerCase();
              return (
                <li key={linkId}>
                  <MenuMobileButton
                    link={link}
                    activeLinkId={activeLinkId}
                    linkId={linkId}
                    toggleLink={toggleLink}
                    toggleMenu={toggleMenu}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
