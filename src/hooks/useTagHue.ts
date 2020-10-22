import { useMemo } from 'react';

import { getTagHue } from '../styles/tag';

export default function useTagHue(key: string) {
  const hue = useMemo(() => getTagHue(key), [key]);
  return hue;
}
