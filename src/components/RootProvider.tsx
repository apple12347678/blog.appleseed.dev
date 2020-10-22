import React from 'react';

import { Global } from '@emotion/core';
import { ThemeProvider, useTheme } from 'emotion-theming';

import { useGlobalStyle } from '../hooks';
import { Theme, theme as defaultTheme } from '../styles/theme';

interface IRootProviderProps {
  children: React.ReactNode;
}

function ThemedRootProvider({ children }: IRootProviderProps) {
  const theme = useTheme<Theme>();
  const globalStyle = useGlobalStyle(theme);
  return (
    <>
      <Global styles={globalStyle} />
      {children}
    </>
  );
}

export default function RootProvider({ children }: IRootProviderProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ThemedRootProvider>{children}</ThemedRootProvider>
    </ThemeProvider>
  );
}
