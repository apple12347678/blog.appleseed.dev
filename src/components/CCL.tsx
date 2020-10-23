/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import styled from '@emotion/styled';
import { Trans, useTranslation } from 'react-i18next';

import { ThemeProps } from '../styles/theme';

const License = styled.div<ThemeProps>`
  margin-bottom: 2rem;
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors[500]};
`;

export default function CCL() {
  const { t } = useTranslation();
  return (
    <License>
      <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
        <img
          alt={t('ccl.alt')}
          src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
        />
      </a>
      <br />
      <Trans t={t} i18nKey="ccl.description">
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
          CCL BY-SA 4.0
        </a>
      </Trans>
    </License>
  );
}
