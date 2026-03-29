import { RetryOptions, createDelayFunction } from "./RetryStrategy"

export interface WatchOptions {
  timeout: number
  retryOptions?: RetryOptions
  signal?: AbortSignal
  description?: string
}

export interface ConditionResult<T> {
  value: T
  timestamp: number
  attempts: number
}

export class WatchTimeoutError extends Error {
  constructor(description: string, timeout: number, attempts: number) {
    super(
      `Condition "${description}" timed out after ${timeout}ms (${attempts} attempts)`,
    )
    this.name = "WatchTimeoutError"
  }
}

export class WatchAbortedError extends Error {
  constructor(description: string) {
    super(`Condition "${description}" was aborted`)
    this.name = "WatchAbortedError"
  }
}

/**
 * Observable-like condition watcher for replacing simple polling patterns
 */
export class ConditionWatcher<T> {
  private condition: () => Promise<T | null>
  private options: WatchOptions
  private startTime = 0
  private attempts = 0

  private constructor(
    condition: () => Promise<T | null>,
    options: WatchOptions,
  ) {
    this.condition = condition
    this.options = {
      retryOptions: {
        strategy: "exponential",
        config: {
          baseDelay: 50,
          maxDelay: 1000,
          multiplier: 1.2,
          jitter: true,
          maxAttempts: 50,
        },
      },
      ...options,
    }
  }

  /**
   * Create a new condition watcher
   */
  static watch<T>(
    condition: () => Promise<T | null>,
    options: WatchOptions,
  ): ConditionWatcher<T> {
    return new ConditionWatcher(condition, options)
  }

  /**
   * Wait until the condition returns a non-null value
   */
  async waitUntil(): Promise<ConditionResult<T>> {
    this.startTime = Date.now()
    this.attempts = 0

    const delayFn = createDelayFunction(
      this.options.retryOptions ?? {
        strategy: "exponential",
        config: {
          baseDelay: 50,
          maxDelay: 1000,
          multiplier: 1.2,
          jitter: true,
          maxAttempts: 50,
        },
      },
    )

    while (this.shouldContinue()) {
      this.attempts++

      // Check for abortion
      if (this.options.signal?.aborted) {
        throw new WatchAbortedError(
          this.options.description || "unknown condition",
        )
      }

      try {
        const result = await this.condition()
        if (result !== null) {
          return {
            value: result,
            timestamp: Date.now(),
            attempts: this.attempts,
          }
        }
      } catch (error) {
        // Log error but continue trying unless it's a critical error
        console.warn(
          `Condition check failed on attempt ${this.attempts}:`,
          error,
        )
      }

      // Don't delay after the last attempt or if we're about to timeout
      const maxAttempts = this.options.retryOptions?.config.maxAttempts ?? 50
      if (this.shouldContinue() && this.attempts < maxAttempts) {
        const delay = delayFn(this.attempts - 1)
        await this.sleep(delay)
      }
    }

    throw new WatchTimeoutError(
      this.options.description || "unknown condition",
      this.options.timeout,
      this.attempts,
    )
  }

  /**
   * Wait until the condition returns a value that matches the predicate
   */
  async waitUntilMatches(
    predicate: (value: T) => boolean,
  ): Promise<ConditionResult<T>> {
    const originalCondition = this.condition
    this.condition = async () => {
      const result = await originalCondition()
      if (result !== null && predicate(result)) {
        return result
      }
      return null
    }

    return this.waitUntil()
  }

  /**
   * Transform the watched value before returning
   */
  map<U>(transform: (value: T) => U): ConditionWatcher<U> {
    const originalCondition = this.condition
    const mappedCondition = async () => {
      const result = await originalCondition()
      return result !== null ? transform(result) : null
    }

    return new ConditionWatcher(mappedCondition, this.options)
  }

  /**
   * Add a filter to the condition
   */
  filter(predicate: (value: T) => boolean): ConditionWatcher<T> {
    const originalCondition = this.condition
    const filteredCondition = async () => {
      const result = await originalCondition()
      return result !== null && predicate(result) ? result : null
    }

    return new ConditionWatcher(filteredCondition, this.options)
  }

  /**
   * Add a timeout to the watcher
   */
  timeout(ms: number): ConditionWatcher<T> {
    return new ConditionWatcher(this.condition, {
      ...this.options,
      timeout: ms,
    })
  }

  /**
   * Add retry configuration
   */
  withRetryOptions(retryOptions: RetryOptions): ConditionWatcher<T> {
    return new ConditionWatcher(this.condition, {
      ...this.options,
      retryOptions,
    })
  }

  /**
   * Add a description for better error messages
   */
  describe(description: string): ConditionWatcher<T> {
    return new ConditionWatcher(this.condition, {
      ...this.options,
      description,
    })
  }

  private shouldContinue(): boolean {
    const elapsed = Date.now() - this.startTime
    const withinTimeout = elapsed < this.options.timeout
    const maxAttempts = this.options.retryOptions?.config.maxAttempts ?? 50
    const withinAttempts = this.attempts < maxAttempts

    return withinTimeout && withinAttempts
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Static helper methods for common patterns
   */
  static async waitForCondition<T>(
    condition: () => Promise<T | null>,
    timeout: number,
    description?: string,
  ): Promise<T> {
    const watcher = ConditionWatcher.watch(condition, { timeout, description })
    const result = await watcher.waitUntil()
    return result.value
  }

  static async waitForElement(
    locator: () => Promise<Element | null>,
    timeout = 5000,
  ): Promise<Element> {
    return ConditionWatcher.waitForCondition(
      locator,
      timeout,
      "element to appear",
    )
  }

  static async waitForValue<T>(
    getter: () => Promise<T | null | undefined>,
    timeout = 5000,
    description?: string,
  ): Promise<T> {
    return ConditionWatcher.waitForCondition(
      async () => {
        const value = await getter()
        return value !== null && value !== undefined ? value : null
      },
      timeout,
      description || "value to be available",
    )
  }
}
