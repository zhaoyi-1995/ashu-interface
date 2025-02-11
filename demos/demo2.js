const privateKey = "0x2cedfb9ae18031f98bfc939916e755fbe4c4a6ba6118f7e0ee6789723337bebc";

const wallet = new ethers.Wallet(privateKey)
const provider = new ethers.JsonRpcProvider("http://localhost:7545")

const activeWallet = wallet.connect(provider)

provider.getBalance(activeWallet.address).then((balance) => {
  const res = ethers.formatEther(balance)
  console.log(res, 'ETH')
})