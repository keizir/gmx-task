import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { useWeb3React } from '@web3-react/core';

import { useContract } from './contract';
import { getUsdPrice } from '@/services/coingecko';

export const AccountContext = createContext<any>({
  balances: {},
  prices: {},
  updateBalances: (() => {}) as any,
});

export const AccountProvider = ({ children }: any) => {
  const { account, library } = useWeb3React();
  const { gmxContract } = useContract();

  const [balances, setBalances] = useState<any>({
    gmx: 0,
  });
  const [prices, setPrices] = useState<any>({
    gmx: 0,
  })

  const getBalances = async () => {
    const gmxBalance = await gmxContract.balanceOf(account);

    setBalances({ gmx: gmxBalance || 0 });
  };

  const getTokenPrice = async () => {
    const gmxPrice = await getUsdPrice('gmx');

    setPrices({ gmx: gmxPrice || 0 });
  }

  const updateBalances = (newBalance: any) => {
    setBalances({...balances, ...newBalance});
  }

  useEffect(() => {
    getTokenPrice();
  }, []);

  useEffect(() => {
    if (gmxContract && account) {
      getBalances();
    } else {
      setBalances({ gmx: 0 })
    }
  }, [gmxContract, account]);

  return (
    <AccountContext.Provider
      value={{ balances, prices, updateBalances }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => useContext(AccountContext);