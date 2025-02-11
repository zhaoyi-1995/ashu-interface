
  // 创建一个provider,提供给浏览器使用
  const provider = new ethers.BrowserProvider(window.ethereum);
  console.log(provider)

  // 定义一个签名，每一步操作都需要有这个签名
  let signer = '';

  // 点击按钮获取连接钱包
  $(document).on('click', '#wallet', async() => {
    // 强行唤起钱包
    await provider.send('eth_requestAccounts', []);
    console.log(provider)
    // 获取签名
    signer = await provider.getSigner();
    // 获取钱包地址
    const address = await signer.getAddress();
    $('#address').html(address);
    // 获取钱包余额
    // getBalance 方法获取指定地址的余额。
    // 这里传入 'pending' 作为第二个参数，表示获取钱包的待处理（pending）余额，通常在交易还未完成时，可能会显示该余额。
    // 如果不传该参数，会默认获取当前账户的实际余额。
    let pendingBal = await provider.getBalance(address, 'pending');
    //  将返回的以太坊余额（以 Wei 为单位）转换为更人类可读的 ETH 单位
    let balance = ethers.formatEther(pendingBal)
    console.log(balance)
  })