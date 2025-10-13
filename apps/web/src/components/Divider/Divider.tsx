type DividerProps = {
  fullWidth?: boolean;
};

export async function Divider({ fullWidth = false }: DividerProps) {
  return (
    <div
      className={`flex h-24 w-full flex-row items-center justify-center bg-black${
        fullWidth ? '' : ' px-6'
      }`}
    >
      <div className="h-[1px] w-full bg-white opacity-40" />
    </div>
  );
}
