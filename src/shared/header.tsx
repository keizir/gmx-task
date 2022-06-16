import React, { useState, MouseEvent } from 'react';
import Image from 'next/image'
import { useWeb3React } from '@web3-react/core';
import {
  AppBar,
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material';

import { useAuth } from '@/contexts/auth';
import { useAccount } from '@/contexts/account';
import {
  minimizeAddress,
  fromWei,
} from '@/utils/helpers';
import { connectorNames, connectors } from '@/utils/connectors';

import MetamaskLogo from '@/assets/meta-mask.png';
import WalletConnectLogo from '@/assets/wallet-connect.png';

const Header = () => {
  const { account } = useWeb3React();
  const { connect, disconnect } = useAuth();
  const { balances, prices } = useAccount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConnect = async (key: string) => {
    if (!connectorNames[key]) {
      console.error('Wallet provider not supported');
      return;
    }

    handleClose();
    connect(key, connectors[key]);
  }

  const handleDisconnect = () => {
    handleClose();
    disconnect();
  };

  return (
    <AppBar position='fixed'>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          height='76px'
        >
          <Grid item>
            <Grid container alignItems="center">
              <Typography component="span" variant="h4" ml={3} color="white">
                Sample DeFi App
              </Typography>
            </Grid>
          </Grid>
          <Grid item display={{ lg: 'flex' }}>
            {account ? (
              <Grid container alignItems='center'>
                { balances && 
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={`${fromWei(balances.gmx).toFixed(3)} GMX ($${prices.gmx?.toFixed(3)})`}
                      variant="filled"
                      color="info"
                    />
                  </Stack>
                }
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => handleDisconnect()}
                  style={{ marginLeft: 24 }}
                >
                  {minimizeAddress(account, 5, -4)}
                </Button>
              </Grid>
            ) : (
              <Grid container alignItems='center'>
                <Button
                  variant='outlined'
                  color='secondary'
                  style={{ marginLeft: 36 }}
                  onClick={handleClick}
                >
                  Connect
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={() => handleConnect('injected')}
                  >
                    <ListItemIcon>
                      <Image src={MetamaskLogo} alt='Metamask' width={26} height={26} />
                    </ListItemIcon>
                    <ListItemText>Metamask</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleConnect('walletconnect')}
                  >
                    <ListItemIcon>
                      <Image src={WalletConnectLogo} alt='WalletConnect' width={26} height={26} />
                    </ListItemIcon>
                    <ListItemText>WalletConnect</ListItemText>
                  </MenuItem>
                </Menu>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Header;