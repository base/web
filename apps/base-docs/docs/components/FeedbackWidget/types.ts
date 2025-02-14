export type FeedbackType = 'positive' | 'negative' | null;

export interface FeedbackButtonProps {
  Icon: React.ComponentType<{ className?: string }>;
  isSelected: boolean;
  onClick: () => void;
  variant: 'positive' | 'negative';
  ariaLabel: string;
}

export interface FeedbackFormProps {
  comment: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isPositive: boolean;
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
}