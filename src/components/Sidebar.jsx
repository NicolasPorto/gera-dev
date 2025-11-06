import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

export function Sidebar({ open, setOpen, reduceComponents }) {
  const location = useLocation();
  const { t } = useTranslation();

  const sections = [
    {
      title: t("Geradores"),
      key: "generators",
      links: [
        { to: "/gerar-documentos", label: t("GerarDocumentos") },
        { to: "/gerar-qrcode", label: t("GerarQRCode") },
        { to: "/gerar-senha", label: t("GerarSenha") },
        { to: "/link-whatsapp", label: t("GerarLinkWhatsApp") },
        { to: "/gerar-pessoa", label: t("GerarPessoa") },
        { to: "/gerar-hash", label: t("GerarHash") },
        { to: "/guid-generator", label: t("GerarGuid") },
      ],
    },
    {
      title: t("Formatadores"),
      key: "formatters",
      links: [
        { to: "/formatar-json", label: t("FormatarJSON") },
        { to: "/formatar-xml", label: t("FormatarXML") },
        { to: "/formatar-sql", label: t("FormatarSQL") }
      ],
    },
    {
      title: t("Conversores"),
      key: "converters",
      links: [
        { to: "/conversor-json-class", label: t("JsonClass") },
        { to: "/json-stringify", label: t("JsonString") },
        { to: "/conversor-base64-arquivo", label: t("Base64Arquivo") },
      ],
    },
    {
      title: t("Encode/Decode"),
      key: "stringFunctions",
      links: [
        { to: "/url-encode-decode", label: t("DecodificarCodificar") },
        { to: "/base64-encode-decode", label: t("Base64EncodeDecode") },
        { to: "/jwt-encode-decode", label: t("JWTEncodeDecode") }
      ],
    },
    {
      title: t("Rede"),
      key: "network",
      links: [
        { to: "/meu-ip", label: t("MeuIP") }
      ],
    },
    {
      title: t("Utilidades"),
      key: "utilities",
      links: [
        { to: "/visualizar-html", label: t("VisualizarHTML") },
        { to: "/calculo-hora-extra", label: t("CalculoHoraExtra") },
        { to: "/string-utilities", label: t("Padronizador de Texto") }
      ],
    },
  ];

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setOpenSections({});
      return;
    }

    sections.forEach(({ key, links }) => {
      if (links.some((link) => path.startsWith(link.to))) {
        setOpenSections((prev) => ({ ...prev, [key]: true }));
      }
    });
  }, [location.pathname]);

  const Icon = ({ open }) => (
    <span className={`chev ${open ? "rotated" : ""}`} aria-hidden>
      <ChevronRight size={18} />
    </span>
  );

  const ITEM_HEIGHT_PX = 67;

  if (reduceComponents) {
    return (
      <nav
        className={`
          fixed top-20 left-4 z-50
          w-56 default-button rounded-2xl shadow-lg backdrop-blur-sm
          transform transition-transform duration-300
          ${open ? "translate-x-0 opacity-100" : "-translate-x-80 opacity-0"}
          flex flex-col p-3 gap-2 custom-scrollbar overflow-y-auto
        `}
      >
        {sections.map(({ title, key, links }, i) => {
          const id = `sec-compact-${i}`;
          return (
            <div key={key}>
              <button
                onClick={() => toggleSection(key)}
                aria-expanded={!!openSections[key]}
                aria-controls={id}
                className="flex justify-between items-center w-full text-left px-3 py-2 rounded-lg font-semibold text-white hover:bg-purple-700 transition"
              >
                {title}
                <Icon open={!!openSections[key]} />
              </button>

              <div
                id={id}
                className={`sidebar-collapse ${openSections[key] ? "open" : ""}`}
                style={{ ["--acc-max"]: `${links.length * ITEM_HEIGHT_PX}px` }}
              >
                <div className="collapse-content pl-3 flex flex-col gap-1 mt-1">
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
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      className={`
        fixed left-0 top-1/2 -translate-y-1/2 z-40
        w-[var(--sidebar-width)] bg-transparent
        px-4 flex flex-col gap-4 justify-center custom-scrollbar overflow-y-auto
        pt-6
      `}
    >
      {sections.map(({ title, key, links }, i) => {
        const id = `sec-normal-${i}`;
        return (
          <div key={key}>
            <button
              onClick={() => toggleSection(key)}
              aria-expanded={!!openSections[key]}
              aria-controls={id}
              className="flex justify-between items-center w-full text-left px-4 py-3 rounded-lg font-semibold text-white default-button hover:bg-purple-700 transition default-button-sidebar"
            >
              {title}
              <Icon open={!!openSections[key]} />
            </button>

            <div
              id={id}
              className={`sidebar-collapse ${openSections[key] ? "open" : ""}`}
              style={{ ["--acc-max"]: `${links.length * ITEM_HEIGHT_PX}px` }}
            >
              <div className="collapse-content pl-4 flex flex-col gap-2 mt-2">
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
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
