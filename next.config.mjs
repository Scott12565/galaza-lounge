// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,  // Enable the new app directory
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**", // Matches all Cloudinary images
            },
        ],
    },
};

module.exports = nextConfig;
