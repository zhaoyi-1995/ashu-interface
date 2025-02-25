import { useState } from 'react';

// 定义用户对象的类型
interface User {
  name: string;
  age: number;
  city: string;
}

const State = () => {
  console.log('State更新了')
  // 使用类型初始化 useState
  const [user, setUser] = useState<User>({
    name: 'Alice',
    age: 25,
    city: 'New York',
  });

  // 正确的数据更新方式：使用新对象替换，避免直接修改
  const handleCorrectUpdate = () => {
    setUser({
      ...user, // 展开旧状态，确保不可变性
      name: 'Bob', // 只更新部分属性
      age: 30,
    });
  };

  // 错误的数据更新方式：数据没有发生改变，只是地址变了
  const handleWrongUpdate = () => {
    setUser({ name: 'Alice',
      age: 25,
      city: 'New York',})
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">State 测试，控制台查看打印得消息</h1>
      <p>姓名: {user.name}</p>
      <p>年龄: {user.age}</p>
      <p>城市: {user.city}</p>
      <button
        onClick={handleCorrectUpdate}
        className="mt-4 mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        正确更新
      </button>
      <button
        onClick={handleWrongUpdate}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        错误更新
      </button>
    </div>
  );
};

export default State;
State.whyDidYouRender = true