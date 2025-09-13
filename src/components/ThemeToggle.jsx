import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function ThemeToggle({ reduceComponents }) {
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'white') {
      setIsWhiteTheme(true);
      document.documentElement.setAttribute('data-theme', 'white');
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

  return (
    <button
      onClick={toggleTheme}
      className={`default-button rounded flex items-center justify-center
        ${reduceComponents ? 'px-2 py-1' : 'px-4 py-2'}`}
      title={isWhiteTheme ? t("MudarParaTemaEscuro") : t("MudarParaTemaClaro")}
    >
      {isWhiteTheme ? (
        <svg
          className={`text-gray-800 dark:text-white ${reduceComponents ? 'w-4 h-4' : 'w-6 h-6'}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
        </svg>
      ) : (
        <svg
          className={`text-gray-800 dark:text-white ${reduceComponents ? 'w-4 h-4' : 'w-6 h-6'}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
        </svg>
      )}
    </button>
  );
}
