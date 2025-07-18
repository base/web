'use client';

import type { JSX } from 'react';
import { Fragment, useId } from 'react';
import tunnel from 'tunnel-rat';

const WebGLTunnel = tunnel();

const OriginalIn = WebGLTunnel.In;

function WebGLIn({
  id,
  children,
  ...props
}: React.ComponentProps<typeof WebGLTunnel.In> & {
  id?: string | number;
}): JSX.Element {
  const componentId = useId();

  if (typeof id === 'string') {
    return (
      <OriginalIn {...props} key={id}>
        {children}
      </OriginalIn>
    );
  }

  return (
    <OriginalIn {...props}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Fragment key={componentId}> {children as any} </Fragment>
    </OriginalIn>
  );
}

export const WebGlTunnelOut = WebGLTunnel.Out;
export const WebGlTunnelIn = WebGLIn;
