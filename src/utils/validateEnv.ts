```ts
const requiredEnvVars = ['NEXT_PUBLIC_API_URL', 'NEXT_PUBLIC_CHAIN_ID'];

export function validateEnv(): void {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
