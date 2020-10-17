import React from 'react';

import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import { BlogPostBySlugQuery } from '../../graphql-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { ThemeProps } from '../components/style';
import Tag from '../components/tag';

const BlogPostContainer = styled.div<ThemeProps>`
  max-width: ${(props) => props.theme.breakpoints.sm}px;
  margin: 0 auto;
`;

const BlogPostTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;

const BlogPostTagContainer = styled.div`
  margin-block-start: 1rem;
  line-height: 2;
  & > a:not(:last-child) {
    margin-right: 10px;
  }
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
  const siteTitle = data.site?.siteMetadata?.title || 'Title';
  const tags = post?.frontmatter?.tags;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post?.frontmatter?.title || ''} />
      <BlogPostContainer>
        <article itemScope itemType="http://schema.org/Article">
          <header>
            <BlogPostTitle itemProp="headline">
              {post?.frontmatter?.title}
            </BlogPostTitle>
            <p>{post?.frontmatter?.date}</p>
            <BlogPostTagContainer>
              {tags
                ? tags.map((tag) => (
                    <Tag key={tag} name={tag!} to={`/tag/${tag!}`} />
                  ))
                : null}
            </BlogPostTagContainer>
          </header>
          {/* eslint-disable react/no-danger,@typescript-eslint/naming-convention */}
          <BlogPostBody
            dangerouslySetInnerHTML={{ __html: post?.html || '' }}
            itemProp="articleBody"
          />
          {/* eslint-enable react/no-danger,@typescript-eslint/naming-convention */}
          <hr />
        </article>
      </BlogPostContainer>
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
