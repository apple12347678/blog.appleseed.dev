import React from 'react';

import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

import { BlogPostBySlugQuery } from '../../graphql-types';
import {
  CCL,
  Container,
  Error,
  Layout,
  SEO,
  TagContainer,
} from '../components';
import { ThemeProps } from '../styles/theme';

const BlogPostTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;

const DescriptionText = styled.span<ThemeProps>`
  display: block;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors[300]};
  margin: 4px 0;
`;

const BlogPostBody = styled.section`
  margin: 4rem 0;
`;

interface IBlogPostTemplateProps {
  data: BlogPostBySlugQuery;
}

export default function BlogPostTemplate({ data }: IBlogPostTemplateProps) {
  const { t } = useTranslation();
  const post = data.markdownRemark;
  if (!post) {
    return (
      <Layout>
        <Error />
      </Layout>
    );
  }
  const { tags } = post.frontmatter;
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <Container>
        <article itemScope itemType="http://schema.org/Article">
          <header>
            <BlogPostTitle itemProp="headline">
              {post.frontmatter.title}
            </BlogPostTitle>
            <p>{post.frontmatter.description}</p>
            <DescriptionText>{post.frontmatter.date}</DescriptionText>
            <DescriptionText>
              {t('abstract.timeToRead', { timeToRead: post.timeToRead })}
            </DescriptionText>
            <TagContainer tags={tags} />
          </header>
          {/* eslint-disable react/no-danger,@typescript-eslint/naming-convention */}
          <BlogPostBody
            dangerouslySetInnerHTML={{ __html: post.html || '' }}
            itemProp="articleBody"
          />
          {/* eslint-enable react/no-danger,@typescript-eslint/naming-convention */}
        </article>
        <CCL />
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
      timeToRead
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
