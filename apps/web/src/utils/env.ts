type EnvHelp = {
  /**
   * Human-friendly feature name, e.g. "Cloudinary upload" or "Bugsnag".
   */
  feature?: string;
  /**
   * Where to configure the variable (defaults to apps/web/.env.local).
   */
  configFile?: string;
  /**
   * Example file (defaults to apps/web/.env.local.example).
   */
  exampleFile?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return isNonEmptyString(value) ? value : undefined;
}

export function formatMissingEnvMessage(name: string, help: EnvHelp = {}): string {
  const featurePrefix = help.feature ? `[${help.feature}] ` : '';
  const configFile = help.configFile ?? 'apps/web/.env.local';
  const exampleFile = help.exampleFile ?? 'apps/web/.env.local.example';

  return (
    `${featurePrefix}Missing required environment variable: ${name}\n` +
    `Add it to ${configFile} (you can copy from ${exampleFile}).`
  );
}

export function requireEnv(name: string, help: EnvHelp = {}): string {
  const value = getEnv(name);
  if (value) return value;
  throw new Error(formatMissingEnvMessage(name, help));
}

