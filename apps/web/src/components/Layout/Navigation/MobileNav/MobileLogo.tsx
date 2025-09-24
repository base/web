import cx from 'classnames';
export default function MobileLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="23"
      height="24"
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cx(props.className, 'text-[#0000FF] dark:text-white')}
    >
      <path
        d="M1.35433 23.24C0.451444 23.24 0 22.7899 0 21.8898V2.08683C0 1.1867 0.451444 0.736633 1.35433 0.736633H21.2178C22.1207 0.736633 22.5722 1.1867 22.5722 2.08683V21.8898C22.5722 22.7899 22.1207 23.24 21.2178 23.24H1.35433Z"
        fill="currentColor"
      />
    </svg>
  );
}
