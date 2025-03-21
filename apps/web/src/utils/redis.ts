import Redis from 'ioredis';
import { isDevelopment } from 'apps/web/src/constants';

type SetCommandOptions = {
  get?: boolean;
} & (
  | {
      ex: number;
      px?: never;
      exat?: never;
      pxat?: never;
      keepTtl?: never;
    }
  | {
      ex?: never;
      px: number;
      exat?: never;
      pxat?: never;
      keepTtl?: never;
    }
  | {
      ex?: never;
      px?: never;
      exat: number;
      pxat?: never;
      keepTtl?: never;
    }
  | {
      ex?: never;
      px?: never;
      exat?: never;
      pxat: number;
      keepTtl?: never;
    }
  | {
      ex?: never;
      px?: never;
      exat?: never;
      pxat?: never;
      keepTtl: true;
    }
  | {
      ex?: never;
      px?: never;
      exat?: never;
      pxat?: never;
      keepTtl?: never;
    }
) &
  (
    | {
        nx: true;
        xx?: never;
      }
    | {
        xx: true;
        nx?: never;
      }
    | {
        xx?: never;
        nx?: never;
      }
  );

/**
 * Provides a limited, safe interface to Redis operations.
 * Intentionally restricts access to dangerous commands and raw client operations.
 */
class RedisManager {
  private client: Redis | null = null;

  private async getClient(): Promise<Redis> {
    if (!this.client) {
      this.client = new Redis(
        String(isDevelopment ? process.env.KV_URL_DEVELOPMENT : process.env.REDIS_URL),
      );
    }

    try {
      await this.client.ping();
    } catch (err) {
      console.error('Redis connection failed', err);
      throw err;
    }

    return this.client;
  }

  async get<T>(key: string): Promise<T | null> {
    const client = await this.getClient();
    const value = await client.get(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  async set<T>(key: string, value: T, options?: SetCommandOptions) {
    const client = await this.getClient();
    return client.set(
      key,
      JSON.stringify(value),
      options as unknown as Parameters<Redis['set']>[2], // options argument must satisfy any of the types
      // of the third parameter of the Redis client's set method
    );
  }
}

export const redis = new RedisManager();
