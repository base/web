'use client';

import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  CCAEventData,
  AnalyticsEventContext,
} from 'libs/base-ui/utils/logEvent'; // Assuming path is correct
import { ReactNode, createContext, useCallback, useContext, useMemo } from 'react';

// --- TYPES ---

export type AnalyticsContextProps = {
  /**
   * Logs an analytics event, automatically attaching the current aggregated context.
   * @param eventName The name of the event (will be sanitized to lower case).
   * @param action The specific action type (e.g., 'click', 'load').
   * @param eventData Optional additional data to include in the event payload.
   */
  logEventWithContext: (eventName: string, action: ActionType, eventData?: CCAEventData) => void;
  /**
   * The fully aggregated context string (e.g., 'page_section_button').
   */
  fullContext: string;
};

// --- CONTEXT ---

// Define the context with a strict default value.
// The default implementation should be a no-op function, as the useAnalytics hook
// ensures that consumers are always wrapped in a Provider.
export const AnalyticsContext = createContext<AnalyticsContextProps>({
  logEventWithContext: () => {}, // No-op function
  fullContext: '',
});

// --- HOOK ---

/**
 * Custom hook to consume the AnalyticsContext.
 * Throws an error if used outside of an AnalyticsProvider.
 * @returns {AnalyticsContextProps} The analytics logging function and the current context string.
 */
export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context.logEventWithContext === AnalyticsContext.Provider.arguments[0].value.logEventWithContext) {
    // Check if the context value is the default value object to ensure strict usage.
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

// --- PROVIDER ---

type AnalyticsProviderProps = {
  children?: ReactNode;
  /** The new context segment to append to the existing context stack. */
  context: string | AnalyticsEventContext;
};

/**
 * Provider component to wrap parts of the application and extend the analytics context string.
 */
export default function AnalyticsProvider({ children, context: newContext }: AnalyticsProviderProps) {
  // CORRECT: Get the context from the nearest parent Provider directly using useContext.
  const { fullContext: previousContext, logEventWithContext: parentLogEvent } = useContext(AnalyticsContext);
  
  // 1. Calculate the new aggregated context string.
  // Filters out empty strings and joins remaining segments with an underscore.
  const fullContext = useMemo(() => {
      return [previousContext, newContext]
        .filter((c) => !!c)
        .join('_');
  }, [previousContext, newContext]);

  // 2. Memoize the function that logs the event using the new, fully aggregated context.
  const logEventWithContext = useCallback(
    (eventName: string, action: ActionType, eventData?: CCAEventData) => {
      const sanitizedEventName = eventName.toLocaleLowerCase();

      // Client-side guard for SSR environments
      if (typeof window === 'undefined') return;

      logEvent(
        sanitizedEventName,
        {
          action: action,
          context: fullContext, // Use the dynamically created full context
          page_path: window.location.pathname,
          ...eventData,
        },
        AnalyticsEventImportance.high,
      );
    },
    [fullContext],
  );

  // 3. Define the value object directly (no need for an outer useMemo since the function is memoized)
  const values: AnalyticsContextProps = { 
    logEventWithContext, 
    fullContext 
  };

  return <AnalyticsContext.Provider value={values}>{children}</AnalyticsContext.Provider>;
}
