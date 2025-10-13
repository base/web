'use client';
import notFoundIllustration from './notFoundIllustration.svg';
import { StaticImageData } from 'next/image';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import { useIsNameAvailable } from 'apps/web/src/hooks/useIsNameAvailable';
import classNames from 'classnames';
import { Icon } from 'libs/base-ui';

const spinnerWrapperClasses = classNames('flex w-full items-center justify-center');

export default function UsernameProfileNotFound() {
  const params = useSearchParams();
  const username = params?.get('name');

  if (!username) {
    redirect(`/names`);
  }
  const strippedUsername = username.replace(/\.base\.eth$/, '');
  const {
    isLoading: isLoadingNameAvailability,
    data: isNameAvailable,
    isFetching,
  } = useIsNameAvailable(strippedUsername);

  if (isFetching && isLoadingNameAvailability) {
    return (
      <div className={spinnerWrapperClasses}>
        <Icon name="spinner" color="black" />
      </div>
    );
  }

  if (!isFetching && !isLoadingNameAvailability && !isNameAvailable) {
    redirect(`/names`);
  }

  const title = `${username ?? 'Name'} is not found`;
  const description = username
    ? "There's no profile associated with this name, but it could be yours!"
    : "This profile doesn't exist";
  const linkHref = username ? `/names?claim=${username}` : `/names`;
  return (
    <div className="flex w-full flex-col items-center gap-8 text-center">
      <ImageWithLoading
        src={notFoundIllustration as StaticImageData}
        alt="404 Illustration"
        wrapperClassName="rounded-3xl"
      />
      <h2 className="break-all text-3xl font-bold	">{title}</h2>
      <p className="text-lg">{description}</p>
      <Link href={linkHref}>
        <Button variant={ButtonVariants.Black} rounded>
          Register name
        </Button>
      </Link>
    </div>
  );
}
