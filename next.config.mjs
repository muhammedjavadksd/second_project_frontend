/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    env: {
        PUBLIC_IMAGE_URL: "/images"
    },
    images: {
        domains: ['localhost', 'fund-raiser.s3.amazonaws.com', 'kettocdn.gumlet.io'],
    },

    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
