import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./index.css";
import { TOOLS } from "./config/tools";

/** Rotas filhas (iguais em PT e EN). Função para gerar objetos novos por idioma. */
function childRoutes() {
  return [
    { index: true, element: <Home /> },
    ...TOOLS.map((tool) => ({
      path: tool.path.replace(/^\//, ""),
      element: <tool.Component />,
    })),
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
