'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { Experiment, ExperimentClient } from '@amplitude/experiment-js-client';

import { ampDeploymentKey } from '../constants';
import logEvent, { ActionType, AnalyticsEventImportance, ComponentType } from '../utils/logEvent';

/**
 * Context definition with strict types
 */
const ExperimentsContext = createContext<ExperimentsContextProps | null>(null);

export default function ExperimentsProvider({ children }: ExperimentsProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const clientRef = useRef<ExperimentClient | null>(null);

  /**
   * Defensive identity extraction to prevent runtime crashes
   */
  const getIdentity = useCallback(() => {
    const identity = typeof window !== 'undefined' ? window.ClientAnalytics?.identity : null;
    return {
      user_id: identity?.userId || undefined,
      device_id: identity?.deviceId || undefined,
      os: identity?.device_os || undefined,
      language: identity?.languageCode || undefined,
      country: identity?.countryCode || undefined,
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Initialize only if not already initialized (Singleton)
    if (!clientRef.current) {
      clientRef.current = Experiment.initialize(ampDeploymentKey, {
        exposureTrackingProvider: {
          track: (exposure) => {
            logEvent(
              `exposure__${exposure.flag_key}`,
              {
                action: ActionType.view,
                componentType: ComponentType.page,
                variant: exposure.variant,
                flag_key: exposure.flag_key,
                experiment_key: exposure.experiment_key,
              },
              AnalyticsEventImportance.high,
            );
          },
        },
        userProvider: {
          getUser: getIdentity,
        },
      });
    }

    // Start the experiment client and handle async lifecycle
    const startClient = async () => {
      try {
        if (clientRef.current) {
          await clientRef.current.start();
          if (isMounted) setIsReady(true);
        }
      } catch (error) {
        console.error(`[Experiments] Initialization failed for ${ampDeploymentKey}:`, error);
      }
    };

    startClient();

    return () => {
      isMounted = false;
    };
  }, [getIdentity]);

  /**
   * Secure variant retrieval with ready-state check
   */
  const getUserVariant = useCallback(
    (flagKey: string): string | undefined => {
      if (!isReady || !clientRef.current) {
        return undefined;
      }
      return clientRef.current.variant(flagKey)?.value;
    },
    [isReady],
  );

  const values = useMemo(() => ({
    experimentClient: clientRef.current,
    isReady,
    getUserVariant
  }), [isReady, getUserVariant]);

  return (
    <ExperimentsContext.Provider value={values}>
      {children}
    </ExperimentsContext.Provider>
  );
}

/**
 * Optimized hooks for consuming experiments
 */
const useExperiments = () => {
  const context = useContext(ExperimentsContext);
  if (!context) {
    throw new Error('useExperiments must be used within an ExperimentsProvider');
  }
  return context;
};

const useExperiment = (flagKey: string): UseExperimentReturnValue => {
  const { isReady, getUserVariant } = useExperiments();
  
  // Memoize variant to prevent unnecessary re-renders in consuming components
  const userVariant = useMemo(() => getUserVariant(flagKey), [getUserVariant, flagKey]);

  return { isReady, userVariant };
};

export { useExperiments, useExperiment };

// --- Types ---

type WindowWithAnalytics = Window & typeof globalThis & {
  ClientAnalytics: {
    identity: {
      userId: string;
      deviceId: string;
      device_os: string;
      languageCode: string;
      countryCode: string;
    };
  };
};

type ExperimentsContextProps = {
  experimentClient: ExperimentClient | null;
  isReady: boolean;
  getUserVariant: (flagKey: string) => string | undefined;
};

type ExperimentsProviderProps = {
  children: ReactNode;
};

type UseExperimentReturnValue = {
  isReady: boolean;
  userVariant: string | undefined;
};
