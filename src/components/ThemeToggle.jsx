import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
    const useWhite = savedTheme ? savedTheme === 'white' : prefersLight;

    if (useWhite) {
      setIsWhiteTheme(true);
      document.documentElement.setAttribute('data-theme', 'white');
    } else {
      setIsWhiteTheme(false);
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isWhiteTheme;
    setIsWhiteTheme(newTheme);

    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'white');
      localStorage.setItem('theme', 'white');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'black');
    }
  };

  const label = isWhiteTheme ? t('MudarParaTemaEscuro') : t('MudarParaTemaClaro');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="header-control"
      aria-label={label}
      title={label}
    >
      <span className="relative inline-flex w-5 h-5 items-center justify-center">
        <Sun
          size={18}
          className={`absolute transition-all duration-300 ${
            isWhiteTheme ? 'opacity-0 scale-50 -rotate-90' : 'opacity-100 scale-100 rotate-0'
          }`}
        />
        <Moon
          size={18}
          className={`absolute transition-all duration-300 ${
            isWhiteTheme ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'
          }`}
        />
      </span>
    </button>
  );
}
