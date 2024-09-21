/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PUBLIC_IMAGE_URL: "/images"
    },
    images: {
        domains: ['localhost', 'fund-raiser.s3.amazonaws.com', 'kettocdn.gumlet.io'],
    },

};

export default nextConfig;
