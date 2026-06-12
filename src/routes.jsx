import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./index.css";
import { TOOLS } from "./config/tools";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      ...TOOLS.map((tool) => ({
        // remove a barra inicial: rotas filhas usam caminho relativo
        path: tool.path.replace(/^\//, ""),
        element: <tool.Component />,
        id: tool.id,
      })),
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
