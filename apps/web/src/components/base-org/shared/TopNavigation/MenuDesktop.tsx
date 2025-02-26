import Card from 'apps/web/src/components/base-org/Card';
import { TopNavigationLink } from 'apps/web/src/components/base-org/shared/TopNavigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import AnimatedIcon from './AnimatedIcon';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Link from 'apps/web/src/components/Link';
import { BuildersDropdown } from 'apps/web/src/components/base-org/shared/TopNavigation/BuildersDropdown';
import { Icon } from 'apps/web/src/components/Icon/Icon';

type MenuDesktopProps = {
  links: TopNavigationLink[];
};

export default function MenuDesktop({ links }: MenuDesktopProps) {
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [subActive, setSubActive] = useState<boolean>(false);

  const subItemsRef = useRef<HTMLDivElement>(null);
  const [subItemsHeight, setSubItemsHeight] = useState<number>(0);

  useEffect(() => {
    if (subActive && subItemsRef.current) {
      setSubItemsHeight(subItemsRef.current.scrollHeight);
    } else {
      setSubItemsHeight(0);
    }
  }, [subActive, hoverIndex]);

  const handleHover = (index: number): void => {
    setHoverIndex(index);
    setSubActive(index > -1);
  };

  const onMouseLeaveNav = useCallback(() => {
    setSubActive(false);

    setTimeout(() => {
      handleHover(-1);
    }, 100);
  }, []);

  const onLinkClick = useCallback(() => {
    setSubActive(false);
    setHoverIndex(-1);
  }, [setSubActive, setHoverIndex]);

  const onMouseEnterNavLink = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget as HTMLAnchorElement;
    const index = parseInt(target.getAttribute('data-index') ?? '0');

    handleHover(index);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center gap-2 rounded-xl p-1"
      onMouseLeave={onMouseLeaveNav}
    >
      <Card innerClassName="bg-[#0C0C0C]" radius={8}>
        <div className="relative flex items-center gap-0 p-1">
          {links.map((link, index) => (
            <Link
              key={`link-${link.name}`.toLocaleLowerCase()}
              data-index={index}
              href={link.href + '?utm_source=dotorg&utm_medium=nav'}
              target={link.href.startsWith('https://') ? '_blank' : undefined}
              onMouseEnter={onMouseEnterNavLink}
              onClick={onLinkClick}
              className={`h-full rounded-md bg-opacity-0 px-6 py-2 text-sm transition-all duration-300 hover:bg-[#32353D] ${
                hoverIndex === index ? ' bg-[#32353D]' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </Card>

      {/* Sub Menu */}
      <div
        ref={subItemsRef}
        className="absolute left-1/2 top-full w-[718px] min-w-full p-1 duration-300 ease-in-out"
        style={{
          height: `${subItemsHeight}px`,
          opacity: subActive ? 1 : 0,
          transform: `translateX(-50%) translateY(${subActive ? 0 : -20}px)`,
        }}
      >
        {links[hoverIndex]?.name === 'Builders' ? (
          <BuildersDropdown onLinkClick={onLinkClick} />
        ) : (
          <Card radius={13} innerClassName="bg-dark-palette-backgroundAlternate">
            <div className="flex w-full items-stretch gap-2 rounded-xl bg-dark-palette-backgroundAlternate p-2">
              {links[hoverIndex]?.subItems && (
                <AnalyticsProvider context={links[hoverIndex].analyticContext}>
                  <div className="flex flex-1 flex-col">
                    {links[hoverIndex].subItems.map((subItem) => (
                      <Link
                        key={`link-${links[hoverIndex].name}-subitem-${subItem.name}`.toLocaleLowerCase()}
                        onClick={onLinkClick}
                        href={
                          subItem.href.includes('#')
                            ? `${subItem.href.split('#')[0]}?utm_source=dotorg&utm_medium=nav#${
                                subItem.href.split('#')[1]
                              }`
                            : `${subItem.href}?utm_source=dotorg&utm_medium=nav`
                        }
                        target={subItem.href.startsWith('https://') ? '_blank' : undefined}
                        className="group/sublink flex items-center justify-between rounded-lg bg-white bg-opacity-0 px-3 py-3 text-sm transition-all duration-300 hover:bg-[#3A3D45]"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium tracking-normal">{subItem.name}</span>
                          {subItem.description && (
                            // use tracking-wide to temporary offset the odd tight letter-spacing
                            <p className="text-dark-palette-foregroundMuted font-normal text-sm tracking-wide"> 
                            {subItem.description}
                            </p>
                          )}
                        </div>
                        <span className="rotate-0 transform opacity-0 transition-all delay-75 duration-300 group-hover/sublink:opacity-60">
                        <Icon name="arrowRight" height={16} width={16} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </AnalyticsProvider>
              )}
              {links[hoverIndex]?.subItems && (
                <div className="min-h-[200px] flex-1 basis-0 overflow-hidden ">
                  {links[hoverIndex]?.name && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-black">
                      {subActive && (
                        <AnimatedIcon key={links[hoverIndex].name} icon={links[hoverIndex].name} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
