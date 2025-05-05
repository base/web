import { TagChip } from 'apps/web/src/components/Ecosystem/TagChip';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useCallback, useState } from 'react';

export default function EcosystemFiltersMobile({
  categories,
  selectedSubcategories,
  onSubcategorySelect,
}: {
  categories: Record<string, string[]>;
  selectedSubcategories: string[];
  onSubcategorySelect: (subcategories: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSubcategorySelect = useCallback(
    (subcategory: string) => {
      if (selectedSubcategories.includes(subcategory)) {
        onSubcategorySelect(selectedSubcategories.filter((sc) => sc !== subcategory));
      } else {
        onSubcategorySelect([...selectedSubcategories, subcategory]);
      }
    },
    [onSubcategorySelect, selectedSubcategories],
  );

  const handleClearFilters = useCallback(() => onSubcategorySelect([]), [onSubcategorySelect]);

  return (
    <div className="mr-auto sm:hidden">
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Open Menu"
        className="h-10 whitespace-nowrap rounded-full border border-white/20 px-4 uppercase tracking-wider text-white/50 transition-colors hover:bg-white/20 hover:text-white"
      >
        Advanced Filters
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black px-[1.75rem] pb-20 pt-5">
          <div className="mb-8 flex h-10 items-end justify-between gap-4">
            {selectedSubcategories.length > 0 ? (
              <TagChip
                tag="Clear filters"
                isSelected={false}
                selectTag={handleClearFilters}
                className="text-xs"
              />
            ) : (
              <div />
            )}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Close Menu"
              className="relative z-20 rounded-xl bg-black px-4 py-2 pr-1"
            >
              <Icon name="close" color="currentColor" height="1rem" width="1rem" />
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {Object.entries(categories).map(([category, subcategories]) => (
              <div key={`${category}-mobile`} className="flex flex-col gap-1 uppercase">
                <div className="font-medium">{category}</div>
                <div className="flex flex-wrap gap-2">
                  {subcategories.map((subcategory) => (
                    <TagChip
                      key={subcategory}
                      tag={subcategory}
                      isSelected={selectedSubcategories.includes(subcategory)}
                      selectTag={handleSubcategorySelect}
                      className="text-xs"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
