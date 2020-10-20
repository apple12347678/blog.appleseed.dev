import React from 'react';

import { useTranslation } from 'gatsby-plugin-react-i18next';

import { SEO } from '../components';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO title="Not found" />
      <h1>404: Not Found</h1>
      <p>{t('404.message')}</p>
    </>
  );
}
