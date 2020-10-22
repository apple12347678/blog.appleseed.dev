import { useMemo } from 'react';

import { getGlobalStyle } from '../styles/globalStyle';
import { Theme } from '../styles/theme';

export default function useGlobalStyle(theme: Theme) {
  const globalStyle = useMemo(() => getGlobalStyle(theme), [theme]);
  return globalStyle;
}
