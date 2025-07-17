import ColorList from 'apps/web/src/components/Brand/ColorList';

export function ColorColorValuesHexRgb() {
  return (
    <ColorList
      id="color-values-hex-rgb"
      title="Color Values → HEX, RGB"
      description={
        <span className="flex flex-col gap-4">
          <span>
            Provide hex and RGB for every swatch. Keep values locked. Do not interpolate between
            shades without brand team approval.
          </span>
          <span>
            If you need to use the full spectrum of grayscale, refer to the product palette on page
            42.
          </span>
        </span>
      }
      colors={COLORS}
    />
  );
}

const COLORS = [
  { name: 'Blue', hex: '#0000ff' },
  { name: 'Cerulean', hex: '#3c8aff' },
  { name: 'Gray 0', hex: '#ffffff' },
  { name: 'Gray 10', hex: '#eef0f3' },
  { name: 'Tan', hex: '#b8a581' },
  { name: 'Yellow', hex: '#ffd12f' },
  { name: 'Gray 15', hex: '#dee1e7' },
  { name: 'Gray 30', hex: '#b1b7c3' },
  { name: 'Green', hex: '#66c800' },
  { name: 'Lime Green', hex: '#b6f569' },
  { name: 'Gray 50', hex: '#717886' },
  { name: 'Gray 60', hex: '#5b616e' },
  { name: 'Red', hex: '#fc401f' },
  { name: 'Pink', hex: '#fea8cd' },
  { name: 'Gray 80', hex: '#32353d' },
  { name: 'Gray 100', hex: '#0a0b0d' },
];
