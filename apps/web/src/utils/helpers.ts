// Create reusable helper functions
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const retry = async <T>(
  fn: () => Promise<T>, 
  maxAttempts = CONFIG.MAX_RETRIES
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      await sleep(Math.pow(2, i) * 1000); // Exponential backoff
    }
  }
  
  throw lastError;
};
