/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';
import process from 'process';

// .env.dev 파일에서 환경 변수 로드
dotenv.config({path: '.env.dev'});

const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
};

export default nextConfig;
