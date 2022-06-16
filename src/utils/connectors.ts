import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { toHex } from '@/utils/helpers';

export const POLLING_INTERVAL = 12000;

export const CHAIN_IDS = {
  MAIN: 42161,
  ROPSTEN: 421611,
};

export const defaultChainId = process.env.DEVELOPMENT === 'false' ? CHAIN_IDS.MAIN : CHAIN_IDS.ROPSTEN;

export const supportedChainIds = [defaultChainId];

export const supportedChainHexIds = supportedChainIds.map((chainId) =>
  toHex(chainId)
);

export const defaultChainHexId = toHex(defaultChainId);

export const CONNECTOR_LOCAL_KEY = 'app-connector';

export const injected = new InjectedConnector({
  supportedChainIds,
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds,
});

export const connectorNames: {[key: string]: string} = {
  injected: 'injected',
  walletconnect: 'walletconnect',
};

export const connectors: {[key: string]: any} = {
  injected,
  walletconnect,
};

export const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;

  return library;
};