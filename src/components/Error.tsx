import { useTranslation } from 'react-i18next';

export default function Error() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>Oops! :(</h1>
      <p>{t('500.message')}</p>
    </div>
  );
}
