// /** @type {import('next').NextConfig} */
const nextConfig = {};
// next.config.mjs

export default {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5000/api/:path*', // Proxy to Backend
            },
            {
                source: '/:path*',
                destination: 'http://localhost:5000/:path*', // Proxy to Backend Images
            },

        ];
    },
    images: {
        domains: ['localhost'], // Thay thế bằng domain của bạn nếu khác
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'paddy.vn',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.shopify.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

// export default nextConfig;
