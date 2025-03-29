'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { Experiment, ExperimentClient } from '@amplitude/experiment-js-client';

import { ampDeploymentKey } from '../constants';
import logEvent, { ActionType, AnalyticsEventImportance, ComponentType } from '../utils/logEvent';

declare const window: WindowWithAnalytics;

const ExperimentsContext = createContext<ExperimentsContextProps>({
  experimentClient: null,
  isReady: false,
  getUserVariant: () => '',
});

export default function ExperimentsProvider({ children }: ExperimentsProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [experimentClient, setExperimentClient] = useState<ExperimentClient>();

  useEffect(() => {
    const client = Experiment.initialize(ampDeploymentKey, {
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
        getUser: () => ({
          user_id: window.ClientAnalytics.identity.userId,
          device_id: window.ClientAnalytics.identity.deviceId,
          os: window.ClientAnalytics.identity.device_os,
          language: window.ClientAnalytics.identity.languageCode,
          country: window.ClientAnalytics.identity.countryCode,
        }),
      },
    });

    setExperimentClient(client);
  }, [ampDeploymentKey]);

  const startExperiment = useCallback(async () => {
    if (experimentClient) await experimentClient.start();
  }, [experimentClient]);

  useEffect(() => {
    startExperiment()
      .then(() => {
        setIsReady(true);
      })
      .catch((error) => {
        console.log(`Error starting experiments for ${ampDeploymentKey}:`, error);
      });
  }, [experimentClient, startExperiment]);

  const getUserVariant = useCallback(
    (flagKey: string): string | undefined => {
      if (!isReady) {
        return undefined;
      }
      if (!experimentClient) {
        console.error('No experiment clients found');
        return undefined;
      }
      const variant = experimentClient.variant(flagKey);
      return variant.value;
    },
    [isReady, experimentClient],
  );

  const values = useMemo(() => {
    return { experimentClient, isReady, getUserVariant };
  }, [isReady, getUserVariant]);

  return <ExperimentsContext.Provider value={values}>{children}</ExperimentsContext.Provider>;
}

const useExperiments = () => {
  const context = useContext(ExperimentsContext);
  if (context === undefined) {
    throw new Error('useExperiments must be used within an ExperimentsProvider');
  }
  return context;
};

const useExperiment = (flagKey: string): UseExperimentReturnValue => {
  const { isReady, getUserVariant } = useExperiments();
  const userVariant = useMemo(() => getUserVariant(flagKey), [getUserVariant, flagKey, isReady]);

  return { isReady, userVariant };
};

export { useExperiments, useExperiment };

type WindowWithAnalytics = Window &
  typeof globalThis & {
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
