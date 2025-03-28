import { Redis, type RedisConfigNodejs } from '@upstash/redis';
import { isDevelopment } from 'apps/web/src/constants';

const DEFAULT_KV_URL = isDevelopment ? process.env.KV_REST_API_URL_DEVELOPMENT : process.env.KV_REST_API_URL;
const DEFAULT_KV_TOKEN = isDevelopment
  ? process.env.KV_REST_API_TOKEN_DEVELOPMENT
  : process.env.KV_REST_API_TOKEN;

function createKv(config: RedisConfigNodejs) {
  if (!config.url) {
    throw new Error('Invalid KV config');
  }
  return new Redis({ cache: 'default', ...config });
}

// Exports a lazy-loaded instance of KVManager with the default KV URL
let kvInstance: Redis | null = null;
export const kv = new Proxy(
  {} as Redis,
  {
    get(_, prop: keyof Redis) {
      if (!kvInstance) {
        kvInstance = createKv({ url: DEFAULT_KV_URL, token: DEFAULT_KV_TOKEN });
      }

      return Reflect.get(kvInstance, prop);
    },
  },
);
