import React, {
  useState,
  useEffect,
  useContext,
  createContext
} from 'react';
import { useWeb3React } from '@web3-react/core';

import {
  getGmxTokenContract
} from '@/utils/contracts';

export const ContractContext = createContext<any>({
  gmxContract: null,
});

export const ContractProvider = ({ children }: any) => {
  const { library, active, chainId } = useWeb3React();
  const [gmxContract, setGmxContract] = useState<any>(null);

  useEffect(() => {
    if (library && active && chainId) {
      const gmx = getGmxTokenContract(chainId, library);
      setGmxContract(gmx);
    } else {
      setGmxContract(null);
    }
  }, [library, active, chainId]);

  return (
    <ContractContext.Provider
      value={{ gmxContract }}
    >
      {children}
    </ContractContext.Provider>
  )
}

export const useContract = () => useContext(ContractContext);