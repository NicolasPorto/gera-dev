import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
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
    { path: PAGE_PATHS.about.replace(/^\//, ""), element: <AboutPage /> },
    { path: PAGE_PATHS.contact.replace(/^\//, ""), element: <ContactPage /> },
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
