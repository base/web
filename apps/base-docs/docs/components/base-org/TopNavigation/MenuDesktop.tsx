import Card from '../Card/index.tsx';
import { TopNavigationLink } from './index.tsx';
import { useState, useRef, useEffect, useCallback } from 'react';
import AnimatedIcon from './AnimatedIcon.tsx';
import Link from '../../Link/index.tsx';

type MenuDesktopProps = {
  links: TopNavigationLink[];
};

export default function MenuDesktop({ links }: MenuDesktopProps) {
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [subActive, setSubActive] = useState<boolean>(false);
  const [glowStyle, setGlowStyle] = useState({
    width: 0,
    height: 0,
    transform: 'translateX(0px)',
  });

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

  const onMouseEnterNavLink = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget as HTMLAnchorElement;
    const index = parseInt(target.getAttribute('data-index') ?? '0');

    const linkRect = target.getBoundingClientRect();

    setGlowStyle({
      width: linkRect.width,
      height: linkRect.height,
      transform: `translateX(${target.offsetLeft - 4}px)`,
    });

    handleHover(index);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center gap-2 rounded-xl p-1"
      onMouseLeave={onMouseLeaveNav}
    >
      <Card innerClassName="py-1 bg-[#0C0C0C]" radius={8}>
        <div className="group relative flex items-center gap-0 p-1">
          {links.map((link, index) => (
            <Link
              key={`link-${link.name}`.toLocaleLowerCase()}
              data-index={index}
              href={link.href + '?utm_source=dotorg&utm_medium=nav'}
              target={link.href.startsWith('https://') ? '_blank' : undefined}
              onMouseEnter={onMouseEnterNavLink}
              className={`rounded-lg bg-opacity-0 px-6 py-1 text-sm opacity-50 transition-all duration-300 hover:bg-opacity-10 hover:opacity-100 ${
                hoverIndex === index ? 'bg-opacity-10 opacity-100' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Animated background */}
          <div
            className={`pointer-events-none absolute h-full rounded-lg bg-white/20 transition-all duration-300 ease-in-out ${
              hoverIndex > -1 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: glowStyle.width,
              transform: glowStyle.transform,
            }}
          />
        </div>
      </Card>

      {/* Sub Menu */}
      <div
        ref={subItemsRef}
        className="absolute top-full w-full p-1 duration-300 ease-in-out"
        style={{
          height: `${subItemsHeight}px`,
          opacity: subActive ? 1 : 0,
          transform: `translateY(${subActive ? 0 : -20}px)`,
        }}
      >
        <Card radius={8} innerClassName="bg-[#191919]">
          <div className="flex w-full items-stretch gap-2 rounded-lg bg-[#191919] p-2">
            {links[hoverIndex]?.subItems && (
              <div className="flex flex-1 flex-col">
                {links[hoverIndex].subItems.map((subItem) => (
                  <Link
                    key={`link-${links[hoverIndex].name}-subitem-${subItem.name}`.toLocaleLowerCase()}
                    href={subItem.href + '?utm_source=dotorg&utm_medium=nav'}
                    target={subItem.href.startsWith('https://') ? '_blank' : undefined}
                    className="group/sublink flex justify-between rounded-lg bg-white bg-opacity-0 px-3 py-2 text-sm transition-all duration-300 hover:bg-opacity-20"
                  >
                    <span>{subItem.name}</span>
                    <span className="rotate-0 transform opacity-0 transition-all delay-75 duration-300 group-hover/sublink:rotate-45 group-hover/sublink:opacity-60">
                      ↗
                    </span>
                  </Link>
                ))}
              </div>
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
      </div>
    </div>
  );
}
