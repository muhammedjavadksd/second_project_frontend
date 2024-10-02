/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },

                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value:
                            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
    env: {
        PUBLIC_IMAGE_URL: "/images"
    },
    images: {
        domains: ['localhost', 'fund-raiser.s3.amazonaws.com', 'kettocdn.gumlet.io', 'flowbite.com', 'images.unsplash.com'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)']
};

export default nextConfig;
