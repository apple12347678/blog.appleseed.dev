import React from 'react';

import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { useTranslation } from 'react-i18next';

import { HomeDataQuery } from '../../graphql-types';
import { Abstract, Banner, Container, SEO } from '../components';

interface IHomeProps {
  data: HomeDataQuery;
}

export default function Home({ data }: IHomeProps) {
  const { t } = useTranslation();
  const posts = data.allMarkdownRemark.nodes;

  return (
    <>
      <SEO title="Home" />
      <Container>
        <Banner file={data.file!.childImageSharp!.fluid as FluidObject} />
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
              timeToRead={post.timeToRead || 0}
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
    file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { draft: { ne: true } }
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
        timeToRead
      }
    }
  }
`;
