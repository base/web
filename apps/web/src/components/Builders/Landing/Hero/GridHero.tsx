import { GridItem } from 'apps/web/src/components/Builders/Landing/Hero/GridItem';
import classNames from 'classnames';

type GridHeroExportProps = {
  columns?: number;
  hasBlue?: boolean;
  className?: string;
};

export function GridHero({ columns = 20, hasBlue = false, className }: GridHeroExportProps) {
  const gridItems = Array(columns ** 2).fill(null);

  return (
    <div
      className={classNames(
        'relative flex h-full w-full justify-center overflow-hidden bg-dark-palette-backgroundAlternate',
        className,
      )}
    >
      <div
        className="grid aspect-square min-h-[1400px] w-full min-w-[1280px] gap-px p-px"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {gridItems.map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <GridItem hasBlue={hasBlue} key={i} />
        ))}
      </div>
    </div>
  );
}
