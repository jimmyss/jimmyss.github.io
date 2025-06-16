import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to My Blog
        </h1>
        <div className="prose prose-lg">
          <p className="text-gray-600">
            这里是我分享技术、生活和思考的地方。
          </p>
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">最近文章</h2>
            <div className="grid gap-4">
              {/* 这里后续可以添加文章列表 */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-xl font-medium text-gray-900">示例文章</h3>
                <p className="mt-2 text-gray-600">这是一篇示例文章，稍后会更新实际内容。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
