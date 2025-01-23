/** @type {import('next').NextConfig} */
const nextConfig = {
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
