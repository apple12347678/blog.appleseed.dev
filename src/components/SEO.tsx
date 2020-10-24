import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Helmet, useI18next } from 'gatsby-plugin-react-i18next';

import { SeoDataQuery } from '../../graphql-types';

type TMetaProps = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>;

interface ISEOProps {
  title: string;
  meta?: TMetaProps[];
}

export default function SEO({ title, meta = [] }: ISEOProps) {
  const { site }: SeoDataQuery = useStaticQuery(
    graphql`
      query SEOData {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `,
  );
  const { language: lang } = useI18next();

  const metaDescription = site?.siteMetadata?.description || '';
  const defaultTitle: string = site?.siteMetadata?.title || 'Title';

  const defaultMeta: TMetaProps[] = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content: 'https://blog.appleseed.dev/banner.png',
    },
  ];

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={defaultMeta.concat(...meta)}
    />
  );
}
