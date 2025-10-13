'use client';

// Dotlottie-react
// Pros: doesn't use eval() like airbnb-lottie does
// Cons: loads a wasm file
import { DotLottieReact, Data } from '@lottiefiles/dotlottie-react';

export default function LottieAnimation({
  data,
  wrapperClassName,
}: {
  data: Data;
  wrapperClassName?: string;
}) {
  return <DotLottieReact data={data} loop autoplay className={wrapperClassName} />;
}
