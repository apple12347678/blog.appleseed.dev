export const theme = {
  colors: {
    black: '#000',
    white: '#fff',
    100: '#17181c',
    200: '#24252b',
    300: '#393b44',
    400: '#767c93',
    500: '#8d93ab',
    600: '#9da3bb',
    700: '#c2ce23',
    800: '#d6e0f0',
    900: '#f1f3f8',
  },
  breakpoints: {
    xs: 600,
    sm: 960,
    md: 1280,
    lg: 1920,
  },
};

export type Theme = typeof theme;
export type ThemeProps = { theme: Theme };
