import { Component } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
import { useLocale } from "../hooks/useLocale";

export function ErrorFallback({ onReset }) {
  const { t } = useTranslation();
  const { to } = useLocale();
  return (
    <div className="flex flex-col items-center text-center gap-4 py-16 px-4">
      <AlertTriangle size={48} className="text-orange-400" />
      <h2 className="text-2xl font-bold text-default">{t("ErroTitulo")}</h2>
      <p className="text-default opacity-70 max-w-md">
        {t("ErroDescricaoBoundary")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <button
          onClick={onReset}
          className="default-button px-4 py-2 rounded-lg font-medium"
        >
          {t("TentarNovamente")}
        </button>
        <Link
          to={to("/")}
          className="px-4 py-2 rounded-lg font-medium default-button-transparent border border-purple-600"
        >
          {t("VoltarHome")}
        </Link>
      </div>
    </div>
  );
}

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error("Tool error:", error, info);
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) return <ErrorFallback onReset={this.reset} />;
    return this.props.children;
  }
}
