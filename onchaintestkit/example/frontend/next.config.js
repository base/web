/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing config options

  experimental: {
    // Existing experimental options
    serverComponentsExternalPackages: [], // Add packages to be bundled by webpack instead of next
  },

  webpack: (config, { isServer }) => {
    // Increase the server file size limit
    if (isServer) {
      config.performance = {
        ...config.performance,
        maxAssetSize: 2 * 1024 * 1024, // 2 MiB
        maxEntrypointSize: 2 * 1024 * 1024, // 2 MiB
      }
    }

    return config
  },
}

module.exports = nextConfig
