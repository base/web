import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { isDevelopment } from 'apps/web/src/constants';
import { Database } from './types';
import { logger } from 'apps/web/src/utils/logger';
import { requireEnv } from 'apps/web/src/utils/env';

function createDefaultPostgresManager() {
  // Only validate when DB is actually used (getDb()).
  const feature = 'Postgres';
  const user = isDevelopment
    ? requireEnv('POSTGRES_USER_DEVELOPMENT', { feature })
    : requireEnv('POSTGRES_USER', { feature });
  const password = isDevelopment
    ? requireEnv('POSTGRES_PASSWORD_DEVELOPMENT', { feature })
    : requireEnv('POSTGRES_PASSWORD', { feature });
  const host = isDevelopment
    ? requireEnv('POSTGRES_HOST_DEVELOPMENT', { feature })
    : requireEnv('POSTGRES_HOST', { feature });
  const dbName = isDevelopment
    ? requireEnv('POSTGRES_DB_NAME_DEVELOPMENT', { feature })
    : requireEnv('POSTGRES_DB_NAME', { feature });
  const connectionString = `postgresql://${user}:${password}@${host}:5432/${dbName}`;
  const poolConfig = isDevelopment
    ? {
        connectionString,
      }
    : {
        connectionString,
        ssl: {
          rejectUnauthorized: false,
        },
      };

  try {
    const pool = new Pool(poolConfig);
    const dialect = new PostgresDialect({ pool });
    return new Kysely<Database>({ dialect });
  } catch (error) {
    if (isDevelopment) {
      console.error('Failed to connect to postgres', error);
    } else {
      logger.error('Failed to connect to postgres', error);
    }
    throw new Error(`Failed to connect to postgres: ${error}`);
  }
}

let db: Kysely<Database> | undefined = undefined;
export function getDb() {
  if (!db) {
    db = createDefaultPostgresManager();
  }
  return db;
}
