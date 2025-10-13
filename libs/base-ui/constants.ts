export const nodeEnv = process.env.NODE_ENV;
export const docsUrl = process.env.DOCS_URL ?? 'https://docs.base.org';
export const bridgeUrl = process.env.BRIDGE_URL ?? 'https://bridge.base.org';
export const greenhouseApiUrl =
  process.env.GREENHOUSE_HTTPS ?? 'https://boards-api.greenhouse.io/v1';
export const mainnetLaunchBlogPostURL =
  process.env.MAINNET_LAUNCH_BLOG_POST_URL ?? 'https://base.mirror.xyz/';
export const mainnetLaunchFlag = process.env.MAINNET_LAUNCH_FLAG ?? 'false';
export const isDevelopment = nodeEnv === 'development';
export const ampDeploymentKey = isDevelopment
  ? 'client-Wvf63OdaukDZyCBtwgbOvHgGTuASBZFG'
  : 'client-agFoQg5AOvZ2ZiOChny9RrGk21jG3VrH';
