import { useImmer } from '@/hooks/useImmer';

// 定义用户对象的类型
interface User {
  name: string;
  age: number;
  city: string[];
}

const Immer = () => {
  console.log('immer更新了')
  // 使用类型初始化 useState
  const [user, setUser] = useImmer<User>({
    name: 'Alice',
    age: 25,
    city: ['New York', '1'],
  });

  const handleUpdateByData = () => {
    setUser({
      name: 'Bob', // 只更新部分属性
      age: 30,
      city: ['New York', '1'],
    });
  };
  const handleUpdateByDataMore = () => {
    setUser({
      name: 'Bob', // 只更新部分属性
      age: user.age + 1,
      city: ['New York', '1'],
    });
  };

  const handleUpdateByMethod = () => {
    setUser((userInfo) => {
      userInfo.age = 100
      userInfo.city = ['2', '3', '4']
    })
  };

  const handleUpdateByMethodMore = () => {
    setUser((userInfo) => {
      userInfo.age++
      userInfo.city = ['2', '3', '4']
    })
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Immer 测试，控制台查看打印得消息</h1>
      <p>姓名: {user.name}</p>
      <p>年龄: {user.age}</p>
      <p>城市: {user.city}</p>
      <button
        onClick={handleUpdateByData}
        className="mt-4 mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        数据直接更新
      </button>
      <button
        onClick={handleUpdateByMethod}
        className="mt-4 mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        方法更新
      </button>
      <button
        onClick={handleUpdateByDataMore}
        className="mt-4 mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        数据直接多次更新
      </button>
      <button
        onClick={handleUpdateByMethodMore}
        className="mt-4 mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        方法多次更新
      </button>
    </div>
  );
};

export default Immer;
Immer.whyDidYouRender = true