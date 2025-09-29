import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import CharacterSetSVG from './character-set.svg';

const svg = CharacterSetSVG as SvgImport;

const image = [
  {
    src: svg.src,
    alt: 'Character Set',
    width: svg.width,
    height: svg.height,
  },
];

export function CharacterSet() {
  return (
    <ImageComponent
      id="primary-typeface-character-set"
      prefix="Primary Typeface"
      title="Character Set"
      description="Base Sans contains a complete extended Latin set: uppercase, lowercase, numerals, punctuation, and dedicated crypto symbols. Tabular figures align in data columns, diacritics are harmonized to the x‑height, and ligatures are off by default for code clarity. The font ships many language presets so global products render consistently. Reference this chart before subsetting for web to keep load times tight while preserving essential glyphs."
      images={image}
    />
  );
}
