import React from 'react';

import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { Link } from 'gatsby';

import githubDark from '../assets/github-dark.png';
import { globalStyle, theme, ThemeProps } from './style';

const Container = styled.div<ThemeProps>`
  padding: 1.5rem 2rem;
  color: ${(props) => props.theme.colors[100]};
  p {
    color: ${(props) => props.theme.colors[300]};
  }
  blockquote {
    border-left: 4px solid ${(props) => props.theme.colors[300]};
  }
  blockquote > * {
    color: ${(props) => props.theme.colors[400]};
  }
  *::selection {
    color: ${(props) => props.theme.colors[900]};
    background-color: ${(props) => props.theme.colors[100]};
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const HomeLink = styled.span`
  font-size: 1.25rem;
  font-weight: 300;
  a {
    text-decoration: none;
    user-select: none;
  }
`;

const Github = styled.img`
  width: 32px;
  height: 32px;
`;

const Copyright = styled.span<ThemeProps>`
  color: ${(props) => props.theme.colors[500]};
  font-size: 0.85rem;
  font-weight: 400;
`;

interface ILayoutProps {
  location: globalThis.Location;
  // eslint-disable-next-line react/no-unused-prop-types
  title: string;
  children: React.ReactNode;
}

export default function Layout({ location, children }: ILayoutProps) {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  return (
    <div data-is-root-path={isRootPath}>
      <Global styles={globalStyle} />
      <ThemeProvider theme={theme}>
        <Container>
          <Header>
            <HomeLink>
              <Link to="/">appleseed.dev</Link>
            </HomeLink>
            <a href="https://github.com/apple12347678">
              <Github src={githubDark} />
            </a>
          </Header>
          <main>{children}</main>
          <footer>
            <Copyright>© 2020 by appleseed</Copyright>
          </footer>
        </Container>
      </ThemeProvider>
    </div>
  );
}
