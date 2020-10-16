import React from 'react';

import { graphql } from 'gatsby';

import { BlogPostBySlugQuery } from '../../graphql-types';
import Layout from '../components/layout';

interface IBlogPostTemplateProps {
  data: BlogPostBySlugQuery;
  location: globalThis.Location;
}

export default function BlogPostTemplate({
  data,
  location,
}: IBlogPostTemplateProps) {
  const post = data.markdownRemark;
  const siteTitle = data.site?.siteMetadata?.title || 'Title';
  return (
    <Layout location={location} title={siteTitle}>
      <article itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post?.frontmatter?.title}</h1>
          <p>{post?.frontmatter?.date}</p>
        </header>
        {/* eslint-disable react/no-danger,@typescript-eslint/naming-convention */}
        <section
          dangerouslySetInnerHTML={{ __html: post?.html || '' }}
          itemProp="articleBody"
        />
        {/* eslint-enable react/no-danger,@typescript-eslint/naming-convention */}
        <hr />
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
