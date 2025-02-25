const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full animate-spin" />
      <div className="mt-4 text-base text-gray-600 font-sans">正在加载...</div>
    </div>
  );
};

export default Loading;
