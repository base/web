'use client';

import AnalyticsProvider from 'apps/web/contexts/Analytics';
import RegistrationProvider from 'apps/web/src/components/Basenames/RegistrationContext';

const usernameRegistrationAnalyticContext = 'username_registration';

export default function RegistrationProviders({
  children,
  code,
}: {
  children: React.ReactNode;
  code?: string;
}) {
  return (
    <AnalyticsProvider context={usernameRegistrationAnalyticContext}>
      <RegistrationProvider code={code}>{children}</RegistrationProvider>
    </AnalyticsProvider>
  );
}
