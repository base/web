import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: classNames.ArgumentArray) => twMerge(classnames(...inputs));
