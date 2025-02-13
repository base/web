import { CookieManagerButton } from 'apps/web/src/components/CookieManagerButton';
import bigBaselogo from './assets/bigBaseLogo.svg';
import Image, { StaticImageData } from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Link from 'apps/web/src/components/Link';

export function Footer() {
  return (
    <AnalyticsProvider context="footer">
      <footer className="relative z-20 mx-auto mt-auto flex w-full flex-col justify-center bg-black bg-black pb-8 pt-12 text-white">
        <Container>
          <ul className="flex w-full justify-between gap-2 ">
            <li>
              <Link
                href="https://docs.base.org/terms-of-service"
                className="opacity-100 hover:opacity-70"
              >
                Terms of Service
              </Link>
            </li>

            <li>
              <Link
                href="https://docs.base.org/privacy-policy"
                className="opacity-100 hover:opacity-70"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/cookie-policy" className="opacity-100 hover:opacity-70">
                Cookie Policy
              </Link>
            </li>

            <li>
              <CookieManagerButton />
            </li>
          </ul>
          <Image src={bigBaselogo as StaticImageData} alt="Based" className="mt-20 w-full" />
        </Container>
      </footer>
    </AnalyticsProvider>
  );
}
