import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);

  const toggleWalletConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* 左侧文字 Logo */}
      <div className="text-2xl font-bold">
        MyLogo
      </div>

      {/* 中间的路由链接 */}
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/dapp" className="hover:text-gray-400">DApp</Link>
      </div>

      {/* 右侧连接钱包按钮 */}
      <button
        onClick={toggleWalletConnection}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
      >
        {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>
    </header>
  );
};

export default Header;
