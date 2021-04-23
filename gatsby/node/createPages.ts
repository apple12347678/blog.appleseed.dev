import { GatsbyNode } from 'gatsby';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const assertResult = (obj: any): obj is { data: any } =>
  obj.errors === undefined;

const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE || '5', 10);
  const BlogPost = path.resolve('./src/templates/BlogPost.tsx');
  const Page = path.resolve('./src/templates/Page.tsx');

  const mdResult = await graphql(
    `
      {
        allMarkdownRemark(
          ${
            process.env.NODE_ENV === 'production'
              ? 'filter: { frontmatter: { draft: { ne: true } } }'
              : ''
          }
          sort: { fields: [frontmatter___date], order: DESC }
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

  if (!assertResult(mdResult)) {
    reporter.panicOnBuild(
      'There was an error loading your blog posts',
      mdResult.errors,
    );
    return;
  }

  const posts = mdResult.data.allMarkdownRemark.nodes;

  if (posts.length > 0) {
    posts.forEach((post, index: number) => {
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

  await Promise.all(
    ['ko', 'en'].map(async (lang) => {
      const langResult = await graphql(
        `
          {
            allMarkdownRemark(
              filter: {
                frontmatter: { draft: { ne: true } }
                fields: { lang: { eq: "${lang}" } }
              }
              sort: { fields: [frontmatter___date], order: DESC }
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
          }
        `,
      );
      if (!assertResult(langResult)) {
        reporter.panicOnBuild(
          'There was an error loading your pages',
          langResult.errors,
        );
        return;
      }
      const langPosts = langResult.data.allMarkdownRemark.nodes;
      if (langPosts.length === 0) {
        return;
      }
      for (let i = 1; i * postsPerPage < langPosts.length; i += 1) {
        createPage({
          path: `${lang === 'ko' ? '' : '/en'}/page/${i}`,
          component: Page,
          context: {
            posts: langPosts.slice(i * postsPerPage, (i + 1) * postsPerPage),
            pageIndex: i,
            isLastPage: (i + 1) * postsPerPage >= langPosts.length,
          },
        });
      }
    }),
  );
};

export default createPages;
