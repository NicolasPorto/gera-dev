import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IconButton } from "./IconButton";

export function ShareButton({ getUrl, className }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível: ignora */
    }
  };

  return (
    <IconButton
      label={copied ? t("LinkCopiado") : t("Compartilhar")}
      onClick={onShare}
      className={
        className ||
        "px-8 py-3 rounded-lg font-medium default-button-active hover:scale-105 transition-transform"
      }
    >
      {copied ? <Check size={20} /> : <Share2 size={20} />}
    </IconButton>
  );
}
