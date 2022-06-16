import {
  Container,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';

import { useWeb3React } from '@web3-react/core';
import TransferBox from '@/components/transferBox';

const WrapperContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
}));

const WrapperGrid = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
}));

const HomeView = () => {
  const { account } = useWeb3React();

  return (
    <WrapperContainer>
      <WrapperGrid
        container
        flexDirection='row'
        alignItems='center'
        position='relative'
      >
        { account && <TransferBox /> }
      </WrapperGrid>
    </WrapperContainer>
  );
}

export default HomeView