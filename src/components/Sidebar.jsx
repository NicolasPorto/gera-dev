import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export function Sidebar({ open, setOpen, reduceComponents }) {
  const location = useLocation();
  const { t } = useTranslation();

  const links = [
    { to: "/gerar-documentos", label: t("GerarDocumentos") },
    { to: "/gerar-qrcode", label: t("GerarQRCode") },
    { to: "/gerar-senha", label: t("GerarSenha") },
    { to: "/link-whatsapp", label: t("GerarLinkWhatsApp") },
    { to: "/gerar-pessoa", label: t("GerarPessoa") },
    { to: "/formatar-json", label: t("FormatarJSON") },
    { to: "/formatar-xml", label: t("FormatarXML") },
    { to: "/formatar-sql", label: t("FormatarSQL") },
    { to: "/visualizar-html", label: t("VisualizarHTML") },
    { to: "/meu-ip", label: t("MeuIP") },
    { to: "/json-stringify", label: t("JsonString") },
    { to: "/url-encode-decode", label: t("DecodificarCodificar") },
  ];

  if (reduceComponents) {
    return (
      <nav
        className={`
          fixed top-20 left-4 z-50
          w-56  default-button rounded-2xl shadow-lg backdrop-blur-sm
          transform transition-transform duration-300
          ${open ? "translate-x-0 opacity-100" : "-translate-x-80 opacity-0"}
          flex flex-col p-3 gap-1
        `}
      >
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg
              text-sm text-white font-medium
               default-button transition-colors
              ${location.pathname.includes(to.split("/")[1]) ? "default-button-clicked" : ""}
            `}
          >
            {label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav
      className={`
        fixed left-0 top-0 h-full z-40
        w-[var(--sidebar-width)] bg-transparent
        pt-20 px-4 flex flex-col gap-2 justify-center
      `}
    >
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={`
            font-medium
            default-button px-4 py-3 rounded-lg
            transition-transform hover:scale-105
            ${location.pathname.includes(to.split("/")[1]) ? "default-button-active underline-style" : ""}
          `}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
