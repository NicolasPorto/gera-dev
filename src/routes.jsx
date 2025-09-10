import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import './index.css'
import DocumentosGenerator from "./tools/DocumentosGenerator";
import FormatarJSON from "./tools/FormatarJSON";
import QRCodeGenerator from "./tools/QRCodeGenerator";
import FormatarXML from "./tools/FormatarXML";
import FormatarSQL from "./tools/FormatarSQL";
import VisualizarHTML from "./tools/VisualizarHTML";
import GeradorSenha from "./tools/GeradorSenha";
import LinkWhatsApp from "./tools/GerarLinkWhatsapp";
import GerarPessoa from "./tools/GerarPessoa";
import VerificadorMeuIp from "./tools/VerificadorMeuIp";
import JsonStringify from "./tools/JsonStringify";

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
        element: <FormatarJSON />,
      },
      {
        path: "formatar-xml",
        element: <FormatarXML />,
      },
      {
        path: "visualizar-html",
        element: <VisualizarHTML />,
      },
      {
        path: "meu-ip",
        element: <VerificadorMeuIp />,
      },
      {
        path: "json-stringify",
        element: <JsonStringify />,
      },
      {
        path: "formatar-sql",
        element: <FormatarSQL />,
      }
    ],
  },
]);