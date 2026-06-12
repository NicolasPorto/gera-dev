import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToolPrefsProvider } from "./hooks/useToolPrefs";
import { routes } from "./routes";
import i18n from "./i18n";

export async function render(pathname, lang = "pt") {
  await i18n.changeLanguage(lang);

  const handler = createStaticHandler(routes);
  const context = await handler.query(
    new Request(`http://localhost${pathname}`),
  );

  if (context instanceof Response) {
    throw new Error(`Rota ${pathname} respondeu com redirect/Response`);
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  const helmetContext = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <ToolPrefsProvider>
          <StaticRouterProvider router={router} context={context} />
        </ToolPrefsProvider>
      </HelmetProvider>
    </StrictMode>,
  );

  return { html, helmet: helmetContext.helmet };
}
