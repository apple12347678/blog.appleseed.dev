import React from 'react';

import { useTranslation } from 'gatsby-plugin-react-i18next';
import { PageContext } from 'gatsby-plugin-react-i18next/dist/types';

import { Layout, SEO } from '../components';

interface INotFoundPageProps {
  pathContext: PageContext;
}

export default function NotFoundPage({ pathContext }: INotFoundPageProps) {
  const { t } = useTranslation();
  return (
    <Layout pathContext={pathContext}>
      <SEO title="Not found" />
      <h1>404: Not Found</h1>
      <p>{t('404.message')}</p>
    </Layout>
  );
}
