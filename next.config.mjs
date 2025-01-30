/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["yanolza-s3-bucket.s3.ap-southeast-2.amazonaws.com"], // 이미지 도메인 설정
  },
  typescript: {
    ignoreBuildErrors: true, // 타입스크립트 빌드 에러를 무시
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint 오류를 무시
  },
};

export default nextConfig;
// export default {
//   images: {
//     domains: ["yanolza-s3-bucket.s3.ap-southeast-2.amazonaws.com"],
//   },
// };
