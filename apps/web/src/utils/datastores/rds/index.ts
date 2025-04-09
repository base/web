import { createKysely } from '@vercel/postgres-kysely';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { isDevelopment } from 'apps/web/src/constants';
import { Database } from './types';

const poolConfig = isDevelopment
  ? {
      connectionString: process.env.POSTGRES_URL_DEVELOPMENT_CBHQ,
    }
  : {
      connectionString: process.env.POSTGRES_URL_CBHQ,
      ssl: {
        rejectUnauthorized: false,
      },
    };

const pool = new Pool(poolConfig);

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<Database>({ dialect });
export const vercelDb = createKysely<Database>();
