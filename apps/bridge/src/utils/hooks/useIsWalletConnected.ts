import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export function useIsWalletConnected(): boolean {
  // This is state because otherwise the app errors with
  // "Hydration failed because the initial UI does not match what was rendered on the server."
  const [isConnected, setIsConnected] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setIsConnected(true);
    }
  }, [address]);

  return isConnected;
}
