import styled from '@emotion/styled';

import Tag from './Tag';

const TagContainerRoot = styled.div`
  margin-block-start: 1rem;
  line-height: 2;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

interface ITagContainerProps {
  tags: string[];
}

export default function TagContainer({ tags }: ITagContainerProps) {
  return (
    <TagContainerRoot>
      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </TagContainerRoot>
  );
}
