import { ethers, utils } from 'ethers';

export const minimizeAddress = (address: string, start = 14, end = -11) =>
  address ? `${address.substr(0, start)}...${address.substr(end)}` : "";

export const toHex = (value: number) => {
  return `0x${value.toString(16)}`;
};

export const toWei = (value: string) => {
  return ethers.utils.parseEther(value);
}

export const fromWei = (value: number) => {
  const stringValue = ethers.utils.formatEther(ethers.BigNumber.from(value.toString()));
  return Number(stringValue);
}

export const only_numbers = /^[0-9]*(?:\.[0-9]{0,18})?$/;

export const onlyNumbers = (value: string) => {
  return only_numbers.test(value);
}

export const isValidAddress = (address: string ) => {
  return utils.isAddress(address);
}