import React, {
  createContext,
  useState,
  useEffect,
  useContext
} from 'react';
import { useWeb3React } from '@web3-react/core';

import {
  connectors,
  connectorNames,
  supportedChainHexIds,
  defaultChainHexId,
  CONNECTOR_LOCAL_KEY,
} from '@/utils/connectors';

export const AuthContext = createContext<any>({
  connect: (() => {}) as any,
  disconnect: (() => {}) as any,
});

export const AuthProvider = ({ children }: any) => {
  const { activate, deactivate } = useWeb3React();

  /**
   * @dev Wallet connection
   * @param {String} name
   * @param {JsonRpcProvider} connector
   */
  const connect = async (name: string, connector: any) => {
    try {
      if (name === 'injected') {
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });

        if (!supportedChainHexIds.includes(chainId)) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: defaultChainHexId }],
          });
        }
      }

      localStorage.setItem(CONNECTOR_LOCAL_KEY, name);
      await activate(connector);
    } catch (error) {
      console.error('Wallet connecting error: ', error.message);
    }
  };

  /**
   * @dev Disconnect wallet
   */
  const disconnect = () => {
    localStorage.removeItem(CONNECTOR_LOCAL_KEY);
    deactivate();
  };

  useEffect(() => {
    const connector = localStorage.getItem(CONNECTOR_LOCAL_KEY);

    switch (connector) {
      case connectorNames.injected:
        connect(connectorNames.injected, connectors.injected);
        break;

      case connectorNames.walletconnect:
        connect(connectorNames.walletconnect, connectors.walletconnect);
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ connect, disconnect }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);