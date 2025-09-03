import { Outlet, Link, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";
import InfoIcon from "./components/InfoIcon";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen background-default flex flex-col">
      <header className="py-4 px-6 flex items-center relative">
        <div className="text-5xl font-bold text-center text-default absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            Geradev
          </Link>
          {!isHome && <InfoIcon />}
        </div>

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