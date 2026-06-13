import { useNavigate } from 'react-router-dom';
import { useLocale, localizePath } from '../hooks/useLocale';
import { Flag } from './Flag';

export function LanguageToggle() {
  const navigate = useNavigate();
  const { locale, logical } = useLocale();
  const isEnglish = locale === 'en';

  // Navega para a versão no outro idioma da mesma página (o App troca o i18n).
  const toggle = () => navigate(localizePath(logical, isEnglish ? 'pt' : 'en'));

  return (
    <button
      type="button"
      onClick={toggle}
      className="header-control"
      aria-label={isEnglish ? 'Mudar para português' : 'Switch to English'}
      title={isEnglish ? 'Mudar para português' : 'Switch to English'}
    >
      <Flag country={isEnglish ? 'us' : 'br'} />
      <span className="font-semibold tracking-wide">
        {isEnglish ? 'EN' : 'PT'}
      </span>
    </button>
  );
}
