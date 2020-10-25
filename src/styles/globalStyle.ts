import { css } from '@emotion/core';

import { prismCodeHighlightCss, prismVscodeCss } from './prism';
import { Theme } from './theme';

export const getGlobalStyle = (theme: Theme) => css`
  html {
    font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    font-size: 16px;
    line-height: 1.75;
    color: ${theme.colors[100]};
    @media (max-width: ${theme.breakpoints.xs}px) {
      font-size: 14px;
    }
  }

  body {
    margin: 0;
  }

  main {
    display: block;
  }

  *::selection {
    color: ${theme.colors[900]};
    background-color: ${theme.colors[100]};
  }

  a {
    color: ${theme.colors[400]};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h1,
  h2 {
    font-weight: 700;
    margin-block-start: 0.5em;
    margin-block-end: 0.25em;
  }
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin-block-start: 0.5em;
    margin-block-end: 0.15em;
  }
  h1 {
    font-size: 2.25rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  h4 {
    font-size: 1.6rem;
  }
  h5 {
    font-size: 1.5rem;
  }
  h6 {
    font-size: 1.4rem;
  }

  p {
    margin: 0;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-size: 1rem;
    color: ${theme.colors[200]};
  }

  blockquote {
    margin: 0;
    padding-left: 24px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    border-left: 4px solid ${theme.colors[200]};
    & > * {
      color: ${theme.colors[400]};
    }
    & > p {
      font-size: 1.15rem;
      line-height: 1.75;
      font-style: italic;
    }
  }

  li {
    margin: 0;
    margin-block-start: 0.6em;
    margin-block-end: 0.6em;
  }

  table {
    width: 100%;
    margin-block-start: 2em;
    margin-block-end: 2em;
    border-collapse: collapse;
    thead {
      border-bottom: 1px solid;
      border-color: inherit;
    }
  }

  pre {
    border-radius: 4px;
  }

  .footnotes {
    ol {
      counter-reset: item;
      padding: 0;
      /* padding-left: 20px; */
    }
    li {
      display: block;
      font-size: 0.9rem;
      margin-block-start: 0.4em;
      margin-block-end: 0.4em;
    }
    li:before {
      content: counter(item) '. ';
      counter-increment: item;
      width: 2em;
      display: inline-block;
    }
  }

  .footnote-paragraph {
    font-size: 0.9rem;
  }

  .gatsby-resp-image-image {
    margin: 1rem 0;
  }

  ${prismVscodeCss}

  ${prismCodeHighlightCss}
`;
