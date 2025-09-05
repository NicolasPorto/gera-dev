import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import './index.css'
import DocumentosGenerator from "./tools/DocumentosGenerator";
import JsonFormatter from "./tools/JsonFormatter";
import QRCodeGenerator from "./tools/QRCodeGenerator";
import XmlFormatter from "./tools/XmlFormatter";
import VisualizarHTML from "./tools/VisualizarHTML";
import GeradorSenha from "./tools/GeradorSenha";
import LinkWhatsApp from "./tools/GerarLinkWhatsapp";
import GerarPessoa from "./tools/GerarPessoa";

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
        path: "gerar-qrcode",
        element: <QRCodeGenerator />,
      },
      {
        path: "gerar-senha",
        element: <GeradorSenha />,
      },
      {
        path: "gerar-pessoa",
        element: <GerarPessoa />,
      },
      {
        path: "link-whatsapp",
        element: <LinkWhatsApp />,
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
        path: "visualizar-html",
        element: <VisualizarHTML />,
      }
    ],
  },
]);