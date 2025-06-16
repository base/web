import ErrorsProvider from 'apps/web/contexts/Errors';
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
      <main>
        <RenewalFlow name={name} />
      </main>
    </ErrorsProvider>
  );
}
