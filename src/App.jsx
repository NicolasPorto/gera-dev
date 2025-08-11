import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen background-default flex flex-col">
      {/* Header */}
      <header className="py-4 px-6">
        <h1 className="text-3xl font-bold text-center text-white">Geradev</h1>
      </header>

      {/* Container principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Área de conteúdo - ESSA PARTE FOI AJUSTADA */}
        <main className="flex-1 flex">
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div className="w-full max-w-lg mx-auto pointer-events-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;