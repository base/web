'use client';

import type { IconName } from './icons';
import { ICONS } from './icons';

export type IconProps = {
  name: IconName;
  color?: 'white' | 'black' | 'currentColor';
  width?: string | number;
  height?: string | number;
};

export default function Icon({
  name,
  color = 'white',
  width = '24',
  height = '24',
}: IconProps) {
  const icon = ICONS[name];
  if (icon) {
    return icon({ color, width, height });
  }
  return null;
}
