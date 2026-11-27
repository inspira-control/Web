import Modal from "./Modal.jsx";
import { Boton } from "./ui.jsx";
import { IconBorrar } from "./Icons.jsx";

export default function ConfirmarEliminar({ item, etiqueta, eliminando, onCancelar, onConfirmar }) {
  return (
    <Modal abierto={!!item} titulo="¿Eliminar registro?" onCerrar={eliminando ? () => {} : onCancelar}>
      <p className="text-tinta/70">
        Vas a eliminar <strong className="text-tinta">{item && etiqueta(item)}</strong>. Esta acción no se puede deshacer.
      </p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Boton variante="secundario" onClick={onCancelar} disabled={eliminando}>Cancelar</Boton>
        <Boton variante="peligro" onClick={onConfirmar} disabled={eliminando} autoFocus>
          <IconBorrar /> {eliminando ? "Eliminando…" : "Sí, eliminar"}
        </Boton>
      </div>
    </Modal>
  );
}
