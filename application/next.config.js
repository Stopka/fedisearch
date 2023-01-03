const config = {
  experimental: {
    appDir: true,
    esmExternals: true
  },
  webpack (config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  async redirects () {
    return [
      {
        source: '/',
        destination: '/feeds',
        permanent: true
      }
    ]
  },
  typescript: {
    tsconfigPath: '../tsconfig.json'
  }
}

export default config
