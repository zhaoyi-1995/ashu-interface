// src/components/Header.tsx
import { Link, useLocation } from 'react-router-dom';

const TestHeader = () => {
  const location = useLocation(); // 获取当前路由路径

  // 定义导航项
  const navItems = [
    { path: '/test/immer', label: 'Immer' },
    { path: '/test/state', label: 'State' },
    { path: '/test/jotai', label: 'Jotai' },
  ];

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo 或标题 */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-blue-300">
            My App
          </Link>
        </div>

        {/* 导航链接 */}
        <ul className="flex space-x-6">
          {navItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700 hover:text-blue-300'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default TestHeader;
