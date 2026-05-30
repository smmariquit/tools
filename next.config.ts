import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false, // Wait, if we use next-intl, root redirect might interfere, but as a fallback it's okay. Actually let's just make it true for now if next-intl proxy fails.
      },
    ];
  },
};

export default withNextIntl(nextConfig);
