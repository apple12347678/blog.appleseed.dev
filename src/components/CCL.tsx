/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import styled from '@emotion/styled';

import { ThemeProps } from '../styles/theme';

const License = styled.span<ThemeProps>`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors[500]};
`;

const CCLKo = () => (
  <License>
    <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
      <img
        alt="크리에이티브 커먼즈 라이선스"
        src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
      />
    </a>
    <br />이 저작물은{' '}
    <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
      크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스
    </a>
    에 따라 이용할 수 있습니다.
  </License>
);

const CCLEn = () => (
  <License>
    <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
      <img
        alt="Creative Commons License"
        src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
      />
    </a>
    <br />
    This work is licensed under a{' '}
    <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
      Creative Commons Attribution-ShareAlike 4.0 International License
    </a>
    .
  </License>
);

interface ICCLProps {
  language: string;
}

export default function CCL({ language }: ICCLProps) {
  return language === 'ko' ? <CCLKo /> : <CCLEn />;
}
