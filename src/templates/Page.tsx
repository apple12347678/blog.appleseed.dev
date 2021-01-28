import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { HomeDataQuery } from '../../graphql-types';
import { Abstract, Container, SEO } from '../components';

const Title = styled.h1`
  font-size: 3rem;
  margin: 4rem 0 2rem;
`;

interface IPageTemplateProps {
  pageContext: {
    posts: HomeDataQuery['allMarkdownRemark']['nodes'];
    pageIndex: number;
  };
}

export default function PageTemplate({
  pageContext: { posts, pageIndex },
}: IPageTemplateProps) {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={`Page ${pageIndex}`} />
      <Container>
        <Title>{`Page ${pageIndex}`}</Title>
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
