import React from 'react';

import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import { ThemeProps } from '../styles/theme';
import TagContainer from './TagContainer';

const AbstractContainer = styled.div`
  padding: 20px 0;
  display: block;
`;

const Title = styled(Link)<ThemeProps>`
  color: var(--color-100);
  &:hover {
    text-decoration: none;
  }
`;

const DescriptionText = styled.span<ThemeProps>`
  display: block;
  font-size: 0.85rem;
  color: var(--color-300);
  margin: 4px 0;
`;

interface IAbstractProps {
  title: string;
  slug: string;
  description?: string | null;
  excerpt?: string;
  date: Date;
  timeToRead: number;
  tags: string[];
}

export default function Abstract({
  title,
  slug,
  description = '',
  excerpt,
  date,
  timeToRead,
  tags,
}: IAbstractProps) {
  const { t } = useTranslation();
  return (
    <AbstractContainer>
      <h2>
        <Title to={slug}>{title}</Title>
      </h2>
      {description && <DescriptionText>{description}</DescriptionText>}
      <DescriptionText>
        {`${date} · ${t('abstract.timeToRead', { timeToRead })}`}
      </DescriptionText>
      <p>{excerpt}</p>
      <TagContainer tags={tags} />
    </AbstractContainer>
  );
}
