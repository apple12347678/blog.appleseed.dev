import React from 'react';

import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import { BlogPostBySlugQuery } from '../../graphql-types';
import { Container, Error, Layout, SEO, TagContainer } from '../components';

const BlogPostTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;

const BlogPostBody = styled.section`
  margin: 4rem 0;
`;

interface IBlogPostTemplateProps {
  data: BlogPostBySlugQuery;
  location: globalThis.Location;
}

export default function BlogPostTemplate({
  data,
  location,
}: IBlogPostTemplateProps) {
  const post = data.markdownRemark;
  if (!post || !post.html) {
    return <Error />;
  }
  const { tags } = post.frontmatter;
  return (
    <Layout location={location}>
      <SEO title={post.frontmatter.title} />
      <Container>
        <article itemScope itemType="http://schema.org/Article">
          <header>
            <BlogPostTitle itemProp="headline">
              {post.frontmatter.title}
            </BlogPostTitle>
            <p>{post.frontmatter.description}</p>
            <p>{post.frontmatter.date}</p>
            <TagContainer tags={tags} />
          </header>
          {/* eslint-disable react/no-danger,@typescript-eslint/naming-convention */}
          <BlogPostBody
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          {/* eslint-enable react/no-danger,@typescript-eslint/naming-convention */}
        </article>
      </Container>
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
