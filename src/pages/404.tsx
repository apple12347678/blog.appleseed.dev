import React from 'react';

import { useTranslation } from 'react-i18next';

import { Layout, SEO } from '../components';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <SEO title="Not found" />
      <h1>404: Not Found</h1>
      <p>{t('404.message')}</p>
    </Layout>
  );
}
