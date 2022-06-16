import * as React from 'react';
import type { AppProps } from 'next/app';
import { Web3ReactProvider } from '@web3-react/core';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import Header from '@/shared/header';
import { AuthProvider } from '@/contexts/auth';
import { ContractProvider } from '@/contexts/contract';
import { AccountProvider } from '@/contexts/account';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '@/utils/createEmotionCache';
import themeOptions from '@/styles/theme/themeOptions';
import '@/styles/globals.css';
import { getLibrary } from '@/utils/connectors';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme(themeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <AuthProvider>
            <ContractProvider>
              <AccountProvider>
                <CssBaseline />
                <Header />
                <Component {...pageProps} />
              </AccountProvider>
            </ContractProvider>
          </AuthProvider>
        </Web3ReactProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
