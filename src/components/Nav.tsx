import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  display: flex;
`;

const Prev = styled.div``;

const Next = styled(Prev)`
  margin-left: auto;
`;

interface INavProps {
  next?: string;
  prev?: string;
}

export default function Nav({ next, prev }: INavProps) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      {prev && (
        <Prev>
          <Link to={prev}>{t('word.prev')}</Link>
        </Prev>
      )}
      {next && (
        <Next>
          <Link to={next}>{t('word.next')}</Link>
        </Next>
      )}
    </Wrapper>
  );
}
