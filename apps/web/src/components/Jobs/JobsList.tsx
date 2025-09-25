import { Job } from 'apps/web/src/components/Jobs/Job';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

type Department = {
  id: string;
  name: string;
  jobs?: JobType[];
};

type DepartmentByIdReduceType = Record<string, { name: string; jobs: JobType[] }>;

export type JobType = {
  id: string;
  title: string;
  location: {
    name: string;
  };
  departments: Department[];
};

export default async function JobsList({ jobs }: { jobs: JobType[] }) {
  const departmentsById = jobs.reduce<DepartmentByIdReduceType>((acc, job) => {
    const name = !job.departments.length ? 'Other' : job.departments[0].name;
    const id = !job.departments.length ? 'no-department' : job.departments[0].id;
    acc[id] = {
      name,
      jobs: !acc[id] ? [job] : [...acc[id].jobs, job],
    };

    return acc;
  }, {} as DepartmentByIdReduceType);

  const departments = Object.entries(departmentsById).map(([id, department]) => ({
    id,
    ...department,
  }));

  return !jobs.length ? (
    <p className="p-1 my-8 text-md">Loading jobs...</p>
  ) : (
    <div className="flex flex-col mt-10 w-full">
      <div className="flex flex-col gap-12">
        {departments.map((department) => (
          <div key={department.id}>
            <Title level={TitleLevel.H4Regular} className="mb-10">
              {department.name === 'Business Development & Partnerships'
                ? 'Ecosystem'
                : department.name}
            </Title>
            <div className="flex flex-col">
              {department.jobs?.map((job) => (
                <Job key={job.id} job={job} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
