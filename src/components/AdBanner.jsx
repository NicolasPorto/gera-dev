import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const AD_CLIENT = "ca-pub-8178345912301600";
const AD_SLOT = "5660676002";

export default function AdBanner() {
  const { t } = useTranslation();
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto my-8 text-center">
      <span className="block text-[10px] uppercase tracking-widest opacity-40 text-default mb-1">
        {t("Publicidade")}
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
