import type { Token } from '@coinbase/onchainkit/token';
import { type ReactElement, useState } from 'react';

type TokenSelectorContainerProps = {
  children: (token: Token, setToken: (t: Token) => void) => ReactElement;
};

export default function TokenSelectorContainer({ children }: TokenSelectorContainerProps) {
  const [token, setToken] = useState();

  return children(token, setToken);
}
