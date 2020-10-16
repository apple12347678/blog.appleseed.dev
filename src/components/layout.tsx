import React from 'react';

import { css, Global } from '@emotion/core';
import { Link } from 'gatsby';

const globalStyle = css`
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
  }

  main {
    display: block;
  }
`;

interface ILayoutProps {
  location: globalThis.Location;
  title: string;
  children: React.ReactNode;
}

export default function Layout({ location, title, children }: ILayoutProps) {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  return (
    <div data-is-root-path={isRootPath}>
      <Global styles={globalStyle} />
      <header className="global-header">
        {isRootPath ? (
          <h1>
            <Link to="/">{title}</Link>
          </h1>
        ) : (
          <Link to="/">{title}</Link>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
