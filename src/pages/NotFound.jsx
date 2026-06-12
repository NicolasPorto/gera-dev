import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Compass } from "lucide-react";
import { useLocale } from "../hooks/useLocale";

export default function NotFound() {
  const { t } = useTranslation();
  const { to } = useLocale();
  return (
    <div className="flex flex-col items-center text-center gap-4 py-20 px-4">
      <Compass size={56} className="text-purple-400" />
      <h1 className="text-5xl font-bold text-default">404</h1>
      <p className="text-xl font-semibold text-default">{t("NaoEncontrado")}</p>
      <p className="text-default opacity-70 max-w-md">
        {t("NaoEncontradoDesc")}
      </p>
      <Link
        to={to("/")}
        className="mt-2 default-button px-5 py-2.5 rounded-lg font-medium"
      >
        {t("VoltarHome")}
      </Link>
    </div>
  );
}
