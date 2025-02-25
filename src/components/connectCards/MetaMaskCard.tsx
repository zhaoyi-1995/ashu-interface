import { useEffect, useState } from 'react';
import { hooks, metamask } from '@/connector/metaMask';
import { Card } from './Card';

//
const { useChainId, useIsActivating, useAccounts, useProvider, useIsActive, useENSNames } = hooks;

export default function MetaMaskCard() {
  const chainId = useChainId();
  const accounts = useAccounts();
  // 获取连接状态
  const isActivating = useIsActivating();
  // 获取钱包是否已经激活
  const isActive = useIsActive();
  // 代替我们操作钱包得所有权限 钱包签名之类得
  const provider = useProvider();
  // 获取ENSnames  0x889988 ->  yimoxieyang.eth
  const ENSNames = useENSNames();

  const [error, setError] = useState(undefined);

  /**
   * 如果我们得metamask之前和该网站发生过连接得话，主动激活钱包，页面上得数据不会主动连接metamask
   * 如果我们得metamask断开了连接，主动激活metamask
   */
  useEffect(() => {
    metamask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);
  return (
    <Card
      connector={metamask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  );
}
