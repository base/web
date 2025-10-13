import classNames from 'classnames';
import UsernameProfileNotFound from 'apps/web/src/components/Basenames/UsernameProfileNotFound';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Basenames | Not Found`,
  openGraph: {
    title: `Basenames | Not Found`,
    url: `/not-found`,
  },
};

export default async function UsernameNotFound() {
  const usernameProfilePageClasses = classNames(
    'mx-auto mt-32 flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 px-4 px-4 pb-40 md:flex-row md:px-8',
  );

  return (
    <main className={classNames(usernameProfilePageClasses, 'items-center justify-center')}>
      <Suspense>
        <UsernameProfileNotFound />
      </Suspense>
    </main>
  );
}
