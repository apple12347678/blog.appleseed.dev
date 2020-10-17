import React from 'react';

import { graphql, Link } from 'gatsby';

import { HomeDataQuery } from '../../graphql-types';
import Layout from '../components/layout';
import SEO from '../components/seo';

interface IHomeProps {
  data: HomeDataQuery;
  location: globalThis.Location;
}

export default function Home({ data, location }: IHomeProps) {
  const siteTitle: string = data.site?.siteMetadata?.title || 'Title';
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <h1>Hello</h1>
      {posts.length === 0 ? (
        <p>No posts</p>
      ) : (
        <ol>
          {posts.map((post) => (
            <span key={post.fields!.slug}>
              <Link to={post.fields!.slug!}>{post.frontmatter!.title}</Link>
            </span>
          ))}
        </ol>
      )}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
