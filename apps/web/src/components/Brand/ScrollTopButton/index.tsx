'use client';

import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';

export default function ScrollTopButton() {
  return (
    <Button
      variant={ButtonVariants.Primary}
      size={ButtonSizes.Small}
      type="button"
      className="fixed left-[90%] top-[92dvh] z-50 w-fit whitespace-nowrap px-2.5 md:hidden"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <SVGArrowUp className="size-4" />
    </Button>
  );
}

function SVGArrowUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="17"
      height="22"
      viewBox="0 0 17 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.988281 8.86133V12.7002L1.19017 12.9021L7.66504 6.42721L7.66504 21.3059H10.665L10.665 6.42721L16.9883 12.7505V8.50781L9.16504 0.68457L0.988281 8.86133Z"
        fill="white"
      />
    </svg>
  );
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
