import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import './index.css'
import DocsGenerator from "./tools/DocsGenerator";
import JSONFormatter from "./tools/JSONFormatter";
import QRCodeGenerator from "./tools/QRCodeGenerator";
import XMLFormatter from "./tools/XMLFormatter";
import SQLFormatter from "./tools/SQLFormatter";
import HTMLVisualizer from "./tools/HTMLVisualizer";
import PasswordGenerator from "./tools/PasswordGenerator";
import WhatsappLinkGenerator from "./tools/WhatsappLinkGenerator";
import PersonGenerator from "./tools/PersonGenerator";
import MyIPVisualizer from "./tools/MyIPVisualizer";
import JsonStringify from "./tools/JsonStringify";
import URLEncodeDecode from "./tools/URLEncodeDecode";
import OvertimeCalculator from "./tools/OvertimeCalculator";
import JsonToClassConverter from "./tools/JsonToClassConverter";
import Base64EncodeDecode from "./tools/Base64EncodeDecode";
import HashGenerator from "./tools/HashGenerador";
import JWTDecoderEncoder from "./tools/JWTDecoderEncoder";

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
        element: <DocsGenerator />,
      },
      {
        path: "gerar-qrcode",
        element: <QRCodeGenerator />,
      },
      {
        path: "gerar-senha",
        element: <PasswordGenerator />,
      },
      {
        path: "gerar-pessoa",
        element: <PersonGenerator />,
      },
      {
        path: "link-whatsapp",
        element: <WhatsappLinkGenerator />,
      },
      {
        path: "formatar-json",
        element: <JSONFormatter />,
      },
      {
        path: "formatar-xml",
        element: <XMLFormatter />,
      },
      {
        path: "formatar-sql",
        element: <SQLFormatter />,
      },
      {
        path: "visualizar-html",
        element: <HTMLVisualizer />,
      },
      {
        path: "meu-ip",
        element: <MyIPVisualizer />,
      },
      {
        path: "json-stringify",
        element: <JsonStringify />,
      },
      {
        path: "url-encode-decode",
        element: <URLEncodeDecode />,
      },
      {
        path: "calculo-hora-extra",
        element: <OvertimeCalculator />,
      },
      {
        path: "conversor-json-class",
        element: <JsonToClassConverter />,
      },
      {
        path: "base64-encode-decode",
        element: <Base64EncodeDecode />,
      },
      {
        path: "gerar-hash",
        element: <HashGenerator />,
      },
      {
        path: "jwt-encode-decode",
        element: <JWTDecoderEncoder />,
      }
    ],
  },
]);