import Modal from "./Modal.jsx";
import { Boton } from "./ui.jsx";

export default function ConfirmarEliminar({ item, onCancelar, onConfirmar }) {
  return (
    <Modal abierto={!!item} titulo="¿Eliminar registro?" onCerrar={onCancelar}>
      <p className="text-tinta/70">
        Vas a eliminar <strong className="text-tinta">{item?.nombre}</strong>. Esta acción no se puede deshacer.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Boton variante="secundario" onClick={onCancelar}>Cancelar</Boton>
        <Boton variante="peligro" onClick={onConfirmar}>Eliminar</Boton>
      </div>
    </Modal>
  );
}
