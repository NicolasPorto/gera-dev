import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();

  const baseStyle = "p-2 text-left transition-all duration-200 text-white";
  
  const activeStyle = "relative";
  
  const underlineStyle = "underline-style";

  return (
    <nav className="w-56 p-4 flex flex-col">      
      <Link
        to="/documentos"
        className={`${baseStyle} ${
          location.pathname.includes("documentos") 
            ? `${activeStyle} ${underlineStyle}`
            : ""
        }`}
      >
        Documentos
      </Link>
      
      <Link
        to="/json"
        className={`${baseStyle} ${
          location.pathname.includes("json") 
            ? `${activeStyle} ${underlineStyle}`
            : ""
        }`}
      >
        Formatar JSON
      </Link>
    </nav>
  );
}