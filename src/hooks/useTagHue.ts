import { useMemo } from 'react';

import { getTagHue } from '../styles/tag';

export const useTagHue = (key: string) => {
  const hue = useMemo(() => getTagHue(key), [key]);
  return hue;
};
