import { useMemo } from 'react';
import Link from 'apps/web/src/components/Link';
import {
  Button,
  ButtonVariants,
  ButtonSizes,
} from 'apps/web/src/components/Button/Redesign/Button';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';

type Department = {
  id: string;
  name: string;
  jobs?: JobType[];
};

export type JobType = {
  id: string;
  title: string;
  location: {
    name: string;
  };
  departments: Department[];
};

type JobProps = {
  job: JobType;
};

export function Job({ job }: JobProps) {
  const { id, title } = job;

  const href = useMemo(
    () => ({
      pathname: 'https://boards.greenhouse.io/embed/job_app',
      query: { token: id, for: 'basejobs' },
    }),
    [id],
  );

  return (
    <Link
      href={href}
      rel="noopener"
      target="_blank"
      className="inline-block w-full border-t border-base-black bg-white/0 px-2 py-4 transition-all hover:bg-white/20"
    >
      <div className="flex w-full flex-col justify-between sm:flex-row sm:items-center">
        <div className="flex w-full flex-col">
          <Title level={TitleLevel.H6Regular}>{title}</Title>
        </div>

        <Button
          variant={ButtonVariants.Primary}
          size={ButtonSizes.Small}
          className="mt-4 w-[150px] sm:mt-0"
        >
          <p className="text-sm">Apply now</p>
        </Button>
      </div>
    </Link>
  );
}
