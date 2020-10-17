import React from 'react';

import styled from '@emotion/styled';
import { Link } from 'gatsby';

interface IColorProps {
  $hue: number;
}

const TagRoot = styled(Link)<IColorProps>`
  height: 24px;
  padding: 0 8px;
  background-color: hsl(${(props) => props.$hue}, 40%, 90%);
  border-radius: 10px;
  display: inline-block;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 0.9;
  }
`;

const TagTextWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const TagText = styled.span<IColorProps>`
  color: hsl(${(props) => props.$hue}, 80%, 10%);
  font-size: 12px;
  font-weight: 600;
  user-select: none;
`;

interface ITagProps {
  name: string;
  to: string;
}

function Tag({ name, to }: ITagProps) {
  const hue =
    Array.from(name).reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 360;
  return (
    <TagRoot $hue={hue} to={to}>
      <TagTextWrapper>
        <TagText $hue={hue}>{name}</TagText>
      </TagTextWrapper>
    </TagRoot>
  );
}

export default React.memo(Tag);
