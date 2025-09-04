import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DocumentosGenerator from "./tools/DocumentosGenerator";
import JsonFormatter from "./tools/JsonFormatter";
import QRCodeGenerator from "./tools/QRCodeGenerator";
import XmlFormatter from "./tools/XmlFormatter";
import VisualizarHTML from "./tools/VisualizarHTML";
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
        path: "gerar-documentos",
        element: <DocumentosGenerator />,
      },
      {
        path: "formatar-json",
        element: <JsonFormatter />,
      },
      {
        path: "formatar-xml",
        element: <XmlFormatter />,
      },
      {
        path: "gerar-qrcode",
        element: <QRCodeGenerator />,
      },
      {
        path: "visualizar-html",
        element: <VisualizarHTML />,
      },
    ],
  },
]);