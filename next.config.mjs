/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api-ecom.duthanhduoc.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'down-vn.img.susercontent.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
