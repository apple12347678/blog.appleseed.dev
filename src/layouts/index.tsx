import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { SitePageContext } from '../../graphql-types';
import GatsbyIcon from '../assets/gatsby.svg';
import GithubIcon from '../assets/github.svg';
import ReactIcon from '../assets/reacticon.svg';
import TypescriptIcon from '../assets/typescript.svg';
import RootProvider from './RootProvider';

const LayoutContainer = styled.div`
  padding: 1.5rem 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const HomeLink = styled(Link)`
  font-size: 1.25rem;
  font-weight: 300;
  user-select: none;
  display: inherit;
  color: var(--color-100);
  :hover {
    text-decoration: none;
  }
`;

const GithubLink = styled.a`
  user-select: none;
`;

const SVGWrapper = styled.div<{ $sm?: boolean }>`
  fill: var(--color-100);
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

const Copyright = styled.span`
  margin-right: auto;
  color: var(--color-500);
  font-size: 0.85rem;
  font-weight: 400;
  user-select: none;
`;

const PoweredBy = styled.span`
  color: var(--color-500);
  font-size: 0.85rem;
  font-weight: 400;
  display: flex;
  user-select: none;
  ${SVGWrapper} {
    margin-left: 6px;
  }
  @media (max-width: 720px) {
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
            <SVGWrapper>
              <GithubIcon />
            </SVGWrapper>
          </GithubLink>
        </Header>
        <main>{children}</main>
        <Footer>
          <Copyright>© 2020 by appleseed</Copyright>
          <PoweredBy>
            Powered by
            <a href="https://reactjs.org/">
              <SVGWrapper $sm>
                <ReactIcon width="20" height="20" />
              </SVGWrapper>
            </a>
            <a href="https://www.typescriptlang.org/">
              <SVGWrapper $sm>
                <TypescriptIcon width="20" height="20" />
              </SVGWrapper>
            </a>
            <a href="https://www.gatsbyjs.com/">
              <SVGWrapper $sm>
                <GatsbyIcon width="20" height="20" />
              </SVGWrapper>
            </a>
          </PoweredBy>
        </Footer>
      </LayoutContainer>
    </RootProvider>
  );
}
