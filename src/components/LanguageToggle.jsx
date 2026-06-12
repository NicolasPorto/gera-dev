import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language?.startsWith('en');

  const toggle = () => i18n.changeLanguage(isEnglish ? 'pt' : 'en');

  return (
    <button
      type="button"
      onClick={toggle}
      className="header-control"
      aria-label={isEnglish ? 'Mudar para português' : 'Switch to English'}
      title={isEnglish ? 'Mudar para português' : 'Switch to English'}
    >
      <span
        className={`fi ${isEnglish ? 'fi-us' : 'fi-br'} rounded-sm`}
        style={{ fontSize: '1.1rem', lineHeight: 1 }}
        aria-hidden="true"
      />
      <span className="font-semibold tracking-wide">
        {isEnglish ? 'EN' : 'PT'}
      </span>
    </button>
  );
}
