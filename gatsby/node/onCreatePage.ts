import { GatsbyNode } from 'gatsby';

const onCreatePage: GatsbyNode['onCreatePage'] = ({
  page,
  actions: { createPage, deletePage },
}) => {
  deletePage(page);
  createPage({
    ...page,
    context: {
      ...page.context,
      postsPerPage: parseInt(process.env.POSTS_PER_PAGE || '5', 10),
    },
  });
};

export default onCreatePage;
