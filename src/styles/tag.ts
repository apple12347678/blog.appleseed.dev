import palette from './tagPalette.json';

export const getTagHue = (key: string): number => {
  const hue = palette[key as keyof typeof palette] as number | undefined;
  return (
    hue ||
    Array.from(key).reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 360
  );
};
