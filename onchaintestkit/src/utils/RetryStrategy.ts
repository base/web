export interface BackoffConfig {
  baseDelay: number
  maxDelay: number
  multiplier: number
  jitter: boolean
  maxAttempts: number
}

export interface RetryOptions {
  strategy: "exponential" | "linear" | "custom"
  config: BackoffConfig
  onRetry?: (attempt: number, delay: number) => void
}

const DEFAULT_CONFIG: BackoffConfig = {
  baseDelay: 100,
  maxDelay: 5000,
  multiplier: 1.5,
  jitter: true,
  maxAttempts: 10,
}

/**
 * Exponential backoff with optional jitter to prevent thundering herd
 */
export function exponentialBackoff(
  attempt: number,
  config: Partial<BackoffConfig> = {},
): number {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config }
  const { baseDelay, maxDelay, multiplier, jitter } = mergedConfig

  let delay = baseDelay * multiplier ** attempt
  delay = Math.min(delay, maxDelay)

  if (jitter) {
    // Add random jitter of ±25%
    const jitterRange = delay * 0.25
    delay += (Math.random() - 0.5) * 2 * jitterRange
  }

  return Math.max(0, Math.floor(delay))
}

/**
 * Linear backoff with consistent increments
 */
export function linearBackoff(attempt: number, increment: number): number {
  return attempt * increment
}

/**
 * Custom backoff strategy with user-defined function
 */
export function customStrategy(
  attempt: number,
  strategy: (attempt: number, config: BackoffConfig) => number,
  config: Partial<BackoffConfig> = {},
): number {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config }
  return strategy(attempt, mergedConfig)
}

/**
 * Create a delay function based on retry options
 */
export function createDelayFunction(
  options: RetryOptions,
): (attempt: number) => number {
  return (attempt: number) => {
    let delay: number

    switch (options.strategy) {
      case "exponential":
        delay = exponentialBackoff(attempt, options.config)
        break
      case "linear":
        delay = linearBackoff(attempt, options.config.baseDelay)
        break
      case "custom":
        delay = customStrategy(
          attempt,
          () => options.config.baseDelay,
          options.config,
        )
        break
      default:
        delay = exponentialBackoff(attempt, options.config)
    }

    if (options.onRetry) {
      options.onRetry(attempt, delay)
    }

    return delay
  }
}

/**
 * Execute an operation with retry logic
 */
export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  const delayFn = createDelayFunction(options)
  let lastError: Error | null = null

  for (let attempt = 0; attempt < options.config.maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      // Don't delay after the last attempt
      if (attempt < options.config.maxAttempts - 1) {
        const delay = delayFn(attempt)
        await sleep(delay)
      }
    }
  }

  throw new Error(
    `Operation failed after ${options.config.maxAttempts} attempts. Last error: ${lastError?.message}`,
  )
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
