export const REVERSE_COLOR: Record<'white' | 'black', 'white' | 'black'> = {
  white: 'black',
  black: 'white',
};

export const reverseTextColor = (color: 'white' | 'black') => `text-${REVERSE_COLOR[color]}`;
