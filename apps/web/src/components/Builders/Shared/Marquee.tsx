import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

export type MarqueeProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Optional CSS class name to apply custom styles to the children
   */
  childrenClassName?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
};

export function Marquee({
  className,
  childrenClassName,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <figure
      {...props}
      className={classNames(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        vertical ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map(() => (
          <div
            key={crypto.randomUUID()}
            className={classNames(
              'flex shrink-0 justify-around [gap:var(--gap)]',
              vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
              {
                'group-hover:[animation-play-state:paused]': pauseOnHover,
                '[animation-direction:reverse]': reverse,
              },
              childrenClassName,
            )}
          >
            {children}
          </div>
        ))}
    </figure>
  );
}
