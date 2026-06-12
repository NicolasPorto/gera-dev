import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToolPrefsProvider } from "./hooks/useToolPrefs";
import { router } from "./routes";
import './index.css'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ToolPrefsProvider>
        <RouterProvider router={router} />
      </ToolPrefsProvider>
    </HelmetProvider>
  </StrictMode>,
)
