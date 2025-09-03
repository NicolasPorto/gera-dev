import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();

  const baseStyle = "px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 botao-padrao";
  
  const activeStyle = "botao-padrao-ativo relative";
  
  const underlineStyle = "underline-style";
  
  const hoverStyle = "hover:scale-105 transition-transform";

  return (
    <nav className="w-55 p-4 flex flex-col gap-2  z-50">      
      <Link
        to="/gerar-documentos"
        className={`${baseStyle} ${hoverStyle} ${
          location.pathname.includes("gerar-documentos") 
            ? `${activeStyle} ${underlineStyle}`
            : ""
        }`}
      >
        Gerar Documentos
      </Link>
      
      <Link
        to="/formatar-json"
        className={`${baseStyle} ${hoverStyle} ${
          location.pathname.includes("formatar-json") 
            ? `${activeStyle} ${underlineStyle}`
            : ""
        }`}
      >
        Formatar JSON
      </Link>
      
      <Link
        to="/xml"
        className={`${baseStyle} ${hoverStyle} ${
          location.pathname.includes("xml") 
            ? `${activeStyle} ${underlineStyle}`
            : ""
        }`}
      >
        Formatar XML
      </Link>
      
      <Link
        to="/gerar-qrcode"
        className={`${baseStyle} ${hoverStyle} ${
          location.pathname.includes("gerar-qrcode") 
            ? `${activeStyle} ${underlineStyle}`
            : ""
        }`}
      >
        Gerar QR Code
      </Link>
    </nav>
  );
}