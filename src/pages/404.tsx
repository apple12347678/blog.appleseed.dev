import React from 'react';

import { useTranslation } from 'gatsby-plugin-react-i18next';

import { SitePageContext } from '../../graphql-types';
import { Layout, SEO } from '../components';

interface INotFoundPageProps {
  pathContext: SitePageContext;
}

export default function NotFoundPage({
  pathContext: { language },
}: INotFoundPageProps) {
  const { t } = useTranslation();
  return (
    <Layout language={language}>
      <SEO title="Not found" />
      <h1>404: Not Found</h1>
      <p>{t('404.message')}</p>
    </Layout>
  );
}
