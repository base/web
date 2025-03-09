import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

type FeedbackType = 'positive' | 'negative' | null;

const positiveCategories = [
  { id: 'clear', label: 'Clear explanation' },
  { id: 'comprehensive', label: 'Comprehensive' },
  { id: 'examples', label: 'Good examples' },
  { id: 'organized', label: 'Well organized' },
  { id: 'helpful', label: 'Solved my problem' }
];

const negativeCategories = [
  { id: 'unclear', label: 'Unclear explanation' },
  { id: 'incomplete', label: 'Missing information' },
  { id: 'outdated', label: 'Outdated content' },
  { id: 'incorrect', label: 'Incorrect information' },
  { id: 'examples-needed', label: 'Needs more examples' }
];

export function FeedbackWidget() {
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [showTextbox, setShowTextbox] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleFeedback = (type: FeedbackType) => {
    if (feedback === type) {
      setFeedback(null);
      setShowTextbox(false);
      setSelectedCategories([]);
    } else {
      setFeedback(type);
      setShowTextbox(true);
      setSelectedCategories([]);
    }
  };

  const handleToggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = () => {
    // TODO: Implement feedback submission logic
    console.log('Feedback:', { 
      type: feedback, 
      categories: selectedCategories,
      comment 
    });
    // Reset the form
    setFeedback(null);
    setShowTextbox(false);
    setComment('');
    setSelectedCategories([]);
  };

  return (
    <div className="mt-8 border-t border-zinc-200 pt-6 w-full dark:border-neutral-700">
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-zinc-900 dark:text-neutral-100">Was this page helpful?</p>
        <div className="flex gap-2">
          {/* Thumbs Up Button */}
          <button
            onClick={() => handleFeedback('positive')}
            className={`p-2 rounded-full transition-all duration-200 border bg-white
              ${feedback === 'positive' 
                ? 'text-green-600 bg-green-50 border-green-500' 
                : 'text-zinc-900 border-zinc-200 hover:bg-green-50 hover:text-green-600 hover:border-green-500'
              } dark:bg-neutral-800 dark:border-neutral-700 
              ${feedback === 'positive'
                ? 'dark:text-green-400 dark:bg-neutral-800/50 dark:border-green-400'
                : 'dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-green-400 dark:hover:border-green-400'
              }`}
            aria-label="Thumbs up"
          >
            <ThumbsUp className="w-5 h-5" />
          </button>

          {/* Thumbs Down Button */}
          <button
            onClick={() => handleFeedback('negative')}
            className={`p-2 rounded-full transition-all duration-200 border bg-white
              ${feedback === 'negative'
                ? 'text-red-600 bg-red-50 border-red-500'
                : 'text-zinc-900 border-zinc-200 hover:bg-red-50 hover:text-red-600 hover:border-red-500'
              } dark:bg-neutral-800 dark:border-neutral-700
              ${feedback === 'negative'
                ? 'dark:text-red-400 dark:bg-neutral-800/50 dark:border-red-400'
                : 'dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-red-400 dark:hover:border-red-400'
              }`}
            aria-label="Thumbs down"
          >
            <ThumbsDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showTextbox && (
        <div className="mt-4 space-y-4">
          {/* Categories */}
          <div className="mb-4">
            <p className="text-sm font-medium text-zinc-900 dark:text-neutral-100 mb-2">
              {feedback === 'positive' 
                ? 'What did you like most?' 
                : 'What could be improved?'}
            </p>
            <div className="flex flex-wrap gap-2">
              {(feedback === 'positive' ? positiveCategories : negativeCategories)
                .map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleToggleCategory(category.id)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 border bg-white
                      ${selectedCategories.includes(category.id)
                        ? feedback === 'positive'
                          ? 'text-green-700 bg-green-50 border-green-300'
                          : 'text-red-700 bg-red-50 border-red-300'
                        : 'text-zinc-900 border-zinc-200 hover:bg-zinc-50'
                      } dark:bg-neutral-800 dark:border-neutral-700
                      ${selectedCategories.includes(category.id)
                        ? feedback === 'positive'
                          ? 'dark:text-green-400 dark:bg-neutral-800/50 dark:border-green-400'
                          : 'dark:text-red-400 dark:bg-neutral-800/50 dark:border-red-400'
                        : 'dark:text-neutral-100 dark:hover:bg-neutral-700'
                      }`}
                  >
                    {category.label}
                  </button>
                ))}
            </div>
          </div>

          {/* Comment Textarea */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={feedback === 'positive'
              ? "Would you like to add more details about what you found helpful?"
              : "Would you like to provide more specific feedback?"}
            className="w-full p-3 text-sm border rounded-md bg-white text-zinc-900 border-zinc-200 placeholder-zinc-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 dark:placeholder-neutral-400"
            rows={3}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors duration-200 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
}