import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageToggle({ reduceComponents }) {
  const { i18n } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18n.language === 'en');
  const currentLanguage = i18n.language;

  const changeLanguage = () => {
    const newLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLanguage);
    setIsEnglish(newLanguage === 'en');
  };

  const flagSize = reduceComponents ? '1.6rem' : '2.4rem';
  const buttonPadding = reduceComponents ? '0.25rem' : '0.5rem';

  return (
    <button
      onClick={changeLanguage}
      className="rounded flex items-center justify-center"
      title={isEnglish ? 'Change to English' : 'Mudar para português'}
    >
      {isEnglish ? (
        <span
          className="fi fi-us hover:opacity-60 transition-opacity duration-300 rounded cursor-pointer default-button"
          style={{ fontSize: flagSize }}
        ></span>
      ) : (
        <span
          className="fi fi-br hover:opacity-60 transition-opacity duration-300 rounded cursor-pointer default-button"
          style={{ fontSize: flagSize }}
        ></span>
      )}
    </button>
  );
}
