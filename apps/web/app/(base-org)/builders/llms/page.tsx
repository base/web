import type { Metadata } from 'next';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Container from 'apps/web/src/components/base-org/Container';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFileSync } from 'fs';
import { join } from 'path';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | LLMs`,
  openGraph: {
    title: `Base | LLMs`,
    url: `/builders/llms`,
  },
};

export default function LLMs() {
  const content = readFileSync(
    join(process.cwd(), 'apps/web/app/(base-org)/builders/llms/llms.mdx'),
    'utf-8',
  );

  return (
    <AnalyticsProvider context="llms">
      <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
        <Container className="prose prose-invert max-w-none !px-[1.5rem] lg:!px-[2rem]">
          <MDXRemote source={content} />
        </Container>
      </main>
    </AnalyticsProvider>
  );
}
