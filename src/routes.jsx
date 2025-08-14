import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DocumentosGenerator from "./tools/DocumentosGenerator";
import JsonFormatter from "./tools/JsonFormatter";
import './index.css'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "documentos",
        element: <DocumentosGenerator />,
      },
      {
        path: "json",
        element: <JsonFormatter />,
      },
    ],
  },
]);