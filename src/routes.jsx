import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import "./index.css";
import { TOOLS } from "./config/tools";
import { PAGE_PATHS } from "./config/toolPaths";

/** Rotas filhas (iguais em PT e EN). Função para gerar objetos novos por idioma. */
function childRoutes() {
  return [
    { index: true, element: <Home /> },
    ...TOOLS.map((tool) => ({
      path: tool.path.replace(/^\//, ""),
      element: <tool.Component />,
    })),
    { path: PAGE_PATHS.privacy.replace(/^\//, ""), element: <PrivacyPolicy /> },
    { path: "*", element: <NotFound /> },
  ];
}

/**
 * Definição de rotas, compartilhada pelo router do navegador (main.jsx) e
 * pelo SSR (entry-server.jsx). PT em "/" e EN em "/en" — o App detecta o
 * idioma pelo path.
 */
export const routes = [
  { path: "/", element: <App />, children: childRoutes() },
  { path: "/en", element: <App />, children: childRoutes() },
];
