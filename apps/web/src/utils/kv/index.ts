import Redis, { type Redis as RedisType } from 'ioredis';
import { isDevelopment } from 'apps/web/src/constants';
import { logger } from '../logger';

type KvConstructorParam =
  | { url: string; tls?: boolean }
  | { host: string; port: number; username?: string; password?: string; tls?: boolean };

/**
 * Provides a limited, type-safe interface to Redis operations.
 * Intentionally restricts access to dangerous commands and raw client operations.
 */
export class KVManager {
  private client: RedisType | null = null;

  private readonly connectionArg: KvConstructorParam;

  private readonly connectionTls: boolean;

  constructor(connectionParam: KvConstructorParam) {
    if (!connectionParam || (!('url' in connectionParam) && !('host' in connectionParam))) {
      throw new Error('No URL or options provided to KVManager');
    }
    this.connectionArg = connectionParam;
    this.connectionTls = connectionParam.tls ?? false;
  }

  private async getClient(): Promise<RedisType> {
    if (!this.client) {
      if (!this.connectionArg) {
        throw new Error('No URL or options provided to KVManager');
      }

      if ('url' in this.connectionArg) {
        this.client = new Redis(this.connectionArg.url, this.connectionTls ? { tls: {} } : {});
      } else {
        this.client = new Redis({
          ...this.connectionArg,
          tls: this.connectionTls ? {} : undefined,
        });
      }
    }

    try {
      await this.client.ping();
    } catch (err) {
      if (!isDevelopment) {
        logger.error('KV connection failed', err);
      }
      throw new Error(`Failed to connect to KV: ${err}`);
    }

    return this.client;
  }

  async ping() {
    if (this.client) {
      try {
        return await this.client.ping();
      } catch (err) {
        if (!isDevelopment) {
          logger.error('Failed to scan keys', err);
        }
        throw new Error(`Failed to ping: ${err}`);
      }
    }
  }

  async close() {
    if (this.client) {
      try {
        await this.client.quit();
        this.client = null;
      } catch (err) {
        if (!isDevelopment) {
          logger.error('Failed to close client', err);
        }
        throw new Error(`Failed to close client: ${err}`);
      }
    }
  }

  async scan(cursor: number | string = '0', batchSize: number | string = 10) {
    try {
      const client = await this.getClient();
      const [newCursor, elements] = batchSize
        ? await client.scan(cursor, 'COUNT', batchSize)
        : await client.scan(cursor);

      return { cursor: newCursor, elements };
    } catch (err) {
      if (!isDevelopment) {
        logger.error('Failed to scan keys', err);
      }
      throw new Error(`Failed to scan keys: ${err}`);
    }
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
      throw new Error(`Failed to get key: ${err}`);
    }
  }

  async set<T>(
    key: string,
    value: T,
    options?: {
      ex?: number;
      nx?: boolean;
    },
  ) {
    try {
      const client = await this.getClient();
      const stringifiedValue = JSON.stringify(value);

      if (!options) {
        return await client.set(key, stringifiedValue);
      }
      if (options.ex && options.nx) {
        return await client.set(key, stringifiedValue, 'EX', options.ex, 'NX');
      }
      if (options.nx) {
        return await client.set(key, stringifiedValue, 'NX');
      }
      if (options.ex) {
        return await client.set(key, stringifiedValue, 'EX', options.ex);
      }
    } catch (err) {
      if (!isDevelopment) {
        logger.error('Failed to set key', err);
      }
      throw new Error(`Failed to set key: ${err}`);
    }
  }

  async incr(key: string) {
    try {
      const client = await this.getClient();
      return await client.incr(key);
    } catch (err) {
      if (!isDevelopment) {
        logger.error('Failed to increment key', err);
      }
      throw new Error(`Failed to increment key: ${err}`);
    }
  }
}

function createDefaultKVManager() {
  const url = isDevelopment ? process.env.KV_URL_DEVELOPMENT : process.env.KV_URL;
  if (!url) {
    throw new Error('No KV URL provided');
  }
  return new KVManager({ url, tls: true });
}

// Exports an instance of KVManager with the default KV URL
export const kv = createDefaultKVManager();
