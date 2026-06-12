import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToolPrefsProvider } from "./hooks/useToolPrefs";
import { routes } from "./routes";
import { localeFromPath } from "./hooks/useLocale";
import './index.css'
import i18n from './i18n'

// O idioma é definido pela URL; fixa antes de hidratar para casar com o
// HTML pré-renderizado (evita hydration mismatch).
const initialLocale = localeFromPath(window.location.pathname);
if (i18n.language !== initialLocale) i18n.changeLanguage(initialLocale);

const router = createBrowserRouter(routes);

const app = (
  <StrictMode>
    <HelmetProvider>
      <ToolPrefsProvider>
        <RouterProvider router={router} />
      </ToolPrefsProvider>
    </HelmetProvider>
  </StrictMode>
);

const rootEl = document.getElementById('root');

// Em produção o HTML vem pré-renderizado (prerender no build) -> hidrata.
// Em dev o #root está vazio -> render normal.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
