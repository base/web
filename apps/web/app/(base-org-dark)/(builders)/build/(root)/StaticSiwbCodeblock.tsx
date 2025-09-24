export function StaticSiwbCodeblock() {
  return (
    <div className="rounded-[4px] bg-black px-6 py-4 font-mono text-[13px] text-white">
      <span className="text-[#FB9CC6]">import</span>
      {' { SignInWithBase }'} <span className="text-[#FB9CC6]">from</span>{' '}
      <span className="break-word text-[#3F7AFA]">&apos;../components/SignInWithBase&apos;</span>
      <br />
      <br />
      <br />
      <span className="text-[#FB9CC6]">export default function</span>{' '}
      <span className="text-[#5EC423]">Home</span>
      <span>{'() {'}</span>
      <br />
      <span className="pl-4 text-[#FB9CC6]">return</span> <span>(</span>
      <br />
      <div className="pl-8">
        <span>{'<'}</span>
        <span className="text-[#FCCD3E]">main</span>
        <span>{'>'}</span>
      </div>
      <div className="pl-12">
        <span>{'<'}</span>
        <span className="text-[#3F7AFA]">SignInWithBase</span>{' '}
        <div className="inline-flex gap-0">
          <span>/</span>
          <span>{'>'}</span>
        </div>
      </div>
      <div className="pl-8">
        <div className="inline-flex gap-0">
          <span>{'<'}</span>
          <span>/</span>
        </div>
        <span className="text-[#FCCD3E]">main</span>
        <span>{'>'}</span>
      </div>
      <span className="pl-4">)</span>
      <br />
      <span>{'}'}</span>
    </div>
  );
}
