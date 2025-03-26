import { LucideIcon } from 'lucide-react';

interface FeedbackButtonProps {
  Icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
  variant: 'positive' | 'negative';
  ariaLabel: string;
}

export function FeedbackButton({ 
  Icon, 
  isSelected, 
  onClick, 
  variant, 
  ariaLabel 
}: FeedbackButtonProps) {
  const baseStyles = "p-2 rounded-full transition-all duration-200 border";
  const variantStyles = {
    positive: {
      selected: "text-green-600 bg-green-50 border-green-600",
      hover: "hover:bg-green-50 hover:border-green-600",
    },
    negative: {
      selected: "text-red-600 bg-red-50 border-red-600",
      hover: "hover:bg-red-50 hover:border-red-600",
    },
  };

  const styles = `${baseStyles} ${
    isSelected 
      ? variantStyles[variant].selected 
      : `text-zinc-600 border-zinc-300 ${variantStyles[variant].hover}`
  }`;

  return (
    <button
      onClick={onClick}
      className={styles}
      aria-label={ariaLabel}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}