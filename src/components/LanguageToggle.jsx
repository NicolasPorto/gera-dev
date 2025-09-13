import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
    const { i18n } = useTranslation();
    const [isEnglish, setIsEnglish] = useState(i18n.language === 'en');
    const currentLanguage = i18n.language;

    const changeLanguage = () => {
        const newLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
        i18n.changeLanguage(newLanguage);
        setIsEnglish(newLanguage === 'en');
    };

    return (
        <button
            onClick={changeLanguage}
            className="default-button px-2 py-1 rounded flex items-center justify-center"
            title={isEnglish ? 'Change to English' : 'Mudar para português'}
        >
            {isEnglish ? (
                <span className="fi fi-us hover:opacity-50 transition-opacity duration-300" style={{ fontSize: '2rem' }}></span>
            ) : (
                <span className="fi fi-br hover:opacity-50 transition-opacity duration-300" style={{ fontSize: '2rem' }}></span>
            )}
        </button>
    );
}