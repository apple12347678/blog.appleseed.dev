import { ComponentProps } from 'react';

import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Trans, useTranslation } from 'react-i18next';

const BannerContainer = styled.div`
  padding: 60px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 720px) {
    padding: 20px 10px;
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled(GatsbyImage)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
`;

const TextContainer = styled.div`
  flex: 1;
  margin-left: 40px;
  @media (max-width: 720px) {
    margin-left: 0;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-block-start: 0.5em;
  @media (max-width: 720px) {
    margin-block-start: 1em;
    font-size: 1.5rem;
  }
`;

interface IBannerProps {
  image: ComponentProps<typeof GatsbyImage>['image'];
}

export default function Banner({ image }: IBannerProps) {
  const { t } = useTranslation();
  return (
    <BannerContainer>
      <Avatar alt="" image={image} />
      <TextContainer>
        <Title>
          <Trans i18nKey="index.title">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,jsx-a11y/anchor-has-content */}
            <a href="https://appleseed.dev" />
          </Trans>
        </Title>
        <p>{t('index.introduction')}</p>
      </TextContainer>
    </BannerContainer>
  );
}
