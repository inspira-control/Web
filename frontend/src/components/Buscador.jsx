import { IconBuscar, IconCerrar } from "./Icons.jsx";
import { inputClase } from "./ui.jsx";

export default function Buscador({ valor, onCambio, placeholder }) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <IconBuscar className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-tinta/40" />
      <input
        type="text"
        inputMode="search"
        value={valor}
        onChange={(e) => onCambio(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onCambio("")}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`${inputClase} pl-10 pr-10`}
      />
      {valor && (
        <button type="button" onClick={() => onCambio("")} aria-label="Limpiar búsqueda" title="Limpiar búsqueda"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-tinta/40 hover:bg-lila-50 hover:text-lila-600">
          <IconCerrar width={16} height={16} />
        </button>
      )}
    </div>
  );
}
