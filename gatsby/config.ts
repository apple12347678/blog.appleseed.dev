/* eslint-disable @typescript-eslint/naming-convention,@typescript-eslint/no-unsafe-return */
import { GatsbyConfig } from 'gatsby';
import path from 'path';

const root = path.dirname(__dirname);

const config: GatsbyConfig = {
  siteMetadata: {
    title: "appleseed's dev blog",
    author: {
      name: 'Chankyu Kang',
      summary: 'A typescript developer, junior system architect',
      email: 'apple12347678@gmail.com',
    },
    description: 'A dev blog of appleseed',
    site_url: 'https://blog.appleseed.dev',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        documentPaths: [`./src/**/*.{ts,tsx}`, `./gatsby/**/*.{ts,tsx}`],
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${root}/content/post`,
        name: 'post',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${root}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${root}/content/locale`,
        name: 'locale',
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locale',
        languages: ['en', 'ko'],
        defaultLanguage: 'ko',
        siteUrl: 'https://blog.appleseed.dev/',
        i18nextOptions: {
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
        redirect: false,
        pages: [
          {
            matchPath: '/:lang?/post/:slug',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/:lang?/page/:index',
            getLanguageFromPath: true,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 630,
              wrapperStyle: 'margin: 2rem auto;',
              showCaptions: true,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-footnotes',
            options: {
              footnoteBackRefPreviousElementDisplay: 'inline',
              footnoteBackRefDisplay: 'inline',
              footnoteBackRefInnerText: '^',
              footnoteBackRefInnerTextStartPosition: 'front',
            },
          },
          'gatsby-remark-katex',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                site_url
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map((edge) => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                url: `${site.siteMetadata.site_url}${edge.node.fields.slug}`,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })),
            query: `
              {
                allMarkdownRemark {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'RSS for blog.appleseed.dev',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /src\/assets\/.*\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "appleseed's dev blog",
        short_name: 'appleseed',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#17181c',
        display: 'minimal-ui',
        icons: [
          {
            src: 'icons/android-icon-36x36.png',
            sizes: '36x36',
            type: 'image/png',
          },
          {
            src: 'icons/android-icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'icons/android-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/android-icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/android-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-180825431-1',
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['IBM Plex Sans:400,600'],
        },
      },
    },
    'gatsby-plugin-webpack-bundle-analyser-v2',
  ],
};

export default config;
