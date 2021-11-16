const { withSentryConfig } = require('@sentry/nextjs')

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: require('./utils/csp'),
  },
]

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
