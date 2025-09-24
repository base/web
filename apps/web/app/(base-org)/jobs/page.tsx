import JobsScript from 'apps/web/app/(base-org)/jobs/JobsScript';
import ErrorsProvider from 'apps/web/contexts/Errors';
import Container from 'apps/web/src/components/base-org/Container';
import { JobType } from 'apps/web/src/components/Jobs/Job';
import JobsList from 'apps/web/src/components/Jobs/JobsList';
import { Hero } from 'apps/web/src/components/Jobs/Redesign/Hero';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import { greenhouseApiUrl } from 'apps/web/src/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Jobs`,
  openGraph: {
    title: `Base | Jobs`,
    url: `/jobs`,
  },
};

async function getJobs() {
  const res = await fetch(`${greenhouseApiUrl}/boards/basejobs/jobs?content=true`, {
    next: { revalidate: 60 * 30 }, // Revalidate every 30 minutes
  });
  try {
    const { jobs } = (await res.json()) as { jobs: JobType[] };
    return jobs;
  } catch (_error) {
    console.error(_error);
  }
  return [];
}

export default async function Jobs() {
  const jobs = await getJobs();

  return (
    <ErrorsProvider context="base_landing_page">
      <div id="webgl-canvas-jobs" className="overflow-hidden absolute top-0 left-0 w-full h-full">
        <div className="w-full h-full -z-1">
          <WebGLCanvas />
        </div>
      </div>
      <JobsScript />
      <Container className="lg:pt-0">
        <div className="flex flex-col col-span-full gap-12">
          <Hero />
          <JobsList jobs={jobs} />
        </div>
      </Container>
    </ErrorsProvider>
  );
}
