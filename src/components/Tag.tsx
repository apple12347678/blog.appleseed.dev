import { memo } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { useTagHue } from '../hooks';

interface IColorProps {
  $hue: number;
}

const tagRootCss = (props: IColorProps) => css`
  height: 24px;
  padding: 0 10px;
  background-color: hsl(${props.$hue}, 40%, 90%);
  border-radius: 12px;
  display: inline-block;
  transition: opacity 0.5s ease;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
`;

const TagRootLink = styled(Link)<IColorProps>`
  ${tagRootCss}
  cursor: pointer;
`;

const TagRootDiv = styled.div<IColorProps>`
  ${tagRootCss}
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
  to?: string;
}

function Tag({ name, to }: ITagProps) {
  const hue = useTagHue(name);
  if (to) {
    return (
      <TagRootLink $hue={hue} to={to}>
        <TagTextWrapper>
          <TagText $hue={hue}>{name}</TagText>
        </TagTextWrapper>
      </TagRootLink>
    );
  }
  return (
    <TagRootDiv $hue={hue}>
      <TagTextWrapper>
        <TagText $hue={hue}>{name}</TagText>
      </TagTextWrapper>
    </TagRootDiv>
  );
}

export default memo(Tag);
