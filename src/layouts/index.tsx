import React from 'react';

import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { SitePageContext } from '../../graphql-types';
import GatsbyIcon from '../assets/gatsby.svg';
import GithubIcon from '../assets/github.svg';
import ReactIcon from '../assets/react.svg';
import TypescriptIcon from '../assets/typescript.svg';
import { ThemeProps } from '../styles/theme';
import RootProvider from './RootProvider';

const LayoutContainer = styled.div`
  padding: 1.5rem 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const HomeLink = styled(Link)<ThemeProps>`
  font-size: 1.25rem;
  font-weight: 300;
  user-select: none;
  display: inherit;
  color: ${(props) => props.theme.colors[100]};
  :hover {
    text-decoration: none;
  }
`;

const GithubLink = styled.a`
  user-select: none;
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
  @media (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    display: none;
  }
`;

interface ILayoutProps {
  children: React.ReactNode;
  pageContext: SitePageContext;
}

export default function Layout({
  children,
  pageContext: { language },
}: ILayoutProps) {
  const rootPath = language === 'ko' ? '/' : `/${language}/`;
  return (
    <RootProvider>
      <LayoutContainer>
        <Header>
          <HomeLink to={rootPath}>appleseed.dev</HomeLink>
          <GithubLink href="https://github.com/apple12347678">
            <SVGWrapper
              width="32"
              height="32"
              alt="github-icon"
              src={GithubIcon}
            />
          </GithubLink>
        </Header>
        <main>{children}</main>
        <Footer>
          <Copyright>© 2020 by appleseed</Copyright>
          <PoweredBy>
            Powered by
            <a href="https://reactjs.org/">
              <SVGWrapper
                width="20"
                height="20"
                alt="react-icon"
                $sm
                src={ReactIcon}
              />
            </a>
            <a href="https://www.typescriptlang.org/">
              <SVGWrapper
                width="20"
                height="20"
                alt="typescript-icon"
                $sm
                src={TypescriptIcon}
              />
            </a>
            <a href="https://www.gatsbyjs.com/">
              <SVGWrapper
                width="20"
                height="20"
                alt="gatsby-icon"
                $sm
                src={GatsbyIcon}
              />
            </a>
          </PoweredBy>
        </Footer>
      </LayoutContainer>
    </RootProvider>
  );
}
