module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/feeds',
        permanent: true,
      },
    ]
  },
}
