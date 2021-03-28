import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

import { HomeDataQuery } from '../../graphql-types';
import { Abstract, Banner, Container, Nav, SEO } from '../components';

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
        <Banner image={data.file!.childImageSharp!.gatsbyImageData} />
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
        {data.allSitePage.nodes.length !== 0 && <Nav next="/page/1" />}
      </Container>
    </>
  );
}

export const query = graphql`
  query HomeData($language: String!, $postsPerPage: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { draft: { ne: true } }
        fields: { lang: { eq: $language } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $postsPerPage
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
    allSitePage(
      filter: {
        path: { regex: "//page//" }
        context: { language: { eq: $language } }
      }
    ) {
      nodes {
        path
      }
    }
  }
`;
