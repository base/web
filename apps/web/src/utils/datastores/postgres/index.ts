import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { isDevelopment } from 'apps/web/src/constants';
import { Database } from './types';
import { logger } from 'apps/web/src/utils/logger';

function createDefaultPostgresManager() {
  const user = isDevelopment ? process.env.POSTGRES_USER_DEVELOPMENT : process.env.POSTGRES_USER;
  const password = isDevelopment ? process.env.POSTGRES_PASSWORD_DEVELOPMENT : process.env.POSTGRES_PASSWORD;
  const host = isDevelopment ? process.env.POSTGRES_HOST_DEVELOPMENT : process.env.POSTGRES_HOST;
  const dbName = isDevelopment ? process.env.POSTGRES_DB_NAME_DEVELOPMENT : process.env.POSTGRES_DB_NAME;
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
