import type { AddEthereumChainParameter } from '@web3-react/types';

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation,
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

const getInfuraUrlFor = (network: string) =>
  process.env.infuraKey ? `https://${network}.infura.io/v3/${process.env.infuraKey}` : undefined;
const getAlchemyUrlFor = (network: string) =>
  process.env.alchemyKey
    ? `https://${network}.alchemyapi.io/v2/${process.env.alchemyKey}`
    : undefined;

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation };

// 主网，多个RPC连接 依次降级，兼容网络不稳定
export const MAINNET_CHAINS: ChainConfig = {
  1: {
    urls: [
      ...(getInfuraUrlFor('mainnet') ? [getInfuraUrlFor('mainnet') as string] : []),
      ...(getAlchemyUrlFor('eth-mainnet') ? [getAlchemyUrlFor('eth-mainnet') as string] : []),
      'https://cloudflare-eth.com',
    ].filter(Boolean),
    name: 'Mainnet',
  },
  10: {
    urls: [
      ...(getInfuraUrlFor('optimism-mainnet')
        ? [getInfuraUrlFor('optimism-mainnet') as string]
        : []),
      'https://mainnet.optimism.io',
    ].filter(Boolean),
    name: 'Optimism',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  42161: {
    urls: [
      ...(getInfuraUrlFor('arbitrum-mainnet')
        ? [getInfuraUrlFor('arbitrum-mainnet') as string]
        : []),
      'https://arb1.arbitrum.io/rpc',
    ].filter(Boolean),
    name: 'Arbitrum One',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://arbiscan.io'],
  },
};
// 测试网
export const TESTNET_CHAINS: ChainConfig = {
  5: {
    urls: [...(getInfuraUrlFor('goerli') ? [getInfuraUrlFor('goerli') as string] : [])].filter(
      Boolean,
    ),
    name: 'Görli',
  },
  420: {
    urls: [
      ...(getInfuraUrlFor('optimism-goerli') ? [getInfuraUrlFor('optimism-goerli') as string] : []),
      'https://goerli.optimism.io',
    ].filter(Boolean),
    name: 'Optimism Goerli',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://goerli-explorer.optimism.io'],
  },
  421613: {
    urls: [
      ...(getInfuraUrlFor('arbitrum-goerli') ? [getInfuraUrlFor('arbitrum-goerli') as string] : []),
      'https://goerli-rollup.arbitrum.io/rpc',
    ].filter(Boolean),
    name: 'Arbitrum Goerli',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://testnet.arbiscan.io'],
  },
  1337: {
    urls: ['http://127.0.0.1:7545'],
    name: 'localhost',
    nativeCurrency: ETH,
    blockExplorerUrls: [''],
  },
};

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
};

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{
  [chainId: number]: string[];
}>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
