import styled from '@emotion/styled';

import { ThemeProps } from '../styles/style';

export default styled.div<ThemeProps>`
  max-width: ${(props) => props.theme.breakpoints.sm}px;
  margin: 0 auto;
`;
