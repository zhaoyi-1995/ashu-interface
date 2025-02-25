const PageNotFoundView = () => {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      {/* 主容器 */}
      <div className="max-w-2xl w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
        {/* 装饰背景元素 */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-purple-100 rounded-full opacity-50"></div>

        {/* 内容区域 */}
        <div className="relative z-10 text-center space-y-8">
          {/* 404 标题 */}
          <div className="space-y-2">
            <h1 className="text-8xl md:text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              404
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* 文字说明 */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">抱歉，页面未找到</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              您访问的页面可能已被移除、删除或暂时无法访问
            </p>
          </div>

          {/* 按钮区域 */}
          <div className="pt-4">
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              返回上页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFoundView;
