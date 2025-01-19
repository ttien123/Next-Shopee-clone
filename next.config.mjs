/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api-ecom.duthanhduoc.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
