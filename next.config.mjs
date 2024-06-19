/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';

// .env.dev 파일에서 환경 변수 로드
dotenv.config({path: '.env.dev'});

const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER,
    },
};

export default nextConfig;
