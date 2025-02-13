import { useEffect, useState } from "react";
import { hooks, metamask } from "@/connector/metaMask";
import { Card } from "../Card";

const {
  useChainId,
  useIsActivating,
  useAccounts,
  useProvider,
  useIsActive,
  useENSNames
} = hooks

export default function MetaMaskCard () {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()
  const isActive = useIsActive()
  const provider = useProvider()
  const ENSNames = useENSNames()

  const [error, setError] = useState(undefined)

  /**
   * 如果我们得metamask之前和该网站发生过连接得话，主动激活钱包，页面上得数据不会主动连接metamask
   * 如果我们得metamask断开了连接，主动激活metamask
   */
  useEffect(() => {
    metamask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])
  return (<Card 
    connector={metamask}
    activeChainId={chainId}
    isActivating={isActivating}
    isActive={isActive}
    error={error}
    setError={setError}
    accounts={accounts}
    provider={provider}
    ENSNames={ENSNames}
  />)
}

