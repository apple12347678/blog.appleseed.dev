import { GatsbyNode } from 'gatsby';

const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({
  actions: { createTypes },
}) => {
  createTypes(`
    type SiteSiteMetadata {
      title: String!
      author: Author!
      siteUrl: String
    }

    type SitePageContext {
      language: String!
      postsPerPage: Int!
      isLastPage: Boolean
    }

    type Author {
      name: String!
      summary: String
      email: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
      fields: Fields!
      html: String!
      timeToRead: Int!
    }

    type Frontmatter {
      title: String!
      description: String
      date: Date! @dateformat
      tags: [String!]!
      draft: Boolean
    }

    type Fields {
      slug: String!
      lang: String!
    }

    type Tag implements Node {
      name: String!
    }
  `);
};

export default createSchemaCustomization;
