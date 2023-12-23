/** @type {import('next').NextConfig} */
const nextConfig = {
    
}

module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://120.110.115.130:5000/:path*",
            },
        ];
    },

    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: "/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                ],
            },
        ];
    },
}