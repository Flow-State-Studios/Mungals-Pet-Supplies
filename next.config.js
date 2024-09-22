

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'htotwldrtxpyrvtmwecr.supabase.co',
            }
        ]
    }
};

module.exports = nextConfig;
