import ErrorsProvider from 'apps/web/contexts/Errors';
import RenewalFlow from 'apps/web/src/components/Basenames/RenewalFlow';
import { redirectIfNotNameOwner } from 'apps/web/src/utils/redirectIfNotNameOwner';
import { formatDefaultUsername } from 'apps/web/src/utils/usernames';

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const name = params.username.split('.')[0];
  const formattedName = await formatDefaultUsername(name);

  // When the name is unclaimed, the user will be redirected
  // to the /not-found route where they can choose to claim it
  await redirectIfNotNameOwner(formattedName);

  return (
    <ErrorsProvider context="renewal">
      <main>
        <RenewalFlow name={name} />
      </main>
    </ErrorsProvider>
  );
}
