export type Resource = {
  href: string;
  title: string;
  description: string;
  icon?: string;
};

export type ResourceCardProps = Resource & {
  counter?: number;
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  classnames?: string;
};
