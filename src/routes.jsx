import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CpfGenerator from "./tools/CpfGenerator";
import JsonFormatter from "./tools/JsonFormatter";
import './index.css'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "documentos",
        element: <CpfGenerator />,
      },
      {
        path: "json",
        element: <JsonFormatter />,
      },
    ],
  },
]);