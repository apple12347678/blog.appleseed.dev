import { css } from '@emotion/react';

import { prismCodeHighlightCss, prismVscodeCss } from './prism';

export const globalStyle = css`
  html {
    font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    font-size: 16px;
    line-height: 1.75;

    --color-100: #17181c;
    --color-200: #24252b;
    --color-300: #393b44;
    --color-400: #767c93;
    --color-500: #8790ab;
    --color-600: #99a2be;
    --color-700: #b1bbd4;
    --color-800: #d6e0f0;
    --color-900: #f1f3f8;
    @media (prefers-color-scheme: dark) {
      --color-100: #f1f3f8;
      --color-200: #d6e0f0;
      --color-300: #b1bbd4;
      --color-400: #99a2be;
      --color-500: #8790ab;
      --color-600: #767c93;
      --color-700: #393b44;
      --color-800: #24252b;
      --color-900: #17181c;
    }
    @media (max-width: 720px) {
      font-size: 14px;
    }

    color: var(--color-100);
    background-color: var(--color-900);
  }

  body {
    margin: 0;
  }

  main {
    display: block;
  }

  *::selection {
    color: var(--color-900);
    background-color: var(--color-100);
  }

  a {
    color: var(--color-400);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h1,
  h2 {
    font-weight: 600;
    margin-block-start: 0.5em;
    margin-block-end: 0.25em;
  }
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin-block-start: 0.25em;
    margin-block-end: 0.15em;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.3rem;
  }
  h5 {
    font-size: 1.25rem;
  }
  h6 {
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-size: 1rem;
    color: var(--color-200);
    & > img {
      margin: 4rem 0;
      max-width: 100%;
    }
  }

  blockquote {
    margin: 0;
    padding-left: 24px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    border-left: 4px solid var(--color-200);
    & > * {
      color: var(--color-400);
    }
    & > p {
      font-size: 1.15rem;
      line-height: 1.75;
      font-style: italic;
    }
  }

  li {
    margin: 0;
    margin-block-start: 0.3em;
    margin-block-end: 0.3em;
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

  img {
    background-color: white;
  }

  .footnotes {
    ol {
      counter-reset: item;
      padding: 0;
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

  .gatsby-resp-image-figcaption {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: var(--color-400);
  }

  .anchor > svg {
    fill: var(--color-100);
  }

  ${prismVscodeCss}

  ${prismCodeHighlightCss}

  :not(pre) > code[class*='language-'] {
    background-color: var(----color-600);
  }
`;
