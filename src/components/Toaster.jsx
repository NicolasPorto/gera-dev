import { useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import { subscribeToasts, getToasts } from "./toast";

export function Toaster() {
  const items = useSyncExternalStore(subscribeToasts, getToasts, getToasts);
  if (!items.length) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none">
      {items.map((item) => (
        <div
          key={item.id}
          className="toast-in flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900 text-white text-sm shadow-lg border border-white/15"
        >
          <Check size={16} className="text-green-400" />
          {item.message}
        </div>
      ))}
    </div>
  );
}
