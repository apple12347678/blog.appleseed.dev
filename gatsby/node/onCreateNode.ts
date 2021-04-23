import crypto from 'crypto';
import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { v4 as uuidV4 } from 'uuid';

const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions: { createNode, createNodeField },
  reporter,
  getNode,
  getNodesByType,
}) => {
  if (node.internal.type === 'MarkdownRemark') {
    const filePath = createFilePath({ node, getNode });

    const match = /^\/(.*)\/(ko|en)\/$/.exec(filePath);
    if (!match) {
      reporter.panicOnBuild(`Match failure for markdown node's file path`);
      return;
    }

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

    const tagNodes = getNodesByType('Tag');
    (node.frontmatter as any).tags.forEach((newTag) => {
      const searchedTag = tagNodes.find((n) => n.name === newTag);
      if (!searchedTag) {
        createNode({
          name: newTag,
          id: uuidV4(),
          internal: {
            type: 'Tag',
            contentDigest: crypto
              .createHash('md5')
              .update(newTag)
              .digest('hex'),
          },
        });
      }
    });
  }
};

export default onCreateNode;
