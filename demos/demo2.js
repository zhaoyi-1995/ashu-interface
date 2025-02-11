// 定义一个私钥，通常这个私钥用来生成一个钱包（注意：这里私钥不应公开）
const privateKey = "0x15d68996f81805f2747117060aeb2bba332ac6515b3b16f3946dbfa3eefa3310";

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


$(document).on('click', '#ok', () => {
  sweep()
})

// 定义一个名为 sweep 的函数，用于进行以太坊交易
function sweep() {
  // 将钱包（wallet）与提供者（provider）连接，生成一个活跃的钱包对象（activeWallet）
  // 这个钱包对象将用于发送交易到以太坊网络
  const activeWallet = wallet.connect(provider);

  // 获取用户输入的目标地址（目标钱包地址），并通过 ethers.getAddress 确保该地址是有效的以太坊地址
  const targetAddress = ethers.getAddress($('#wallet-send-target-address').val());

  // 获取用户输入的转账金额，并通过 ethers.parseEther 方法将其从以太（ETH）转换为 Wei
  // Wei 是以太坊中的最小单位，1 ETH = 10^18 Wei
  const amountWei = ethers.parseEther($('#wallet-send-amount').val());

  // 使用活跃钱包（activeWallet）发送交易到目标地址
  // sendTransaction 方法的参数包括目标地址（to）和发送的金额（value）
  activeWallet.sendTransaction({
    to: targetAddress,    // 目标地址
    value: amountWei,     // 交易金额，以 Wei 为单位
    // 以下两行被注释掉，说明在此代码中未指定 gas 价格和 gas 限制
    // gasPrice: activeWallet.provider.getGasPrice(),  // 通过提供者获取当前网络的 gas 价格
    // gasLimit: 21000,  // 设定交易的 gas 限制，默认情况下，转账交易通常是 21000 gas
  }).then(
    // 如果交易成功，执行回调函数，输出交易详情，并弹出提示框显示 'success'
    (tx) => {
      console.log(tx);       // 打印交易详情
      alert('success');      // 弹出成功提示
    },
    // 如果发生错误，执行回调函数，打印错误信息，并调用 showError 函数显示错误
    (err) => {
      console.log(err);      // 打印错误详情
      showError(err);        // 调用自定义函数显示错误信息
    }
  );
}

