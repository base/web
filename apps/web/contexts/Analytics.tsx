'use client';

import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  CCAEventData,
  AnalyticsEventContext,
} from 'libs/base-ui/utils/logEvent';
import { ReactNode, createContext, useCallback, useContext, useMemo } from 'react';

export type AnalyticsContextProps = {
  logEventWithContext: (eventName: string, action: ActionType, eventData?: CCAEventData) => void;
  fullContext: string;
};

export const AnalyticsContext = createContext<AnalyticsContextProps>({
  logEventWithContext: function () {
    return undefined;
  },
  fullContext: '',
});

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

type AnalyticsProviderProps = {
  children?: ReactNode;
  context: string | AnalyticsEventContext;
};

export default function AnalyticsProvider({ children, context }: AnalyticsProviderProps) {
  const { fullContext: previousContext } = useAnalytics();

  const fullContext = [previousContext, context].filter((c) => !!c).join('_');
  const logEventWithContext = useCallback(
    (eventName: string, action: ActionType, eventData?: CCAEventData) => {
      const sanitizedEventName = eventName.toLocaleLowerCase();
      if (typeof window === 'undefined') return;
      logEvent(
        sanitizedEventName,
        {
          action: action,
          context: fullContext,
          page_path: window.location.pathname,
          ...eventData,
        },
        AnalyticsEventImportance.high,
      );
    },
    [fullContext],
  );

  const values = useMemo(() => {
    return { logEventWithContext, context, fullContext };
  }, [context, fullContext, logEventWithContext]);

  return <AnalyticsContext.Provider value={values}>{children}</AnalyticsContext.Provider>;
}
