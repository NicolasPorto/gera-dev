import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <div className="min-h-screen background-default flex flex-col">
      <header className="py-4 px-6 flex items-center relative">
        <h1 className="text-5xl font-bold text-center text-default absolute left-1/2 transform -translate-x-1/2">
          Geradev
        </h1>

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex">
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div className="w-full mx-auto pointer-events-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;