import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Developers/Stories/Hero';
import { StoryCards } from 'apps/web/src/components/Developers/Stories/StoryCards';

export default function Stories() {
  return (
    <AnalyticsProvider context="stories">
      <Container className="!px-[1.5rem] lg:!px-[2rem]">
        <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
          <Hero />
          <StoryCards />
        </main>
      </Container>
    </AnalyticsProvider>
  );
}
