import ScrollTopButton from 'apps/web/src/components/Brand/ScrollTopButton';

export default async function BaseOrgLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollTopButton />
      <div className="col-span-full flex flex-col">{children}</div>
    </>
  );
}
