import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import classNames from 'classnames';

export type SuccessAction = {
  label: string;
  onClick: () => void;
  variant?: ButtonVariants;
  isPrimary?: boolean;
};

type SuccessMessageProps = {
  title: string;
  subtitle?: string;
  actions: SuccessAction[];
  className?: string;
  children?: React.ReactNode;
};

export default function SuccessMessage({
  title,
  subtitle,
  actions,
  className,
  children,
}: SuccessMessageProps) {
  return (
    <div
      className={classNames(
        'items-left mx-auto flex w-full max-w-[65rem] flex-col justify-between gap-6 rounded-3xl border border-[#266EFF] bg-blue-600 p-10 shadow-xl transition-all duration-500 md:flex-row md:items-center',
        className,
      )}
    >
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-wider text-white">{title}</h1>
        {subtitle && <p className="mt-2 text-lg text-blue-100 md:text-xl">{subtitle}</p>}
      </div>

      {children}

      <div className="flex flex-col gap-4 md:flex-row">
        {actions.map((action, index) => (
          <Button
            key={index}
            rounded
            fullWidth
            variant={
              action.variant || (action.isPrimary ? ButtonVariants.Black : ButtonVariants.Secondary)
            }
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
