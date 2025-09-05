import { Outlet, Link, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";
import InfoIcon from "./components/InfoIcon";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1244);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1260);
      if (window.innerWidth >= 1244) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pathTitles = {
      "/": "Geradev",
      "/gerar-documentos": "Geradev | Gerar Documentos",
      "/gerar-qrcode": "Geradev | Gerar QR Code",
      "/formatar-json": "Geradev | Formatar JSON",
      "/formatar-xml": "Geradev | Formatar XML",
      "/visualizar-html": "Geradev | Visualizar HTML",
    };

    document.title = pathTitles[location.pathname] || "Geradev";
  }, [location]);

  return (
    <div className="h-screen flex flex-col background-default">
      <header className="py-4 px-6 flex items-center relative teste">
        {isMobile && (
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
            Geradev
          </Link>
          {!isHome && <InfoIcon />}
        </div>

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar open={open} setOpen={setOpen} isMobile={isMobile} />


        <main
          className={`
            w-full
            ${!isMobile ? 'pl-[var(--sidebar-width)]' : ''}
            transition-all duration-300
            relative
            min-h-[calc(100vh-64px)]
          `}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl flex flex-col items-center justify-center">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}

export default App;