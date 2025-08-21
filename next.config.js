/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 빌드 시 타입 에러를 무시합니다.
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
