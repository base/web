import { createKysely } from '@vercel/postgres-kysely';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { isDevelopment } from 'apps/web/src/constants';
import { Database } from './types';
import { logger } from 'apps/web/src/utils/logger';

function createDefaultRDSManager() {
  try {
    const poolConfig = isDevelopment
      ? {
          connectionString: process.env.POSTGRES_URL_DEVELOPMENT_CBHQ,
        }
      : {
          connectionString: `postgresql://${process.env.RDS_USER}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOST}:5432/${process.env.RDS_DB_NAME}`,
          ssl: {
            rejectUnauthorized: false,
          },
        };
    const pool = new Pool(poolConfig);
    const dialect = new PostgresDialect({ pool });
    return new Kysely<Database>({ dialect });
  } catch (error) {
    if (isDevelopment) {
      console.error('Failed to connect to RDS', error);
    } else {
      logger.error('Failed to connect to RDS', error);
    }
    // throw new Error(`Failed to connect to RDS: ${error}`);
  }
}

function createVercelRDSManager() {
  try {
    return createKysely<Database>();
  } catch (error) {
    if (isDevelopment) {
      console.error('Failed to connect to Vercel RDS', error);
    } else {
      logger.error('Failed to connect to Vercel Postgres', error);
    }
    // throw new Error(`Failed to connect to Vercel Postgres: ${error}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const db = createDefaultRDSManager()!;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const vercelDb = createVercelRDSManager()!;
