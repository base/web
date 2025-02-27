import { FeedbackCategories } from './FeedbackCategories.tsx';
import { FeedbackFormProps } from './types.ts';

export function FeedbackForm({ 
  comment, 
  onChange, 
  onSubmit, 
  isPositive,
  selectedCategories,
  onToggleCategory
}: FeedbackFormProps) {
  return (
    <div className="space-y-4">
      <FeedbackCategories
        isPositive={isPositive}
        selectedCategories={selectedCategories}
        onToggleCategory={onToggleCategory}
      />
      
      <textarea
        value={comment}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isPositive 
          ? "Would you like to add more details about what you found helpful?" 
          : "Would you like to provide more specific feedback?"}
        className="w-full p-3 text-sm border border-zinc-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
      />
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          className="px-4 py-2 text-sm font-medium text-white bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors duration-200"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}