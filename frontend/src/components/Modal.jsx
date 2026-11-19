import { useEffect } from "react";
import { IconCerrar } from "./Icons.jsx";

export default function Modal({ abierto, titulo, onCerrar, children }) {
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto, onCerrar]);

  if (!abierto) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-tinta/40 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onCerrar}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl sm:max-w-lg sm:rounded-3xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-tinta">{titulo}</h2>
          <button onClick={onCerrar} className="rounded-lg p-1.5 text-tinta/50 hover:bg-lila-50 hover:text-lila-600" aria-label="Cerrar">
            <IconCerrar />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
