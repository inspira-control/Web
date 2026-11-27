import { IconEditar, IconBorrar } from "./Icons.jsx";

// Botones Editar / Eliminar de cada registro.
// En las tablas se usan "compactos" (solo ícono con descripción al pasar el mouse) para que quepan todas las columnas.
export default function Acciones({ onEditar, onEliminar, nombre = "", compacto = false }) {
  const base = "inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold transition";
  const pad = compacto ? "p-2" : "px-2.5 py-1.5";
  return (
    <div className="flex justify-end gap-1 whitespace-nowrap">
      <button onClick={onEditar} title={`Editar ${nombre}`} aria-label={`Editar ${nombre}`}
        className={`${base} ${pad} text-lila-600 hover:bg-lila-100`}>
        <IconEditar width={18} height={18} /> {!compacto && <span>Editar</span>}
      </button>
      <button onClick={onEliminar} title={`Eliminar ${nombre}`} aria-label={`Eliminar ${nombre}`}
        className={`${base} ${pad} text-rose-500 hover:bg-rose-50`}>
        <IconBorrar width={18} height={18} /> {!compacto && <span>Eliminar</span>}
      </button>
    </div>
  );
}
