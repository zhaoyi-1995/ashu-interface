// 定义一个私钥，通常这个私钥用来生成一个钱包（注意：这里私钥不应公开）
const privateKey = "0x2cedfb9ae18031f98bfc939916e755fbe4c4a6ba6118f7e0ee6789723337bebc";

// 使用私钥创建一个以太坊钱包对象
// ethers.Wallet 是 ethers.js 中的一个类，用于从私钥生成一个钱包
const wallet = new ethers.Wallet(privateKey);

// 创建一个 JSON-RPC 提供者对象，用于与本地的以太坊节点进行交互
// 这里连接的是运行在本地的 Ganache 节点，端口号为 7545
const provider = new ethers.JsonRpcProvider("http://localhost:7545");

// 将钱包对象与提供者连接，生成一个活跃的钱包对象
// 这样，钱包就可以通过 provider 与区块链进行交互
const activeWallet = wallet.connect(provider);

// 获取钱包地址的余额，调用 provider 的 getBalance 方法
// getBalance 方法返回的是指定地址的余额，单位为 Wei（最小单位）
provider.getBalance(activeWallet.address).then((balance) => {
  // 使用 ethers.js 提供的格式化方法，将余额从 Wei 转换为 Ether
  const res = ethers.formatEther(balance);

  // 打印出钱包余额，单位为 ETH
  console.log(res, 'ETH');
});
