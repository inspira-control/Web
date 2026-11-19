import { IconEditar, IconBorrar } from "./Icons.jsx";

export default function Acciones({ onEditar, onEliminar }) {
  return (
    <div className="flex justify-end gap-1">
      <button onClick={onEditar} className="rounded-lg p-2 text-lila-500 hover:bg-lila-50" aria-label="Editar" title="Editar"><IconEditar /></button>
      <button onClick={onEliminar} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50" aria-label="Eliminar" title="Eliminar"><IconBorrar /></button>
    </div>
  );
}
