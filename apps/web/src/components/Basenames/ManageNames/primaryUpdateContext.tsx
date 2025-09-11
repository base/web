import { createContext, useContext, useMemo, useState } from 'react';

export type PrimaryUpdateContextValue = {
  isUpdatingPrimary: boolean;
  setIsUpdatingPrimary: (value: boolean) => void;
};

const PrimaryUpdateContext = createContext<PrimaryUpdateContextValue | undefined>(undefined);

export function PrimaryUpdateProvider({ children }: { children: React.ReactNode }) {
  const [isUpdatingPrimary, setIsUpdatingPrimary] = useState(false);
  const value = useMemo(() => ({ isUpdatingPrimary, setIsUpdatingPrimary }), [isUpdatingPrimary]);
  return <PrimaryUpdateContext.Provider value={value}>{children}</PrimaryUpdateContext.Provider>;
}

export function usePrimaryUpdate(): PrimaryUpdateContextValue {
  const ctx = useContext(PrimaryUpdateContext);
  if (!ctx) throw new Error('usePrimaryUpdate must be used within PrimaryUpdateProvider');
  return ctx;
}
