interface FeedbackCategory {
  id: string;
  label: string;
}

const positiveCategories: FeedbackCategory[] = [
  { id: 'clear', label: 'Clear explanation' },
  { id: 'comprehensive', label: 'Comprehensive' },
  { id: 'examples', label: 'Good examples' },
  { id: 'organized', label: 'Well organized' },
  { id: 'helpful', label: 'Solved my problem' }
];

const negativeCategories: FeedbackCategory[] = [
  { id: 'unclear', label: 'Unclear explanation' },
  { id: 'incomplete', label: 'Missing information' },
  { id: 'outdated', label: 'Outdated content' },
  { id: 'incorrect', label: 'Incorrect information' },
  { id: 'examples-needed', label: 'Needs more examples' }
];

interface FeedbackCategoriesProps {
  isPositive: boolean;
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
}

export function FeedbackCategories({
  isPositive,
  selectedCategories,
  onToggleCategory
}: FeedbackCategoriesProps) {
  const categories = isPositive ? positiveCategories : negativeCategories;

  return (
    <div className="mb-4">
      <p className="text-sm text-zinc-600 mb-2">
        {isPositive ? 'What did you like most?' : 'What could be improved?'}
      </p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onToggleCategory(category.id)}
            className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 basis-full sm:basis-[calc(50%-0.25rem)] md:basis-[calc(33.333%-0.5rem)] text-left
              ${
                selectedCategories.includes(category.id)
                  ? isPositive
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-red-100 text-red-700 border-red-300'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              } border`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}