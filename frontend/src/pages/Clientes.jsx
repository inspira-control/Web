import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Modal from "../components/Modal.jsx";
import ConfirmarEliminar from "../components/ConfirmarEliminar.jsx";
import Buscador from "../components/Buscador.jsx";
import Acciones from "../components/Acciones.jsx";
import { IconMas } from "../components/Icons.jsx";
import { Aviso, Boton, Campo, inputClase, primerError, hoyISO, formatoFecha } from "../components/ui.jsx";
import { clientesApi } from "../services/api.js";
import useCrud from "../hooks/useCrud.js";

const clienteVacio = { nombre: "", direccion: "", telefono: "", fecha_nacimiento: "" };

export default function Clientes() {
  const crud = useCrud(clientesApi, clienteVacio);
  const [busqueda, setBusqueda] = useState("");

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return q ? crud.items.filter((c) => `${c.nombre} ${c.telefono} ${c.direccion}`.toLowerCase().includes(q)) : crud.items;
  }, [crud.items, busqueda]);

  return (
    <>
      <PageHeader etiqueta="Directorio" titulo="Clientes">
        Guarda los datos de tus clientes para darles un trato cercano y recordar sus fechas especiales.
      </PageHeader>

      <Aviso onCerrar={() => crud.setError("")}>{crud.error}</Aviso>
      <Aviso tipo="exito" onCerrar={() => crud.setExito("")}>{crud.exito}</Aviso>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Buscador valor={busqueda} onCambio={setBusqueda} placeholder="Buscar cliente…" />
        <Boton onClick={crud.abrirNuevo}><IconMas /> Nuevo cliente</Boton>
      </div>

      <div className="overflow-hidden rounded-2xl border border-lila-100 bg-white">
        {crud.cargando ? (
          <p className="p-8 text-center text-tinta/50">Cargando…</p>
        ) : filtrados.length === 0 ? (
          <p className="p-8 text-center text-tinta/50">
            {busqueda ? "No hay clientes que coincidan." : "Aún no hay clientes registrados."}
          </p>
        ) : (
          <>
            <table className="hidden w-full text-left md:table">
              <thead className="bg-menta-50 text-sm text-menta-600">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Nombre</th>
                  <th className="px-5 py-3.5 font-bold">Dirección</th>
                  <th className="px-5 py-3.5 font-bold">Teléfono</th>
                  <th className="px-5 py-3.5 font-bold">Nacimiento</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-lila-50">
                {filtrados.map((c) => (
                  <tr key={c.id} className="hover:bg-lila-50/50">
                    <td className="px-5 py-4 font-semibold">{c.nombre}</td>
                    <td className="max-w-xs px-5 py-4 text-sm text-tinta/70">{c.direccion}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm">{c.telefono}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-tinta/70">{formatoFecha(c.fecha_nacimiento)}</td>
                    <td className="px-5 py-4">
                      <Acciones onEditar={() => crud.abrirEditar(c)} onEliminar={() => crud.setPorEliminar(c)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="divide-y divide-lila-50 md:hidden">
              {filtrados.map((c) => (
                <li key={c.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold">{c.nombre}</p>
                      <p className="mt-1 text-sm text-tinta/70">{c.direccion}</p>
                      <p className="mt-1 text-sm">{c.telefono}</p>
                    </div>
                    <Acciones onEditar={() => crud.abrirEditar(c)} onEliminar={() => crud.setPorEliminar(c)} />
                  </div>
                  <p className="mt-2 text-xs text-tinta/50">Nacimiento: {formatoFecha(c.fecha_nacimiento)}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Modal abierto={crud.formAbierto} titulo={crud.editandoId ? "Editar cliente" : "Nuevo cliente"} onCerrar={crud.cerrarForm}>
        <form onSubmit={crud.guardar} className="space-y-4">
          <Campo label="Nombre completo" error={primerError(crud.erroresCampo, "nombre")}>
            <input name="nombre" value={crud.form.nombre} onChange={crud.cambiar} required maxLength={120} className={inputClase} placeholder="Ana López" />
          </Campo>
          <Campo label="Dirección" error={primerError(crud.erroresCampo, "direccion")}>
            <input name="direccion" value={crud.form.direccion} onChange={crud.cambiar} required maxLength={255} className={inputClase} placeholder="Calle, número, colonia, ciudad" />
          </Campo>
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo label="Teléfono" error={primerError(crud.erroresCampo, "telefono")}>
              <input name="telefono" type="tel" value={crud.form.telefono} onChange={crud.cambiar} required maxLength={20} className={inputClase} placeholder="55 1234 5678" />
            </Campo>
            <Campo label="Fecha de nacimiento" error={primerError(crud.erroresCampo, "fecha_nacimiento")}>
              <input name="fecha_nacimiento" type="date" max={hoyISO()} value={crud.form.fecha_nacimiento} onChange={crud.cambiar} required className={inputClase} />
            </Campo>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Boton type="button" variante="secundario" onClick={crud.cerrarForm}>Cancelar</Boton>
            <Boton type="submit" disabled={crud.guardando}>{crud.guardando ? "Guardando…" : "Guardar"}</Boton>
          </div>
        </form>
      </Modal>

      <ConfirmarEliminar item={crud.porEliminar} onCancelar={() => crud.setPorEliminar(null)} onConfirmar={crud.confirmarEliminar} />
    </>
  );
}
