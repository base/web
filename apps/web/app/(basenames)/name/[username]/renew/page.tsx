import ErrorsProvider from 'apps/web/contexts/Errors';
import { RenewalBoundary } from 'apps/web/src/components/Basenames/RenewalBoundary';
import RenewalFlow from 'apps/web/src/components/Basenames/RenewalFlow';

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { username } = params;
  const name = username.split('.')[0];

  return (
    <ErrorsProvider context="renewal">
      <RenewalBoundary name={name}>
        <main>
          <RenewalFlow name={name} />
        </main>
      </RenewalBoundary>
    </ErrorsProvider>
  );
}
