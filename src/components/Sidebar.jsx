import { Link, useLocation } from "react-router-dom";

export function Sidebar({ open, setOpen, isMobile }) {
  const location = useLocation();

  const links = [
    { to: "/gerar-documentos", label: "Gerar Documentos" },
    { to: "/gerar-qrcode", label: "Gerar QR Code" },
    { to: "/gerar-senha", label: "Gerar Senha" },
    { to: "/link-whatsapp", label: "Gerar Link WhatsApp" },
    { to: "/gerar-pessoa", label: "Gerar Pessoa" },
    { to: "/formatar-json", label: "Formatar JSON" },
    { to: "/formatar-xml", label: "Formatar XML" },
    { to: "/formatar-sql", label: "Formatar SQL" },
    { to: "/visualizar-html", label: "Visualizar HTML" },
    { to: "/meu-ip", label: "Obter Meu IP" },
    { to: "/json-stringify", label: "JSON ↔ String" },
  ];

  if (isMobile) {
    return (
      <nav
        className={`
          fixed top-20 left-4 z-50
          w-56  botao-padrao rounded-2xl shadow-lg backdrop-blur-sm
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
               botao-padrao transition-colors
              ${location.pathname.includes(to.split("/")[1]) ? "botao-padrao-clicked" : ""}
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
            botao-padrao px-4 py-3 rounded-lg
            transition-transform hover:scale-105
            ${location.pathname.includes(to.split("/")[1]) ? "botao-padrao-ativo underline-style" : ""}
          `}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
