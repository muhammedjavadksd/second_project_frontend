/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PUBLIC_IMAGE_URL: "/images"
    },
    images: {
        domains: ['localhost'],
    },
};

export default nextConfig;
