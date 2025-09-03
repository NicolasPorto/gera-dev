import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();

  const baseStyle = "px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 botao-padrao";
  
  const activeStyle = "botao-padrao-ativo relative";
  
  const underlineStyle = "underline-style";
  
  const hoverStyle = "hover:scale-105 transition-transform";

  return (
    <nav className="w-48 p-4 flex flex-col gap-2">      
      <Link
        to="/documentos"
        className={`${baseStyle} ${hoverStyle} ${
          location.pathname.includes("documentos") 
            ? `${activeStyle} ${underlineStyle}`
            : ""
        }`}
      >
        Documentos
      </Link>
      
      <Link
        to="/json"
        className={`${baseStyle} ${hoverStyle} ${
          location.pathname.includes("json") 
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
    </nav>
  );
}