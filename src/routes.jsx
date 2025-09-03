import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DocumentosGenerator from "./tools/DocumentosGenerator";
import JsonFormatter from "./tools/JsonFormatter";
import XmlFormatter from "./tools/XmlFormatter";
import Home from "./pages/Home";
import './index.css'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/documentos",
        element: <DocumentosGenerator />,
      },
      {
        path: "/json",
        element: <JsonFormatter />,
      },
      {
        path: "/xml",
        element: <XmlFormatter />,
      },
    ],
  },
]);