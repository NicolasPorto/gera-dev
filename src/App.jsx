import { Outlet, Link, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import InfoIcon from "./components/InfoIcon";
import Otter from "./assets/Otter";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const [reduzirSidebar, setReduzirSidebar] = useState(window.innerWidth < 1320 || window.innerHeight < 720);

  useEffect(() => {
    const handleResize = () => {
      setReduzirSidebar(window.innerWidth < 1320 || window.innerHeight < 720);
      console.log(open)
      if (window.innerWidth >= 1320 || window.innerHeight >= 720) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pathTitles = {
      "/": "GeraDev",
      "/gerar-documentos": "GeraDev | Gerar Documentos",
      "/gerar-qrcode": "GeraDev | Gerar QR Code",
      "/gerar-senha": "GeraDev | Gerar Senha",
      "/link-whatsapp": "GeraDev | Link WhatsApp",
      "/gerar-pessoa": "GeraDev | Gerar Pessoa",
      "/formatar-json": "GeraDev | Formatar JSON",
      "/formatar-xml": "GeraDev | Formatar XML",
      "/visualizar-html": "GeraDev | Visualizar HTML",
      "/meu-ip": "GeraDev | Meu IP"
    };

    document.title = pathTitles[location.pathname] || "GeraDev";
  }, [location]);

  return (
    <div className="h-screen flex flex-col background-default">
      <header className="py-4 px-6 flex items-center relative">
        {reduzirSidebar && (
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

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 relative">
        <Sidebar open={open} setOpen={setOpen} reduzirSidebar={reduzirSidebar} />

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

      <footer
        className={`
      py-4 text-center
    `}
      >
        <div className="text-gray-400 dark:text-purple-300 opacity-70 hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col items-center sm:flex-row justify-center">
            <span className="text-[10px] sm:text-xs font-light mb-1 sm:mb-0 sm:mr-1">
              Desenvolvido por{" "}
            </span>
            <div className="flex">
              <a
                href="https://github.com/NicolasPorto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs font-medium hover:underline mx-1 transition-all"
              >
                Nicolas Porto
              </a>
              <span className="text-[10px] sm:text-xs font-light mx-1">e</span>
              <a
                href="https://github.com/LuisQuintino"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs font-medium hover:underline mx-1 transition-all"
              >
                Luis Venturini
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
}

export default App;