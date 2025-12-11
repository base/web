import React, { useState, useEffect, useRef, useCallback } from 'react';

import { DEFAULT_ROUTES } from 'apps/web/src/components/Layout/Navigation/navigation';
import VariableContent from 'apps/web/src/components/VariableContent/VariableContent';

// Type for DefaultRouteItem from navigation.ts
type DefaultRouteItem = {
  icon?: string;
  label: string;
  href?: string;
  newTab?: boolean;
  isSubheader?: boolean;
  isDivider?: boolean;
};

// Icon component - simplified React version
interface IconProps {
  icon: string;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ icon, color = '#000000' }) => {
  if (icon === 'base') {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 0H1C0.448333 0 0 0.448333 0 1V19C0 19.5517 0.448333 20 1 20H19C19.5517 20 20 19.5517 20 19V1C20 0.448333 19.5517 0 19 0Z"
          fill={color}
        />
      </svg>
    );
  }
  return null;
};

// Types
interface SubItem {
  name: string;
  url: string;
}

interface Submenu {
  name: string;
  subitems: SubItem[];
}

interface NavItem {
  label: string;
  href: string;
  icon?: string;
  colors: {
    text: string;
    background: string;
  };
  items: Submenu[];
}

interface BaseNavProps {
  showMenu?: boolean;
  items?: NavItem[];
  theme?: 'light' | 'dark';
  onNavigate?: (path: string) => void;
}

