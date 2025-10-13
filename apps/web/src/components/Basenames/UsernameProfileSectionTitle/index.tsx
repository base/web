import { Icon } from 'apps/web/src/components/Icon/Icon';

type UsernameProfileSectionTitleProps = {
  title: string;
};

export default function UsernameProfileSectionTitle({ title }: UsernameProfileSectionTitleProps) {
  return (
    <h3 className="flex items-baseline text-lg font-medium md:items-center">
      <span className="inline-block align-middle text-blue-600">
        <Icon name="blueCircle" color="currentColor" height="0.75rem" />
      </span>
      <span>{title}</span>
    </h3>
  );
}
