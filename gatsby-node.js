const path = require('path');
const crypto = require('crypto');
const uuidV4 = require('uuid').v4;
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const BlogPost = path.resolve(`./src/templates/BlogPost.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
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

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: `/post${post.fields.slug}`,
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
  const { createNode, createNodeField, createParentChildLink } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });

    const tagNodes = getNodesByType(`Tag`);
    node.frontmatter.tags.forEach((newTag) => {
      const searchedTag = tagNodes.find((n) => n.name === newTag);
      if (searchedTag) {
        // createParentChildLink({
        //   parent: searchedTag.id,
        //   child: node.id,
        // });
      } else {
        createNode({
          name: newTag,
          id: uuidV4(),
          // children: [node.id],
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

    type Author {
      name: String!
      summary: String
      email: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
      fields: Fields!
      html: String!
    }

    type Frontmatter {
      title: String!
      description: String!
      date: Date! @dateformat
      tags: [String!]!
    }

    type Fields {
      slug: String!
    }

    type Tag implements Node {
      name: String!
    }
  `);
};
