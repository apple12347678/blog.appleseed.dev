/*
import React from 'react';

import { graphql } from 'gatsby';

export default function SearchPage() {
  return <div />;
}

export const pageQuery = graphql`
  query SearchPageQuery {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: "random" } } }) {
      nodes {
        excerpt
        frontmatter {
          tags
          title
        }
        parent {
          ... on File {
            id
            name
            absolutePath
          }
        }
      }
    }
  }
`;
*/
