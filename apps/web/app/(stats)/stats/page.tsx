import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Stats`,
  description: 'Live stats for the Base network',
};

export default async function Page() {
  return (
    <iframe
        title="Base Stats"
        src="https://p.datadoghq.com/sb/883862235-507cea11844d0f5a35054427f4de4c38"
        width="100%"
        height="100%"
    />
    );
}
