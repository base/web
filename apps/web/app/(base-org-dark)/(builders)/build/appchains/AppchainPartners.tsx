import Link from 'apps/web/src/components/Link';
import proof from 'apps/web/src/components/Builders/Appchains/proofworks.svg';
import superchamps from 'apps/web/src/components/Builders/Appchains/superchamps.svg';
import blocklords from 'apps/web/src/components/Builders/Appchains/blocklords.svg';
import mvl from 'apps/web/src/components/Builders/Appchains/mvl.svg';
import dcp from 'apps/web/src/components/Builders/Appchains/dcp.svg';
import horizon from 'apps/web/src/components/Builders/Appchains/horizon.svg';
import Image, { StaticImageData } from 'next/image';

import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';

export function AppchainPartners() {
  return (
    <Marquee className="[--duration:20s]" pauseOnHover>
      <Link target="_blank" href="https://www.proof-8.com/" className="flex p-4 px-8">
        <Image src={proof as StaticImageData} alt="proof" />
      </Link>
      <Link target="_blank" href="https://www.superchamps.com/" className="flex p-4 px-8">
        <Image src={superchamps as StaticImageData} alt="superchamps" />
      </Link>
      <Link target="_blank" href="https://blocklords.com/" className="flex p-4 px-8">
        <Image src={blocklords as StaticImageData} alt="blocklords" />
      </Link>
      <Link target="_blank" href="https://decentralized.pictures/" className="flex p-4 px-8">
        <Image src={dcp as StaticImageData} alt="decentralized pictures" />
      </Link>
      <Link target="_blank" href="https://www.horizen.io/" className="flex p-4 px-8">
        <Image src={horizon as StaticImageData} alt="horizen" />
      </Link>
      <Link target="_blank" href="https://mvlchain.io/" className="flex p-4 px-8">
        <Image src={mvl as StaticImageData} alt="mvl" />
      </Link>
    </Marquee>
  );
}
