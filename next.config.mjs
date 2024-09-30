/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     appDir: true,
    // },
    env: {
        PUBLIC_IMAGE_URL: "/images"
    },
    images: {
        domains: ['localhost', 'fund-raiser.s3.amazonaws.com', 'kettocdn.gumlet.io', 'flowbite.com'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)']
};

export default nextConfig;
