import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';

function InfoIcon() {
  const { t } = useTranslation();

  return (
    <span className="relative group inline-flex items-center">
      <button
        type="button"
        aria-label={t('InfoIcon')}
        className="inline-flex items-center justify-center rounded-full text-purple-400 hover:text-purple-300 transition-colors cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
      >
        <Info size={18} />
      </button>

      <span
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-3 rounded-lg text-xs leading-relaxed text-white bg-purple-900 border border-white/15 shadow-xl opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200 z-50"
      >
        🛡️ {t('InfoIcon')}
      </span>
    </span>
  );
}

export default InfoIcon;
