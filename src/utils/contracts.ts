import { Contract } from '@ethersproject/contracts';

import { contractAddresses } from '@/constants';
import GmxABI from '@/constants/abis/gmx.json';

export const getGmxTokenContract = (chainId: number, library: any) => {
  const address = (contractAddresses.gmx as any)[chainId];
  return new Contract(address, (GmxABI as any)[chainId.toString()], library.getSigner());
};