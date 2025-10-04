import { Outlet, Link, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageToggle } from "./components/LanguageToggle";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from 'react-i18next';
import InfoIcon from "./components/InfoIcon";

function App() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const [reduceComponents, setReduceComponents] = useState(window.innerWidth < 1320 || window.innerHeight < 720);

  useEffect(() => {
    const handleResize = () => {
      setReduceComponents(window.innerWidth < 1320 || window.innerHeight < 720);

      if (window.innerWidth >= 1320 || window.innerHeight >= 720) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pathTitles = {
      "/": 'GeraDev',
      "/gerar-documentos": `GeraDev | ${t("DescGerarDocumentos")}`,
      "/gerar-qrcode": `GeraDev | ${t("DescGerarQRCode")}`,
      "/gerar-senha": `GeraDev | ${t("DescGerarSenha")}`,
      "/link-whatsapp": `GeraDev | ${t("DescGerarLinkWhatsApp")}`,
      "/gerar-pessoa": `GeraDev | ${t("DescGerarPessoa")}`,
      "/formatar-json": `GeraDev | ${t("DescFormatarJSON")}`,
      "/formatar-xml": `GeraDev | ${t("DescFormatarXML")}`,
      "/visualizar-html": `GeraDev | ${t("DescVisualizarHTML")}`,
      "/formatar-sql": `GeraDev | ${t("FormatarSQL")}`,
      "/meu-ip": `GeraDev | ${t("DescMeuIP")}`,
      "/json-stringify": `GeraDev | ${t("JsonString")}`,
      "/url-encode-decode": `GeraDev | ${t("DecodificarCodificar")}`,
      "/calculo-hora-extra": `GeraDev | ${t("CalculoHoraExtra")}`,
      "/conversor-json-class": `GeraDev | ${t("JsonClass")}`,
      "/base64-encode-decode": `GeraDev | ${t("Base64EncodeDecode")}`,
      "/gerar-hash": `GeraDev | ${t("GerarHash")}`,
      "/jwt-encode-decode": `GeraDev | ${t("JWTEncodeDecode")}`,
      "/string-utilities": `GeraDev | ${t("Padronizador de Texto")}`,
      "/conversor-base64-arquivo": `GeraDev | ${t("Base64Arquivo")}`
    };
    document.title = pathTitles[location.pathname] || "GeraDev";
  }, [location, t, i18n.language]);

  return (
    <div className="h-screen flex flex-col background-default">
      <header className="py-4 px-6 flex items-center relative">
        {reduceComponents && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <button
              className="text-default"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        )}

        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-default absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            GeraDev
          </Link>
          {!isHome && <InfoIcon />}
        </div>

        <div className="ml-auto flex gap-2">
          <ThemeToggle reduceComponents={reduceComponents} />
          <LanguageToggle reduceComponents={reduceComponents} />
        </div>
      </header>

      <div className="flex flex-1 relative">
        <Sidebar open={open} setOpen={setOpen} reduceComponents={reduceComponents} />

        <main
          className={`
            flex-1
            transition-all duration-300
            flex items-center justify-center
          `}
        >
          <div className="w-full max-w-4xl flex flex-col items-center justify-center p-4">
            <Outlet />
          </div>
        </main>
      </div>

      {!isHome && (
        <footer
          className={`
            py-4 text-center
          `}
        >
          <div className="text-gray-400 text-footer opacity-70 hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col items-center sm:flex-row justify-center">
              <span className="text-[10px] sm:text-xs font-light mb-1 sm:mb-0 sm:mr-1">
                2025 © {t("DesenvolvidoPor")}
                <a
                  href="https://github.com/NicolasPorto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-xs font-medium hover:underline mx-1 transition-all"
                >
                Nicolas Porto
                </a>
                {t("e")}
                <a
                  href="https://github.com/LuisQuintino"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-xs font-medium hover:underline mx-1 transition-all"
                >
                Luis Venturini
                </a>
              </span>
            </div>
          </div>
        </footer>
      )}

    </div>

  );
}

export default App;