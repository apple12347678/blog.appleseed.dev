import React from 'react';

import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import { globalStyle } from '../styles/globalStyle';
import { theme } from '../styles/theme';

interface IRootProviderProps {
  children: React.ReactNode;
}

export default function RootProvider({ children }: IRootProviderProps) {
  return (
    <>
      <Global styles={globalStyle} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
