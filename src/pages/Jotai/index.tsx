// src/components/JotaiDemo.tsx
import { atom, useAtom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

// 定义用户类型
interface User {
  name: string;
  age: number;
  likes?: string[];
}

// 创建 Atom
const countAtom = atom(0); // 计数器 Atom，初始值为 0
const userAtom = atomWithImmer<User>({ name: 'Alice', age: 25 }); // 用户信息 Atom

const JotaiDemo = () => {
  console.log('jotai更新了');
  // 使用 useAtom 读取和更新 Atom
  const [count, setCount] = useAtom(countAtom);
  const [user, setUser] = useAtom(userAtom);

  // 计数器操作
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const keepVal = () => setCount(prev => prev);

  // 更新用户信息
  const updateUser = () => {
    setUser(draf => {
      draf.name = '阿树';
    });
  };
  const updateUserByObj = () => {
    setUser(draf => {
      draf.name = '阿树';
      draf.likes = ['打篮球'];
    });
  };

  const updateUserByData = () => {
    setUser({ name: '阿树', age: 18 });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Jotai Demo</h1>

      {/* 计数器部分 */}
      <div className="mb-4">
        <h2 className="text-lg">计数器</h2>
        <p>当前计数: {count}</p>
        <button
          onClick={increment}
          className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          增加
        </button>
        <button
          onClick={decrement}
          className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          减少
        </button>
        <button
          onClick={keepVal}
          className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          保持
        </button>
      </div>

      {/* 用户信息部分 */}
      <div className="mb-4">
        <h2 className="text-lg">用户信息</h2>
        <p>姓名: {user.name}</p>
        <p>年龄: {user.age}</p>
        <p>爱好: {user.likes?.join('---')}</p>
        <button
          onClick={updateUser}
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          更新用户信息
        </button>
        <button
          onClick={updateUserByData}
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          数据直接修改
        </button>
        <button
          onClick={updateUserByObj}
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          属性是复杂类型
        </button>
      </div>
    </div>
  );
};

export default JotaiDemo;
JotaiDemo.whyDidYouRender = true;
