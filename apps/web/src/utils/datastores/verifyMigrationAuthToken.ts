import { NextApiRequest } from 'next';

export function verifyMigrationAuthToken(req: NextApiRequest) {
  let authToken = req.headers['x-migration-auth-token'];
  if (Array.isArray(authToken)) {
    authToken = authToken[0];
  }

  if (authToken !== process.env.MIGRATION_AUTH_TOKEN) {
    return false;
  }

  return true;
}
