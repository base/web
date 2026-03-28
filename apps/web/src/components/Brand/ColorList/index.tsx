import Container from 'apps/web/src/components/base-org/Container';
import { Aside } from 'apps/web/src/components/Brand/Aside';
import { CopyButton } from 'apps/web/src/components/CopyButton/CopyButton';
import { RichTextContent } from 'apps/web/src/utils/richTextContent';
import classNames from 'classnames';

type ColorListProps = {
  id?: string;
  prefix?: string;
  title: string;
  description?: string | RichTextContent;
  colors: {
    name: string;
    hex: string;
    cmyk?: { c: number; m: number; y: number; k: number };
    pms?: number | string;
  }[];
};

export default function ColorList({ id, prefix, title, description, colors }: ColorListProps) {
  return (
    <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5" id={id}>
      <Aside prefix={prefix} title={title} description={description} />
      <div
        className={classNames(
          'col-span-full grid aspect-[670/520] overflow-clip rounded-lg md:col-start-4',
          colors.length > 1 && 'grid-cols-4',
        )}
      >
        {colors.map((color) => {
          return (
            <div
              key={color.name}
              className={classNames(
                'relative flex h-full w-full flex-1 flex-col font-mono text-[11px] uppercase leading-[140%] tracking-[0.08em] sm:text-xs md:min-h-[130px] md:text-sm',
                colors.length > 1 && 'gap-2.5 p-2',
                colors.length === 1 && 'gap-4 p-4',
              )}
              style={{
                backgroundColor: color.hex,
                color: getTextColor(color.hex),
              }}
            >
              <CopyButton
                text={color.hex}
                className={classNames(
                  '!absolute hidden opacity-40 md:grid',
                  colors.length > 1 && 'right-4 top-1',
                  colors.length === 1 && 'right-7 top-4',
                  getTextColor(color.hex) === '#000000'
                    ? '[&_svg]:!fill-black group-hover:[&_svg]:!fill-white [&_svg_path]:!fill-black group-hover:[&_svg_path]:!fill-white'
                    : '[&_svg]:!fill-white group-hover:[&_svg]:!fill-black [&_svg_path]:!fill-white group-hover:[&_svg_path]:!fill-black',
                )}
              />
              <span className="">{color.name}</span>
              <span>{color.hex}</span>
              <div className="flex gap-4 md:gap-8">
                <span className="flex flex-col">
                  <span>R {parseInt(color.hex.slice(1, 3), 16)}</span>
                  <span>G {parseInt(color.hex.slice(3, 5), 16)}</span>
                  <span>B {parseInt(color.hex.slice(5, 7), 16)}</span>
                </span>
                {color.pms && (
                  <span className="flex flex-col">
                    <span>PMS</span>
                    <span>{color.pms}</span>
                  </span>
                )}
                {color.cmyk && (
                  <span className="flex flex-col">
                    <span>C {color.cmyk.c}</span>
                    <span>M {color.cmyk.m}</span>
                    <span>Y {color.cmyk.y}</span>
                    <span>K {color.cmyk.k}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

function getTextColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
