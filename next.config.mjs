/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
             hostname: 's.yimg.com',
             protocol:'https'
        }]
    }
};

export default nextConfig;
