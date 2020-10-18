import React from 'react';

import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { Link } from 'gatsby';

import GatsbyIcon from '../assets/gatsby.svg';
import GithubIcon from '../assets/github.svg';
import NetlifyIcon from '../assets/netlify.svg';
import ReactIcon from '../assets/react.svg';
import TypescriptIcon from '../assets/typescript.svg';
import { globalStyle, theme, ThemeProps } from '../styles/style';

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

const HomeLink = styled(Link)`
  font-size: 1.25rem;
  font-weight: 300;
  user-select: none;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;

const SVGWrapper = styled.img<{ $sm?: boolean }>`
  ${(props) =>
    props.$sm
      ? `
    width: 20px;
  height: 20px;
  `
      : `
  width: 32px;
  height: 32px;
  `}
  display: inherit;
`;

const Footer = styled.footer`
  margin-top: 40px;
  display: flex;
`;

const Copyright = styled.span<ThemeProps>`
  margin-right: auto;
  color: ${(props) => props.theme.colors[500]};
  font-size: 0.85rem;
  font-weight: 400;
  user-select: none;
`;

const PoweredBy = styled.span<ThemeProps>`
  color: ${(props) => props.theme.colors[500]};
  font-size: 0.85rem;
  font-weight: 400;
  display: flex;
  user-select: none;
  ${SVGWrapper} {
    margin-left: 6px;
  }
`;

interface ILayoutProps {
  location: globalThis.Location;
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
            <HomeLink to="/">appleseed.dev</HomeLink>
            <a href="https://github.com/apple12347678">
              <SVGWrapper src={GithubIcon} />
            </a>
          </Header>
          <main>{children}</main>
          <Footer>
            <Copyright>© 2020 by appleseed</Copyright>
            <PoweredBy>
              Powered by
              <a href="https://reactjs.org/">
                <SVGWrapper $sm src={ReactIcon} />
              </a>
              <a href="https://www.typescriptlang.org/">
                <SVGWrapper $sm src={TypescriptIcon} />
              </a>
              <a href="https://www.gatsbyjs.com/">
                <SVGWrapper $sm src={GatsbyIcon} />
              </a>
              <a href="https://www.netlify.com/">
                <SVGWrapper $sm src={NetlifyIcon} />
              </a>
            </PoweredBy>
          </Footer>
        </Container>
      </ThemeProvider>
    </div>
  );
}
