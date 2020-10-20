import React from 'react';

import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import { HomeDataQuery } from '../../graphql-types';
import { Abstract, Container, SEO } from '../components';

const BannerContainer = styled.div`
  padding: 60px 0;
`;

const Title = styled.h1`
  font-size: 3rem;
`;

interface IHomeProps {
  data: HomeDataQuery;
  location: globalThis.Location;
}

export default function Home({ data, location }: IHomeProps) {
  const { t } = useTranslation();
  const posts = data.allMarkdownRemark.nodes;

  return (
    <>
      <SEO title="Home" />
      <Container>
        <BannerContainer>
          <Title>{t('index.title')}</Title>
          <p>{t('index.introduction')}</p>
        </BannerContainer>
        {posts.length === 0 ? (
          <p>{t('index.nopost')}</p>
        ) : (
          posts.map((post) => (
            <Abstract
              key={post.fields.slug}
              title={post.frontmatter.title}
              slug={post.fields.slug}
              description={post.frontmatter.description}
              excerpt={post.excerpt || undefined}
              date={post.frontmatter.date}
              tags={post.frontmatter.tags}
            />
          ))
        )}
      </Container>
    </>
  );
}

export const pageQuery = graphql`
  query HomeData($language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { test: { ne: true } }
        fields: { lang: { eq: $language } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`;
