const path = require('path');
const crypto = require('crypto');
const uuidV4 = require('uuid').v4;
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const BlogPost = path.resolve(`./src/templates/BlogPost.tsx`);

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          ${
            process.env.NODE_ENV === 'production'
              ? 'filter: {frontmatter: {draft: {ne: true}}}'
              : ''
          }
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    );
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;

  /* TODO get different pages for different lang */
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: BlogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode, getNodesByType }) => {
  const { createNode, createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const filePath = createFilePath({ node, getNode });

    const match = filePath.match(/^\/(.*)\/(ko|en)\/$/);

    createNodeField({
      name: 'slug',
      node,
      value: `${match[2] === 'ko' ? '' : `/${match[2]}`}/post/${match[1]}/`,
    });
    createNodeField({
      name: 'lang',
      node,
      value: match[2],
    });

    const tagNodes = getNodesByType(`Tag`);
    node.frontmatter.tags.forEach((newTag) => {
      const searchedTag = tagNodes.find((n) => n.name === newTag);
      if (!searchedTag) {
        createNode({
          name: newTag,
          id: uuidV4(),
          internal: {
            type: `Tag`,
            contentDigest: crypto
              .createHash(`md5`)
              .update(newTag)
              .digest(`hex`),
          },
        });
      }
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type SiteSiteMetadata {
      title: String!
      author: Author!
      siteUrl: String
    }

    type SitePageContext {
      language: String!
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
