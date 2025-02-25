import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
// 使用 initializeConnector 函数初始化 MetaMask 连接器，并解构出 metamask 实例和 hooks
export const [metamask, hooks] = initializeConnector<MetaMask>(
  actions => new MetaMask({ actions }),
);