const BaseNav: React.FC<BaseNavProps> = ({
  showMenu: initialShowMenu = false,
  items: defaultItems,
  theme: themeProp = 'light',
  onNavigate,
}) => {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '',
  );

  // Update pathname on navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [showMenu, setShowMenu] = useState(initialShowMenu);
  const [currentItem, setCurrentItem] = useState<number>(-1);
  const [subNavHeight, setSubNavHeight] = useState(0);
  const subNavRef = useRef<HTMLDivElement>(null);
  const [theme] = useState(themeProp);

  const routes = DEFAULT_ROUTES;

  const handleHover = useCallback((item: number | null) => {
    setCurrentItem(item ?? -1);
    if (item !== -1) {
      // Use requestAnimationFrame to ensure DOM is updated before measuring
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (subNavRef.current) {
            console.log(subNavRef.current.clientHeight);
            setSubNavHeight(subNavRef.current.clientHeight);
          }
        });
      });
    } else {
      setSubNavHeight(0);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMenu(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Reset hover on navigation
  useEffect(() => {
    handleHover(null);
  }, [currentPath, handleHover]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url && onNavigate) {
      e.preventDefault();
      onNavigate(url);
      setCurrentPath(url);
    }
    // If no onNavigate function, let the browser handle the link normally
  };

  const hasSubmenus =
    currentItem !== null &&
    currentItem >= 0 &&
    routes[currentItem]?.items &&
    routes[currentItem].items.length > 0;
  const backdropBlur = hasSubmenus ? 10 : 0;
  const backdropOpacity = hasSubmenus ? 1 : 0;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          backdropFilter: `blur(${backdropBlur}px)`,
          opacity: backdropOpacity,
        }}
        className="dark:bg-neutral-700/20 pointer-events-none fixed left-0 top-0 z-20 h-full w-full bg-black/10 font-sans transition-all duration-300"
      />

      {/* Main Menu */}
      <div
        className={`menu fixed left-0 top-0 z-[9999] h-fit w-full flex-col px-5 transition-all duration-300 ${
          showMenu ? 'showMenu' : ''
        }`}
        onMouseLeave={() => handleHover(null)}
        onMouseEnter={() => handleHover(currentItem)}
      >
        {/* Background blur */}
        <div
          style={{ backdropFilter: 'blur(10px)' }}
          className="dark:bg-neutral-900/90 pointer-events-none absolute left-0 top-0 -z-10 h-full w-full bg-white/90"
        />

        <div className="z-20 flex w-full items-center justify-center">
          <div className="flex w-full max-w-screen-lg flex-col 2xl:max-w-screen-xl">
            <div className="flex w-full items-center justify-between py-1">
              {/* nav left */}
              <div className="flex w-full items-center justify-start gap-4">
                <a href="/" className="flex h-fit w-[18px] items-center justify-center">
                  <div className={`w-[18px] ${theme === 'dark' ? 'hidden' : 'block'}`}>
                    <Icon icon="base" color="#0000ff" />
                  </div>
                  <div className={`w-[18px] ${theme === 'dark' ? 'block' : 'hidden'}`}>
                    <Icon icon="base" color="#ffffff" />
                  </div>
                </a>
                {routes.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="dark:hover:bg-neutral-800 hidden h-fit w-fit items-center justify-center rounded-md px-2 py-1 hover:bg-black/5 md:flex"
                    onMouseEnter={() => handleHover(index)}
                  >
                    <div className="flex h-fit w-full items-center justify-center">
                      <p className="font-sans text-sm font-normal text-black/80 dark:text-white/80">
                        {item.label}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              {/* nav right */}
              <div className="flex h-fit w-fit flex-shrink-0 items-center justify-center gap-2">
                <a href="#">
                  <div className="dark:bg-neutral-800 00 text-neutral-500 hover:text-neutral-600 hover:bg-neutral-300 flex h-fit w-fit flex-shrink-0 items-center justify-center rounded-md bg-black/15 px-2 py-1 spring-bounce-20 spring-duration-300 active:scale-95 dark:text-white/50 dark:hover:text-white">
                    <div className="flex h-fit w-full items-center justify-center">
                      <p className="font-sans text-sm">Profile</p>
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="dark:bg-neutral-800 flex h-fit w-fit flex-shrink-0 items-center justify-center rounded-md bg-blue-500/15 px-2 py-1 text-blue-500 spring-bounce-20 spring-duration-300 hover:text-blue-600 active:scale-95 dark:text-white/50 dark:hover:text-white"
                >
                  <div className="flex h-fit w-full items-center justify-center">
                    <p className="font-sans text-sm font-medium">Open App</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Subitems */}
        <div
          style={{ height: `${subNavHeight}px` }}
          className="h-0 w-full overflow-hidden spring-bounce-20 spring-duration-200"
        >
          <div
            ref={subNavRef}
            className="mx-auto h-fit w-full max-w-screen-lg px-0 pl-[40px] 2xl:max-w-screen-xl"
          >
            {currentItem !== null &&
              currentItem >= 0 &&
              routes[currentItem]?.items &&
              routes[currentItem].items.length > 0 && (
                <div className="pb-12 pt-6">
                  <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-0">
                      <p className="mb-2 font-sans text-xs font-medium uppercase text-black/80 dark:text-white/80">
                        {routes[currentItem].label}
                      </p>
                      {routes[currentItem].items?.map((submenu: DefaultRouteItem, j: number) => (
                        <div key={`${currentItem}-${j}-${submenu.label}`} className="">
                          {submenu.href && (
                            <a
                              href={submenu.href}
                              onClick={(e) => handleLinkClick(e, submenu.href!)}
                              className="hover:text-neutral-500 flex w-fit items-center justify-center font-sans-text transition-all duration-300"
                              style={{
                                animation: `fadeIn 300ms ease-out ${50 + j * 50}ms both`,
                              }}
                            >
                              <p className="text-lg text-black/80 dark:text-white/80">
                                {submenu.label}
                              </p>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="h-[200px] w-full">
                      <div
                        style={{
                          height: `${subNavHeight - 50}px`,
                        }}
                        className="bg-neutral-200/50 h-0 w-full overflow-hidden rounded-xl spring-bounce-20 spring-duration-300"
                      >
                        <div
                          style={{
                            backgroundColor:
                              defaultItems?.[currentItem]?.colors?.background || '#0000ff',
                          }}
                          className="flex h-full w-full items-center justify-center spring-bounce-20 spring-duration-300"
                        >
                          <VariableContent key={currentItem} duration={300}>
                            <p
                              style={{
                                color: defaultItems?.[currentItem]?.colors?.text || '#ffffff',
                              }}
                              className="rotate-6 text-[350px] font-medium uppercase"
                            >
                              {defaultItems?.[currentItem]?.label || routes[currentItem]?.label}
                            </p>
                          </VariableContent>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      <style>{`
				.menu {
					transform: translateY(-100%);
				}
				.showMenu {
					transform: translateY(0);
				}
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
			`}</style>
    </>
  );
};

export default BaseNav;
