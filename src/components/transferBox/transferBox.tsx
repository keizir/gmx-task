import React, {
  useState,
  useEffect
} from 'react';
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

import { useAccount } from '@/contexts/account';
import { useContract } from '@/contexts/contract';
import {
  isValidAddress,
  onlyNumbers,
  fromWei,
  toWei
} from '@/utils/helpers';
import Alert from '../alert';

interface TransferBoxProps {}

const CustomPaper = styled(Paper)(({ theme }) => ({
  p: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  width: 400,
}));

const InputBox = styled(Box)(({ theme }) => ({
  width: `100%`,
  margin: 30,
}));

const TransferBox: React.FC<TransferBoxProps> = () => {
  const { gmxContract } = useContract();
  const { balances: {gmx}, updateBalances } = useAccount();
  const [data, setData] = useState<any>({
    address: '',
    amount: '',
  });
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if (data.address && data.amount != 0 && data.amount < fromWei(gmx)) {
      setIsInvalid(false);
    } else {
      if (!isInvalid) setIsInvalid(true);
      if (showAlert) setShowAlert(false);
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'amount' && !onlyNumbers(event.target.value)) return;

    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleTransfer = async () => {
    if (!isValidAddress(data.address)) {
      setShowAlert(true);
      console.log('invalide address')
      return;
    }
    setIsTransferring(true);

    try {
      const tx = await gmxContract.transfer(
        data.address,
        toWei(data.amount)
      );
      await tx.wait();

      // update balance after transaction confirmed
      updateBalances({
        gmx: toWei((fromWei(gmx) - data.amount).toString())
      });
    } catch (err) {
      console.error('Sending tokens failed.');
    }

    setIsTransferring(false);
    setData({
      address: '',
      amount: ''
    });
  };

  return (
    <CustomPaper>
      <InputBox>
        <Typography variant='h5' gutterBottom component='div'>
          Transfer GMX
        </Typography>
        <Stack direction='column' spacing={1}>
          <FormControl fullWidth variant='filled'>
            <InputLabel htmlFor='to-address'>Receipient address</InputLabel>
            <FilledInput
              id='to-address'
              name='address'
              value={data?.address}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth variant='filled'>
            <InputLabel htmlFor='gmx-amount'>Amount</InputLabel>
            <FilledInput
              id='gmx-amount'
              name='amount'
              value={data?.amount}
              onChange={handleChange}
              endAdornment={<InputAdornment position='end'>GMX</InputAdornment>}
            />
          </FormControl>
          { showAlert && 
            <Alert type={"error"}>
              Invalid address
            </Alert>
          }
          { data.amount > fromWei(gmx) && 
            <Alert type={"error"}>
              Insufficient balance
            </Alert>
          }
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={() => handleTransfer()}
            disabled={isTransferring || isInvalid}
          >
            Send
          </Button>
        </Stack>
      </InputBox>
    </CustomPaper>
  );
}

export default TransferBox;