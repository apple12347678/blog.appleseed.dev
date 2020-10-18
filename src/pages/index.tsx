import React from 'react';

import { graphql, Link } from 'gatsby';

import { HomeDataQuery } from '../../graphql-types';
import { Layout, SEO } from '../components';

interface IHomeProps {
  data: HomeDataQuery;
  location: globalThis.Location;
}

export default function Home({ data, location }: IHomeProps) {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location}>
      <SEO title="Home" />
      <h1>Hello</h1>
      {posts.length === 0 ? (
        <p>No posts</p>
      ) : (
        <ol>
          {posts.map((post) => (
            <li key={post.fields.slug}>
              <Link to={`/post${post.fields.slug}`}>
                {post.frontmatter.title}
              </Link>
            </li>
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
