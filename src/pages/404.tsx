import React from 'react';

import { Layout, SEO } from '../components';

interface INotFoundPageProps {
  location: globalThis.Location;
}

export default function NotFoundPage({ location }: INotFoundPageProps) {
  return (
    <Layout location={location}>
      <SEO title="Not found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
}
