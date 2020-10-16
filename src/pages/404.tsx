import React from 'react';

import { graphql } from 'gatsby';

import { NotFoundPageDataQuery } from '../../graphql-types';
import Layout from '../components/layout';

interface INotFoundPageProps {
  data: NotFoundPageDataQuery;
  location: globalThis.Location;
}

export default function NotFoundPage({ data, location }: INotFoundPageProps) {
  const siteTitle = data.site!.siteMetadata!.title!;

  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
}

export const pageQuery = graphql`
  query NotFoundPageData {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
