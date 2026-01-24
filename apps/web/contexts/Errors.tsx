// src/contexts/ErrorsProvider.tsx

'use client';

import { datadogRum } from '@datadog/browser-rum';
import { isDevelopment } from 'apps/web/src/constants';
import { logger } from 'apps/web/src/utils/logger';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';

// --- Types & Interfaces ---

/**
 * Defines the shape of the object provided by the ErrorsContext.
 */
export type ErrorsContextProps = {
  /** Function to log an error to the console and external monitoring services (Datadog). */
  logError: (error: unknown, message: string, extraContext?: Record<string, unknown>) => void;
  /** The full, concatenated context string inherited from all parent ErrorsProviders. */
  fullContext: string;
};

/**
 * Defines the props for the ErrorsProvider component.
 */
type ErrorsProviderProps = {
  children?: ReactNode;
  /** A specific context string for the current component/boundary (e.g., 'PaymentForm', 'SideNav'). */
  context: string;
};


// --- Context Initialization ---

// Define the default context values for when the context is accessed outside a Provider.
// It uses a simple no-op function and an empty context string.
const DEFAULT_CONTEXT_VALUE: ErrorsContextProps = {
  logError: () => { /* No operation */ },
  fullContext: '',
};

export const ErrorsContext = createContext<ErrorsContextProps>(DEFAULT_CONTEXT_VALUE);


// --- Custom Hook ---

/**
 * Hook to access the error logging functions and the current execution context.
 * Must be used within an ErrorsProvider component.
 */
export function useErrors(): ErrorsContextProps {
  const context = useContext(ErrorsContext);

  // Throw an error if the context is accessed outside the provider (except when using the default value).
  // This check is standard for hooks accessing required context.
  if (context === DEFAULT_CONTEXT_VALUE) {
    throw new Error('useErrors must be used within an ErrorsProvider.');
  }
  return context;
}


// --- Errors Provider Component ---

/**
 * Provides an error boundary context that automatically nests and concatenates
 * context strings for better error tracing in external monitoring tools.
 */
export default function ErrorsProvider({ children, context }: ErrorsProviderProps) {
  // Use the context directly to get the parent's context without relying on useErrors(),
  // which prevents the crash when this component is the root provider.
  const parentContext = useContext(ErrorsContext);

  // 1. Calculate the full, nested context string.
  // Filters out empty strings and joins the parent's full context with the current context.
  const fullContext = [parentContext.fullContext, context]
    .filter((c) => !!c)
    .join('_');

  // 2. Define the core error logging function using useCallback for stability.
  const logError = useCallback(
    (error: unknown, message: string, extraContext: Record<string, unknown> = {}) => {
      // Merge global and local context for external services
      const finalContext = { fullContext, message, ...extraContext };
      
      if (isDevelopment) {
        // Log verbose details in development mode for easier debugging
        console.log('\n------------------- DEVELOPMENT ERROR CAUGHT -------------------');
        console.info(`Message: "${message}"`);
        console.info(`Full Context: "${fullContext}"`);
        console.error('Error Object:', error);
        console.info('--------------------------------------------------------------\n');
        return;
      }

      // Production Logging: External services (Datadog RUM, Custom Logger)
      
      // Logger (e.g., for server-side logging if logger is configured for transport)
      logger.error(`Error caught: ${message}`, error, finalContext);

      // Datadog RUM logging
      datadogRum.addError(error, finalContext);
    },
    [fullContext], // Dependency array ensures logError updates only when the context string changes
  );

  // 3. Define the values provided by this context provider.
  // The useMemo ensures the 'value' object reference remains stable unless dependencies change,
  // preventing unnecessary re-renders of consuming components.
  const providerValue = useMemo(() => ({
    logError,
    fullContext,
    // Note: The partial 'context' string is not necessary to expose, as 'fullContext' is sufficient.
  }), [logError, fullContext]);

  return (
    <ErrorsContext.Provider value={providerValue}>
      {children}
    </ErrorsContext.Provider>
  );
}
