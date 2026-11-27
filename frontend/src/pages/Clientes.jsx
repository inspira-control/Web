import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Modal from "../components/Modal.jsx";
import ConfirmarEliminar from "../components/ConfirmarEliminar.jsx";
import Buscador from "../components/Buscador.jsx";
import Acciones from "../components/Acciones.jsx";
import { IconMas } from "../components/Icons.jsx";
import {
  Aviso, Boton, Campo, Columna, Contador, claseInput, primerError, hoyISO, formatoFecha, normalizar, ordenar,
} from "../components/ui.jsx";
import { clientesApi } from "../services/api.js";
import useCrud, { siguienteCodigo } from "../hooks/useCrud.js";

const clienteVacio = (items) => ({
  codigo: siguienteCodigo(items, "C"), nombre: "", direccion: "", telefono: "", correo: "", fecha_nacimiento: "", gustos: "",
});

const Vacio = () => <span className="text-tinta/30">—</span>;

export default function Clientes() {
  const crud = useCrud(clientesApi, clienteVacio);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState({ campo: "codigo", asc: true });
  const err = (campo) => primerError(crud.erroresCampo, campo);

  const filtrados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    const lista = q
      ? crud.items.filter((c) =>
          normalizar(`${c.codigo} ${c.nombre} ${c.telefono} ${c.correo} ${c.direccion} ${c.gustos}`).includes(q))
      : crud.items;
    return ordenar(lista, orden);
  }, [crud.items, busqueda, orden]);

  const ordenarPor = (campo) => setOrden((o) => ({ campo, asc: o.campo === campo ? !o.asc : true }));
  const colProps = { orden, onOrdenar: ordenarPor };

  return (
    <>
      <PageHeader etiqueta="Directorio" titulo="Clientes">
        Guarda los datos y gustos de tus clientes para darles un trato cercano. Busca por código, nombre, teléfono,
        correo o gustos.
      </PageHeader>

      <Aviso onCerrar={() => crud.setError("")}>{crud.error}</Aviso>
      <Aviso tipo="exito" onCerrar={() => crud.setExito("")}>{crud.exito}</Aviso>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Buscador valor={busqueda} onCambio={setBusqueda} placeholder="Buscar cliente, código o correo…" />
        <Boton onClick={crud.abrirNuevo}><IconMas /> Nuevo cliente</Boton>
      </div>

      <Contador mostrados={filtrados.length} total={crud.items.length} singular="cliente" plural="clientes" />

      <div className="overflow-hidden rounded-2xl border border-lila-100 bg-white">
        {crud.cargando ? (
          <p className="p-8 text-center text-tinta/50">Cargando clientes…</p>
        ) : filtrados.length === 0 ? (
          <div className="p-8 text-center text-tinta/50">
            {busqueda ? (
              <>No hay clientes que coincidan con “{busqueda}”.{" "}
                <button onClick={() => setBusqueda("")} className="font-semibold text-lila-600 hover:underline">Ver todos</button></>
            ) : "Aún no hay clientes registrados. ¡Agrega el primero con el botón “Nuevo cliente”!"}
          </div>
        ) : (
          <>
            {/* Tabla en pantallas medianas y grandes */}
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-menta-50 text-sm text-menta-600">
                  <tr>
                    <Columna campo="codigo" {...colProps}>Código</Columna>
                    <Columna campo="nombre" {...colProps}>Nombre</Columna>
                    <th className="px-3 py-3.5 font-bold">Dirección</th>
                    <th className="px-3 py-3.5 font-bold">Teléfono</th>
                    <Columna campo="correo" {...colProps}>Correo</Columna>
                    <Columna campo="fecha_nacimiento" {...colProps} className="whitespace-nowrap">Fecha de nacimiento</Columna>
                    <th className="px-3 py-3.5 font-bold">Gustos</th>
                    <th className="px-3 py-3.5 text-right font-bold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lila-50">
                  {filtrados.map((c) => (
                    <tr key={c.id} className="align-top hover:bg-lila-50/50">
                      <td className="whitespace-nowrap px-3 py-3.5 text-sm font-bold tabular-nums text-lila-600">{c.codigo}</td>
                      <td className="min-w-[8rem] px-3 py-3.5 font-semibold">{c.nombre}</td>
                      <td className="min-w-[9rem] px-3 py-3.5 text-sm text-tinta/70">{c.direccion}</td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-sm">
                        <a href={`tel:${c.telefono.replace(/[^\d+]/g, "")}`} className="hover:text-lila-600">{c.telefono}</a>
                      </td>
                      <td className="px-3 py-3.5 text-sm">
                        {c.correo
                          ? <a href={`mailto:${c.correo}`} className="text-tinta/70 hover:text-lila-600">{c.correo}</a>
                          : <span className="whitespace-nowrap text-xs font-semibold text-amber-700">Falta correo</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-sm text-tinta/70">{formatoFecha(c.fecha_nacimiento)}</td>
                      <td className="min-w-[9rem] px-3 py-3.5 text-sm text-tinta/70">{c.gustos || <Vacio />}</td>
                      <td className="px-3 py-3.5">
                        <Acciones compacto nombre={c.nombre} onEditar={() => crud.abrirEditar(c)} onEliminar={() => crud.setPorEliminar(c)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tarjetas en móvil y tableta */}
            <ul className="divide-y divide-lila-50 xl:hidden">
              {filtrados.map((c) => (
                <li key={c.id} className="p-4">
                  <p className="text-xs font-bold tabular-nums text-lila-600">{c.codigo}</p>
                  <p className="font-semibold">{c.nombre}</p>
                  <div className="mt-2 grid gap-1 text-sm text-tinta/70 sm:grid-cols-2">
                    <a href={`tel:${c.telefono.replace(/[^\d+]/g, "")}`} className="hover:text-lila-600"><span className="text-xs font-semibold text-tinta/40">Tel.</span> {c.telefono}</a>
                    {c.correo
                      ? <a href={`mailto:${c.correo}`} className="break-all hover:text-lila-600"><span className="text-xs font-semibold text-tinta/40">Correo</span> {c.correo}</a>
                      : <span className="font-semibold text-amber-700">Falta correo</span>}
                    <span><span className="text-xs font-semibold text-tinta/40">Dirección</span> {c.direccion}</span>
                    <span><span className="text-xs font-semibold text-tinta/40">Nacimiento</span> {formatoFecha(c.fecha_nacimiento)}</span>
                  </div>
                  <p className="mt-2 rounded-lg bg-menta-50 px-3 py-2 text-sm text-menta-600">Gustos: {c.gustos || "sin registrar"}</p>
                  <div className="mt-3">
                    <Acciones nombre={c.nombre} onEditar={() => crud.abrirEditar(c)} onEliminar={() => crud.setPorEliminar(c)} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Modal abierto={crud.formAbierto} titulo={crud.editandoId ? "Editar cliente" : "Nuevo cliente"} onCerrar={crud.cerrarForm}>
        <form onSubmit={crud.guardar} className="space-y-4">
          <Aviso>{crud.errorForm}</Aviso>
          <div className="grid gap-4 sm:grid-cols-3">
            <Campo label="Código" requerido error={err("codigo")} ayuda="Ej. C-0001">
              <input name="codigo" value={crud.form.codigo} onChange={crud.cambiar} required maxLength={20}
                pattern="[A-Za-z0-9][A-Za-z0-9\-]*" title="Solo letras, números y guiones"
                className={`${claseInput(err("codigo"))} uppercase`} />
            </Campo>
            <div className="sm:col-span-2">
              <Campo label="Nombre completo" requerido error={err("nombre")}>
                <input name="nombre" value={crud.form.nombre} onChange={crud.cambiar} required maxLength={120} autoFocus
                  autoComplete="off" className={claseInput(err("nombre"))} placeholder="Ana López" />
              </Campo>
            </div>
          </div>
          <Campo label="Dirección" requerido error={err("direccion")}>
            <input name="direccion" value={crud.form.direccion} onChange={crud.cambiar} required maxLength={255}
              autoComplete="off" className={claseInput(err("direccion"))} placeholder="Calle, número, colonia, ciudad" />
          </Campo>
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo label="Teléfono" requerido error={err("telefono")} ayuda="10 dígitos">
              <input name="telefono" type="tel" value={crud.form.telefono} onChange={crud.cambiar} required maxLength={20}
                minLength={10} inputMode="tel"
                autoComplete="off" className={claseInput(err("telefono"))} placeholder="55 1234 5678" />
            </Campo>
            <Campo label="Correo" requerido error={err("correo")}>
              <input name="correo" type="email" value={crud.form.correo} onChange={crud.cambiar} required maxLength={254}
                autoComplete="off" className={claseInput(err("correo"))} placeholder="ana@correo.com" />
            </Campo>
          </div>
          <Campo label="Fecha de nacimiento" requerido error={err("fecha_nacimiento")}>
            <input name="fecha_nacimiento" type="date" min="1900-01-01" max={hoyISO()} value={crud.form.fecha_nacimiento}
              onChange={crud.cambiar} required className={claseInput(err("fecha_nacimiento"))} />
          </Campo>
          <Campo label="Gustos" error={err("gustos")} ayuda="Opcional: colores, personajes, pasatiempos… para recomendarle regalos.">
            <textarea name="gustos" value={crud.form.gustos} onChange={crud.cambiar} rows={2}
              className={claseInput(err("gustos"))} placeholder="Le encantan los gatos, el color lila y el café" />
          </Campo>
          <p className="text-xs text-tinta/50"><span className="text-rose-500">*</span> Campos obligatorios</p>
          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
            <Boton type="button" variante="secundario" onClick={crud.cerrarForm} disabled={crud.guardando}>Cancelar</Boton>
            <Boton type="submit" disabled={crud.guardando}>
              {crud.guardando ? "Guardando…" : crud.editandoId ? "Guardar cambios" : "Agregar cliente"}
            </Boton>
          </div>
        </form>
      </Modal>

      <ConfirmarEliminar
        item={crud.porEliminar}
        etiqueta={(c) => `${c.codigo} · ${c.nombre}`}
        eliminando={crud.eliminando}
        onCancelar={() => crud.setPorEliminar(null)}
        onConfirmar={crud.confirmarEliminar}
      />
    </>
  );
}
