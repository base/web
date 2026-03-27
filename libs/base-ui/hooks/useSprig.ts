import { useEffect, useState, useMemo } from 'react';

// Define the expected type for the environment ID (string or undefined)
type SprigEnvironmentId = string | undefined;

// The returned Sprig instance (usually an object with track, identify methods, etc.)
// We use 'any' since the exact type of the configured Sprig object is external/complex.
type ConfiguredSprigInstance = any | null; 

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Custom React Hook to lazily load and configure the Sprig analytics/survey module.
 * The module is disabled in development mode and requires a valid environmentId.
 *
 * @param environmentId The Sprig environment ID (required for configuration).
 * @returns The configured Sprig instance (or null if not yet loaded/configured).
 */
export default function useSprig(environmentId: SprigEnvironmentId): ConfiguredSprigInstance {
  const [Sprig, setSprig] = useState<ConfiguredSprigInstance>(null);

  useEffect(() => {
    // 1. Early exit: Disabled during development to avoid noise
    if (isDevelopment) {
      console.info('Sprig module is disabled in development mode.');
      return;
    }

    // 2. Early exit: Check if environment ID is available
    if (!environmentId) {
      console.warn('Sprig configuration failed: environmentId is missing.');
      return;
    }

    const loadSprig = async () => {
      try {
        // Dynamically import the Sprig browser module
        const { sprig } = await import('@sprig-technologies/sprig-browser');
        
        // Configure the Sprig instance with the provided ID
        const sprigInit = sprig.configure({
          environmentId: environmentId,
        });

        // Track the initial page load event
        void sprigInit('track', 'pageload');

        // Set the configured instance in the state
        setSprig(sprigInit);
        console.info('Sprig module successfully loaded and configured.');

      } catch (error) {
        // Handle loading or configuration failure gracefully
        console.error('Failed to load the Sprig module:', error);
      }
    };

    void loadSprig();

  // OPTIMIZATION: Include environmentId in dependencies. 
  // If the ID changes (though unlikely), Sprig will re-initialize.
  // The effect re-runs only when environmentId changes or on initial mount.
  }, [environmentId]); 

  return Sprig;
}
