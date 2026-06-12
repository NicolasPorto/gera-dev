import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const FAV_KEY = "geradev:favorites";
const REC_KEY = "geradev:recents";
const MAX_RECENTS = 8;

function load(key) {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(key, value) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* armazenamento indisponível — ignora */
  }
}

const ToolPrefsContext = createContext(null);

export function ToolPrefsProvider({ children }) {
  const [favorites, setFavorites] = useState(() => load(FAV_KEY));
  const [recents, setRecents] = useState(() => load(REC_KEY));

  useEffect(() => save(FAV_KEY, favorites), [favorites]);
  useEffect(() => save(REC_KEY, recents), [recents]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.includes(id),
    [favorites],
  );

  const addRecent = useCallback((id) => {
    setRecents((prev) =>
      [id, ...prev.filter((x) => x !== id)].slice(0, MAX_RECENTS),
    );
  }, []);

  return (
    <ToolPrefsContext.Provider
      value={{ favorites, recents, isFavorite, toggleFavorite, addRecent }}
    >
      {children}
    </ToolPrefsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToolPrefs() {
  const ctx = useContext(ToolPrefsContext);
  if (!ctx) {
    throw new Error("useToolPrefs precisa estar dentro de <ToolPrefsProvider>");
  }
  return ctx;
}
