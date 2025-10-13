type AnimatedButtonProps = {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  ghost?: boolean;
  halfGhost?: boolean;
};

export default function AnimatedButton({
  text = 'Button',
  backgroundColor = '#0000ff',
  textColor = '#ffffff',
  ghost = false,
  halfGhost = false,
}: AnimatedButtonProps) {
  return (
    <button
      type="button"
      style={{ color: textColor }}
      className="group relative flex h-[2.5rem] w-fit items-center gap-2 overflow-hidden rounded-lg px-3 py-1 font-sans font-normal transition-all duration-200 active:scale-95"
    >
      <div
        style={{ backgroundColor }}
        className={`pointer-events-none absolute inset-0 h-full w-full ${
          ghost ? 'opacity-0' : 'opacity-100'
        } ${
          halfGhost ? 'opacity-50' : 'opacity-100'
        } transition-opacity duration-200 group-hover:opacity-100`}
      />
      <div className="flex overflow-visible z-10 justify-end items-center w-0 h-5 opacity-0 transition-all duration-300 md:w-5 md:opacity-100 md:group-hover:w-0 md:group-hover:opacity-0 md:group-hover:blur-sm">
        <div
          style={{ backgroundColor: textColor }}
          className="h-5 w-5 flex-shrink-0 rounded-[2px]"
        />
      </div>
      <div className="z-10 whitespace-nowrap">{text}</div>
      <div className="flex z-10 justify-start items-center w-5 h-5 opacity-100 blur-none transition-all duration-300 md:w-0 md:opacity-0 md:blur-sm md:group-hover:w-5 md:group-hover:opacity-100 md:group-hover:blur-none">
        <span className="flex-shrink-0"> → </span>
      </div>
    </button>
  );
}
