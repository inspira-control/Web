import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Modal from "../components/Modal.jsx";
import ConfirmarEliminar from "../components/ConfirmarEliminar.jsx";
import Buscador from "../components/Buscador.jsx";
import Acciones from "../components/Acciones.jsx";
import { IconMas } from "../components/Icons.jsx";
import { Aviso, Boton, Campo, inputClase, primerError, hoyISO, formatoFecha, formatoPrecio } from "../components/ui.jsx";
import { productosApi } from "../services/api.js";
import useCrud from "../hooks/useCrud.js";

const productoVacio = () => ({ nombre: "", descripcion: "", precio: "", fecha_registro: hoyISO() });

export default function Productos() {
  const crud = useCrud(productosApi, productoVacio);
  const [busqueda, setBusqueda] = useState("");

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return q ? crud.items.filter((p) => `${p.nombre} ${p.descripcion}`.toLowerCase().includes(q)) : crud.items;
  }, [crud.items, busqueda]);

  return (
    <>
      <PageHeader etiqueta="Inventario" titulo="Productos">
        Registra los productos en existencia: agrega, edita o elimina cuando lo necesites.
      </PageHeader>

      <Aviso onCerrar={() => crud.setError("")}>{crud.error}</Aviso>
      <Aviso tipo="exito" onCerrar={() => crud.setExito("")}>{crud.exito}</Aviso>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Buscador valor={busqueda} onCambio={setBusqueda} placeholder="Buscar producto…" />
        <Boton onClick={crud.abrirNuevo}><IconMas /> Nuevo producto</Boton>
      </div>

      <div className="overflow-hidden rounded-2xl border border-lila-100 bg-white">
        {crud.cargando ? (
          <p className="p-8 text-center text-tinta/50">Cargando…</p>
        ) : filtrados.length === 0 ? (
          <p className="p-8 text-center text-tinta/50">
            {busqueda ? "No hay productos que coincidan." : "Aún no hay productos. ¡Agrega el primero!"}
          </p>
        ) : (
          <>
            {/* Tabla en pantallas medianas y grandes */}
            <table className="hidden w-full text-left md:table">
              <thead className="bg-lila-50 text-sm text-lila-700">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Producto</th>
                  <th className="px-5 py-3.5 font-bold">Descripción</th>
                  <th className="px-5 py-3.5 text-right font-bold">Precio</th>
                  <th className="px-5 py-3.5 font-bold">Registro</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-lila-50">
                {filtrados.map((p) => (
                  <tr key={p.id} className="hover:bg-menta-50/50">
                    <td className="px-5 py-4 font-semibold">{p.nombre}</td>
                    <td className="max-w-xs px-5 py-4 text-sm text-tinta/70">{p.descripcion}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-menta-600">{formatoPrecio(p.precio)}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-tinta/70">{formatoFecha(p.fecha_registro)}</td>
                    <td className="px-5 py-4">
                      <Acciones onEditar={() => crud.abrirEditar(p)} onEliminar={() => crud.setPorEliminar(p)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Tarjetas en móvil */}
            <ul className="divide-y divide-lila-50 md:hidden">
              {filtrados.map((p) => (
                <li key={p.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{p.nombre}</p>
                      <p className="mt-1 text-sm text-tinta/70">{p.descripcion}</p>
                    </div>
                    <p className="whitespace-nowrap font-bold text-menta-600">{formatoPrecio(p.precio)}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-tinta/50">Registrado: {formatoFecha(p.fecha_registro)}</span>
                    <Acciones onEditar={() => crud.abrirEditar(p)} onEliminar={() => crud.setPorEliminar(p)} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Modal abierto={crud.formAbierto} titulo={crud.editandoId ? "Editar producto" : "Nuevo producto"} onCerrar={crud.cerrarForm}>
        <form onSubmit={crud.guardar} className="space-y-4">
          <Campo label="Nombre del producto" error={primerError(crud.erroresCampo, "nombre")}>
            <input name="nombre" value={crud.form.nombre} onChange={crud.cambiar} required maxLength={120} className={inputClase} placeholder="Taza personalizada" />
          </Campo>
          <Campo label="Descripción" error={primerError(crud.erroresCampo, "descripcion")}>
            <textarea name="descripcion" value={crud.form.descripcion} onChange={crud.cambiar} rows={3} className={inputClase} placeholder="Taza de cerámica con foto y nombre" />
          </Campo>
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo label="Precio (MXN)" error={primerError(crud.erroresCampo, "precio")}>
              <input name="precio" type="number" min="0" step="0.01" value={crud.form.precio} onChange={crud.cambiar} required className={inputClase} placeholder="150.00" />
            </Campo>
            <Campo label="Fecha de registro" error={primerError(crud.erroresCampo, "fecha_registro")}>
              <input name="fecha_registro" type="date" value={crud.form.fecha_registro} onChange={crud.cambiar} required className={inputClase} />
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
