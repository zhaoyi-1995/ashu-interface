import { useState, useEffect } from 'react';
import { hooks } from '@/connector/metaMask';
import { BigNumber } from '@ethersproject/bignumber';
import AShuBankTABI from '@/abis/AShuBankT.json';
import { AShuBankT, AShuBankT__factory } from '@/types/ethers-contracts'; // 导入合约工厂
import { ethers } from 'ethers';

// 合约地址
const CONTRACT_ADDRESS = AShuBankTABI.networks['5777'].address; // 替换为实际合约地址

const BankContractInterface = () => {
  const { useProvider, useAccounts } = hooks;
  const accounts = useAccounts(); // 获取账户
  const account = accounts?.[0]; // 获取第一个账户
  const provider = useProvider(); // 获取提供者（Provider）

  const [contract, setContract] = useState<AShuBankT | null>(null); // 定义合约实例
  const [inputDeposit, setInputDeposit] = useState(''); // 存款金额
  const [inputWithdraw, setInputWithdraw] = useState(''); // 取款金额
  const [contractBalance, setContractBalance] = useState('0'); // 合约余额
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(''); // 错误信息

  useEffect(() => {
    if (provider && account) {
      const signer = provider.getSigner();
      const contractInstance = AShuBankT__factory.connect(CONTRACT_ADDRESS, signer);
      setContract(contractInstance);

      contractInstance.on('Deposit', (account: string, amount: BigNumber) => {
        console.log(`Deposit event: Account ${account} deposited ${amount.toString()}`);
        handleGetBalance(); // 每次有存款操作时刷新余额
      });

      contractInstance.on('Withdraw', (account: string, amount: BigNumber) => {
        console.log(`Withdraw event: Account ${account} withdrew ${amount.toString()}`);
        handleGetBalance(); // 每次有取款操作时刷新余额
      });

      return () => {
        contractInstance.removeAllListeners(); // 清理监听器
      };
    }
  }, [provider, account]);

  const handleDeposit = async () => {
    if (!contract || !inputDeposit) return;
    try {
      setLoading(true);
      setError('');
      const tx = await contract.deposit({ value: ethers.utils.parseEther(inputDeposit) });
      await tx.wait(); // 等待交易完成
      setInputDeposit('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Failed to deposit:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!contract || !inputWithdraw) return;
    try {
      setLoading(true);
      setError('');
      const tx = await contract.withdraw(ethers.utils.parseEther(inputWithdraw));
      await tx.wait(); // 等待交易完成
      setInputWithdraw('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Failed to withdraw:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetBalance = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      console.log(2222222);
      const balance = await contract.getBalance();
      console.log(balance, 1111111);
      setContractBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Failed to get balance:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bank Contract Interface</h1>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Connected Account:</p>
        <p className="font-mono text-gray-800 break-all">{account}</p>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Deposit Amount (ETH)"
          value={inputDeposit}
          onChange={e => setInputDeposit(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleDeposit}
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Depositing...' : 'Deposit'}
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Withdraw Amount (ETH)"
          value={inputWithdraw}
          onChange={e => setInputWithdraw(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleWithdraw}
          disabled={loading}
          className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Withdrawing...' : 'Withdraw'}
        </button>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-lg font-semibold text-gray-800">
          Contract Balance: {contractBalance} ETH
        </p>
      </div>

      {error && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}

      {loading && (
        <div className="p-4 bg-blue-50 rounded-md">
          <p className="text-blue-600">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default BankContractInterface;
