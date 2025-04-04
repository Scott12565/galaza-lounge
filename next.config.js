// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
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
