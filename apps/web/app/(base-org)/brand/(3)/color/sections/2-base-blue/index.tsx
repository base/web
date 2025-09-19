import ColorList from 'apps/web/src/components/Brand/ColorList';

export function ColorBaseBlue() {
  return (
    <ColorList
      id="base-blue"
      title="Base Blue"
      description="Base Blue is screen native RGB 0 0 255. In print convert to PMS 286. Base Blue on white (or vice versa) passes AA contrast."
      colors={COLORS}
    />
  );
}

const COLORS = [{ name: 'Blue', hex: '#0000ff', cmyk: { c: 100, m: 72, y: 0, k: 0 }, pms: '286' }];
