import { Global } from '@emotion/react';

import { globalStyle } from '../styles/globalStyle';

interface IRootProviderProps {
  children: React.ReactNode;
}

export default function RootProvider({ children }: IRootProviderProps) {
  return (
    <>
      <Global styles={globalStyle} />
      {children}
    </>
  );
}
