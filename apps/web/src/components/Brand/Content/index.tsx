import Container from 'apps/web/src/components/base-org/Container';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Link from 'apps/web/src/components/Link';
import { Aside } from 'apps/web/src/components/Brand/Aside';

export type ContentItem = {
  label: string;
  link: string;
  subitems?: { label: string; link: string }[];
};

export type ContentGroup = {
  items: ContentItem[];
};

export function Content({ groups }: { groups: ContentGroup[] }) {
  return (
    <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5">
      <Aside title="Content" />
      <div className="col-span-full flex flex-1 flex-wrap justify-between gap-8 md:col-span-9 lg:col-span-6">
        {groups.map((group, groupIdx) => (
          <div
            key={group.items.map((item) => item.label).join('-') || groupIdx}
            className="flex min-w-[40vw] flex-1 flex-col gap-4 md:min-w-0"
          >
            {group.items.map((item) => (
              <div key={item.label} className="flex flex-col gap-3 md:gap-4">
                <Text variant={TextVariant.Body} as="span">
                  <Link href={item.link} className="underline">
                    {item.label}
                  </Link>
                </Text>
                {item.subitems?.map((subitem) => (
                  <Text key={subitem.label} variant={TextVariant.Body} as="span">
                    <Link href={subitem.link} className="ml-6 underline">
                      {subitem.label}
                    </Link>
                  </Text>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
}
