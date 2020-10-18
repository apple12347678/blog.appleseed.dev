import React from 'react';

import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import { HomeDataQuery } from '../../graphql-types';
import { Abstract, Container, Layout, SEO } from '../components';

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
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location}>
      <SEO title="Home" />
      <Container>
        <BannerContainer>
          <Title>Hello</Title>
          <p>This is appleseed&#39;s dev blog.</p>
        </BannerContainer>
        {posts.length === 0 ? (
          <p>No posts currently available.</p>
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
    </Layout>
  );
}

export const pageQuery = graphql`
  query HomeData {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { test: { ne: true } } }
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
