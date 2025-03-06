'use client';

import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import NeynarCast from 'apps/web/src/components/NeynarCast';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';

export default function UsernameProfileCasts() {
  const { profileUsername } = useUsernameProfile();

  const { existingTextRecords } = useReadBaseEnsTextRecords({
    username: profileUsername,
  });
  const casts = existingTextRecords.casts.split(',').filter((cast) => !!cast);

  if (casts.length === 0) return null;

  return (
    <section>
      <UsernameProfileSectionTitle title="Pinned casts" />
      <ul className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        {casts.map((cast) => (
          <li key={cast}>
            <NeynarCast identifier={cast} type="url" />
          </li>
        ))}
      </ul>
    </section>
  );
}
