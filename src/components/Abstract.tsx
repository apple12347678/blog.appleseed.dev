import React from 'react';

import styled from '@emotion/styled';
import { Link } from 'gatsby';

import TagContainer from './TagContainer';

const AbstractContainer = styled.div`
  padding: 20px 0;
  display: block;
`;

const Title = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

interface IAbstractProps {
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
  date: Date;
  tags: string[];
}

export default function Abstract({
  title,
  slug,
  description,
  excerpt,
  date,
  tags,
}: IAbstractProps) {
  return (
    <AbstractContainer>
      <Title to={`/post${slug}`}>
        <h2>{title}</h2>
      </Title>
      <p>{date}</p>
      <p>{description}</p>
      <p>{excerpt}</p>
      <TagContainer tags={tags} />
    </AbstractContainer>
  );
}
