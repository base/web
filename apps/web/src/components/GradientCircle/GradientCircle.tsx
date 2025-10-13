type Props = {
  /** @default primary */
  type?: 'primary' | 'secondary';
  className?: string;
};

const PRIMARY_GRADIENT = {
  backgroundImage:
    'conic-gradient(from 90.001deg at 50% 50%, #0052FF 0deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
};
const SECONDARY_GRADIENT = {
  backgroundImage:
    'conic-gradient(from 90.001deg at 50% 50%, #0052FF 0deg, #FFFFFF 105deg, #719EFF 241.88deg, #0052FF 360deg)',
};

export async function GradientCircle({ type = 'primary', className }: Props) {
  const classNameHasWidth = className?.includes('w-');
  const classNameHasHeight = className?.includes('h-');
  return (
    <div
      className={`rounded-full ${!classNameHasWidth ? 'w-[165px]' : ''} ${
        !classNameHasHeight ? 'h-[165px]' : ''
      } ${className ?? ''}`}
      style={type === 'primary' ? PRIMARY_GRADIENT : SECONDARY_GRADIENT}
    />
  );
}
