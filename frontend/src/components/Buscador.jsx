import { IconBuscar } from "./Icons.jsx";
import { inputClase } from "./ui.jsx";

export default function Buscador({ valor, onCambio, placeholder }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <IconBuscar className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-tinta/40" />
      <input
        type="search"
        value={valor}
        onChange={(e) => onCambio(e.target.value)}
        placeholder={placeholder}
        className={`${inputClase} pl-10`}
      />
    </div>
  );
}
