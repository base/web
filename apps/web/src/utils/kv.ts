import Redis from 'ioredis';
import { isDevelopment } from 'apps/web/src/constants';
import { logger } from './logger';

/**
 * Pulled directly from `node_modules/@upstash/redis/zmscore-b6b93f14.d.ts`
 * @see https://github.com/upstash/redis-js/blob/81544769cac75d7445f5741778ce8dd66ef39509/pkg/commands/set.ts#L4
 */
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
class KVManager {
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
      if (!isDevelopment) {
        logger.error('KV connection failed', err);
      }
      console.error(err);
      throw err;
    }

    return this.client;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const client = await this.getClient();
      const value = await client.get(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (err) {
      if (!isDevelopment) {
        logger.error('Failed to get key', err);
      }
      console.error(err);
      throw err;
    }
  }

  async set<T>(key: string, value: T, options?: SetCommandOptions) {
    try {
      const client = await this.getClient();
      return await client.set(
        key,
        JSON.stringify(value),
        options as unknown as Parameters<Redis['set']>[2], // options argument must satisfy any of the types
        // of the third parameter of the Redis client's set method
      );
    } catch (err) {
      if (!isDevelopment) {
        logger.error('Failed to set key', err);
      }
      console.error(err);
      throw err;
    }
  }

  async incr(key: string) {
    try {
      const client = await this.getClient();
      const result = await client.incr(key);
      return result;
    } catch (err) {
      if (!isDevelopment) {
        logger.error('Failed to increment key', err);
      }
      console.error(err);
      throw err;
    }
  }
}

export const kv = new KVManager();
