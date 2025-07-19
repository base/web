import ColorList from 'apps/web/src/components/Brand/ColorList';

export function ColorColorValuesPantoneCmyk() {
  return (
    <ColorList
      id="color-values-pantone-cmyk"
      title="Color Values → Pantone, CMYK"
      description="Provide Pantone and CMYK for every swatch. Keep values locked. Do not interpolate between shades without brand team approval."
      colors={COLORS}
    />
  );
}

const COLORS = [
  { name: 'Blue', hex: '#0033a0' },
  { name: 'Cerulean', hex: '#0090de' },
  { name: 'Gray 0', hex: '#ffffff' },
  { name: 'Gray 10', hex: '#eef0f3' },
  { name: 'Tan', hex: '#d3bc8d' },
  { name: 'Yellow', hex: '#ffd700' },
  { name: 'Gray 15', hex: '#dee1e7' },
  { name: 'Gray 30', hex: '#b1b7c3' },
  { name: 'Green', hex: '#5bc500' },
  { name: 'Lime Green', hex: '#8edd65' },
  { name: 'Gray 50', hex: '#717886' },
  { name: 'Gray 60', hex: '#5b616e' },
  { name: 'Red', hex: '#ee2737' },
  { name: 'Pink', hex: '#fc9bb3' },
  { name: 'Gray 80', hex: '#32353d' },
  { name: 'Gray 100', hex: '#0a0b0d' },
];
