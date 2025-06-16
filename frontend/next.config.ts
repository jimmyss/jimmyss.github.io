/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  basePath: '/jimmyss.github.io',  // 替换为你的仓库名
  images: {
    unoptimized: true,  // 静态导出时需要禁用图片优化
  },
}

export default nextConfig
