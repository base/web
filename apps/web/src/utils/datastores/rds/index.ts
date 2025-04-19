import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { isDevelopment } from 'apps/web/src/constants';
import { Database } from './types';

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

export const db = new Kysely<Database>({ dialect });
