import JobsScript from 'apps/web/app/(base-org)/jobs/JobsScript';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { JobType } from 'apps/web/src/components/Jobs/Job';
import JobsList from 'apps/web/src/components/Jobs/JobsList';
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
    <main className="flex w-full grow flex-col items-center pt-20">
      <JobsScript />
      <Container>
        <section className="mb-[140px] flex w-full flex-col pb-10 pt-20 ">
          <Title level={TitleLevel.Display3}>Join our team</Title>
          <div className="flex w-full flex-col font-display text-sm text-white lg:text-xl">
            <JobsList jobs={jobs} />
          </div>
        </section>
      </Container>
    </main>
  );
}
