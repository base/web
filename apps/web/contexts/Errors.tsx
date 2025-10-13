'use client';

import { datadogRum } from '@datadog/browser-rum';
import { isDevelopment } from 'apps/web/src/constants';
import { logger } from 'apps/web/src/utils/logger';
import { ReactNode, createContext, useCallback, useContext, useMemo } from 'react';

export type ErrorsContextProps = {
  logError: (error: unknown, message: string) => void;
  fullContext: string;
};

export const ErrorsContext = createContext<ErrorsContextProps>({
  logError: function () {
    return undefined;
  },
  fullContext: '',
});

export function useErrors() {
  const context = useContext(ErrorsContext);
  if (context === undefined) {
    throw new Error('useErrors must be used within a ErrorsProvider');
  }
  return context;
}

type ErrorsProviderProps = {
  children?: ReactNode;
  context: string;
};

export default function ErrorsProvider({ children, context }: ErrorsProviderProps) {
  const { fullContext: previousContext } = useErrors();

  const fullContext = [previousContext, context].filter((c) => !!c).join('_');

  const logError = useCallback(
    (error: unknown, message: string) => {
      if (isDevelopment) {
        console.log('\n--------------------------------------');
        console.info(`Error caught with message: "${message}"`);
        console.error(error);
        console.info(`Context: "${fullContext}"`);
        console.log('--------------------------------------\n');
        return;
      } else {
        logger.error(`Error caught with message: "${message}"`, error, {
          context: fullContext,
          message: message,
        });
      }
      datadogRum.addError(error, { context: fullContext, message: message });
    },
    [fullContext],
  );

  const values = useMemo(() => {
    return { logError, context, fullContext };
  }, [context, fullContext, logError]);

  return <ErrorsContext.Provider value={values}>{children}</ErrorsContext.Provider>;
}
