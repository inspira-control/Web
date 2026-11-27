import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Modal from "../components/Modal.jsx";
import ConfirmarEliminar from "../components/ConfirmarEliminar.jsx";
import Buscador from "../components/Buscador.jsx";
import Acciones from "../components/Acciones.jsx";
import { IconMas } from "../components/Icons.jsx";
import {
  Aviso, Boton, Campo, Columna, Contador, claseInput, primerError, formatoPrecio, formatoFecha, hoyISO, normalizar, ordenar,
} from "../components/ui.jsx";
import { productosApi } from "../services/api.js";
import useCrud, { siguienteCodigo } from "../hooks/useCrud.js";

const productoVacio = (items) => ({
  codigo: siguienteCodigo(items, "P"), producto: "", descripcion: "", costo_unitario: "", precio_venta: "", stock: "",
  fecha_registro: hoyISO(),
});

// Insignia de color según las existencias
function Stock({ valor }) {
  const n = Number(valor);
  const [clase, texto] =
    n === 0 ? ["bg-rose-50 text-rose-600", "Agotado"]
    : n <= 5 ? ["bg-amber-50 text-amber-700", `${n} · Poco stock`]
    : ["bg-menta-50 text-menta-600", `${n} pzas`];
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${clase}`}>{texto}</span>;
}

export default function Productos() {
  const crud = useCrud(productosApi, productoVacio);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState({ campo: "codigo", asc: true });
  const err = (campo) => primerError(crud.erroresCampo, campo);

  const filtrados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    const lista = q
      ? crud.items.filter((p) => normalizar(`${p.codigo} ${p.producto} ${p.descripcion}`).includes(q))
      : crud.items;
    return ordenar(lista, orden);
  }, [crud.items, busqueda, orden]);

  const ordenarPor = (campo) => setOrden((o) => ({ campo, asc: o.campo === campo ? !o.asc : true }));
  const colProps = { orden, onOrdenar: ordenarPor };

  return (
    <>
      <PageHeader etiqueta="Inventario" titulo="Productos">
        Consulta tu inventario, busca por código o nombre, y usa <strong>Nuevo producto</strong>, <strong>Editar</strong> o{" "}
        <strong>Eliminar</strong> para mantenerlo al día.
      </PageHeader>

      <Aviso onCerrar={() => crud.setError("")}>{crud.error}</Aviso>
      <Aviso tipo="exito" onCerrar={() => crud.setExito("")}>{crud.exito}</Aviso>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Buscador valor={busqueda} onCambio={setBusqueda} placeholder="Buscar producto o código…" />
        <Boton onClick={crud.abrirNuevo}><IconMas /> Nuevo producto</Boton>
      </div>

      <Contador mostrados={filtrados.length} total={crud.items.length} singular="producto" plural="productos" />

      <div className="overflow-hidden rounded-2xl border border-lila-100 bg-white">
        {crud.cargando ? (
          <p className="p-8 text-center text-tinta/50">Cargando productos…</p>
        ) : filtrados.length === 0 ? (
          <div className="p-8 text-center text-tinta/50">
            {busqueda ? (
              <>No hay productos que coincidan con “{busqueda}”.{" "}
                <button onClick={() => setBusqueda("")} className="font-semibold text-lila-600 hover:underline">Ver todos</button></>
            ) : "Aún no hay productos. ¡Agrega el primero con el botón “Nuevo producto”!"}
          </div>
        ) : (
          <>
            {/* Tabla en pantallas grandes */}
            <div className="hidden overflow-x-auto xl:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-lila-50 text-sm text-lila-700">
                <tr>
                  <Columna campo="codigo" {...colProps}>Código</Columna>
                  <Columna campo="producto" {...colProps}>Producto</Columna>
                  <th className="px-3 py-3.5 font-bold">Descripción</th>
                  <Columna campo="costo_unitario" {...colProps} className="whitespace-nowrap text-right">Costo unitario</Columna>
                  <Columna campo="precio_venta" {...colProps} className="whitespace-nowrap text-right">Precio de venta</Columna>
                  <Columna campo="stock" {...colProps}>Stock</Columna>
                  <Columna campo="fecha_registro" {...colProps} className="whitespace-nowrap">Fecha de registro</Columna>
                  <th className="px-3 py-3.5 text-right font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lila-50">
                {filtrados.map((p) => (
                  <tr key={p.id} className="hover:bg-menta-50/50">
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm font-bold tabular-nums text-lila-600">{p.codigo}</td>
                    <td className="px-3 py-3.5 font-semibold">{p.producto}</td>
                    <td className="max-w-xs px-3 py-3.5 text-sm text-tinta/70">{p.descripcion || <span className="text-tinta/30">—</span>}</td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-right text-tinta/70">{formatoPrecio(p.costo_unitario)}</td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-right font-semibold text-menta-600">{formatoPrecio(p.precio_venta)}</td>
                    <td className="px-3 py-3.5"><Stock valor={p.stock} /></td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm text-tinta/70">{formatoFecha(p.fecha_registro)}</td>
                    <td className="px-3 py-3.5">
                      <Acciones compacto nombre={p.producto} onEditar={() => crud.abrirEditar(p)} onEliminar={() => crud.setPorEliminar(p)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            {/* Tarjetas en móvil y tableta */}
            <ul className="divide-y divide-lila-50 xl:hidden">
              {filtrados.map((p) => (
                <li key={p.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold tabular-nums text-lila-600">{p.codigo}</p>
                      <p className="font-semibold">{p.producto}</p>
                      <p className="mt-1 text-sm text-tinta/70">{p.descripcion || "Sin descripción"}</p>
                    </div>
                    <Stock valor={p.stock} />
                  </div>
                  <dl className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-lila-50/60 p-3 text-sm">
                    <div><dt className="text-xs text-tinta/50">Costo unitario</dt><dd className="font-semibold">{formatoPrecio(p.costo_unitario)}</dd></div>
                    <div><dt className="text-xs text-tinta/50">Precio de venta</dt><dd className="font-bold text-menta-600">{formatoPrecio(p.precio_venta)}</dd></div>
                    <div><dt className="text-xs text-tinta/50">Registro</dt><dd>{formatoFecha(p.fecha_registro)}</dd></div>
                  </dl>
                  <div className="mt-2">
                    <Acciones nombre={p.producto} onEditar={() => crud.abrirEditar(p)} onEliminar={() => crud.setPorEliminar(p)} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Modal abierto={crud.formAbierto} titulo={crud.editandoId ? "Editar producto" : "Nuevo producto"} onCerrar={crud.cerrarForm}>
        <form onSubmit={crud.guardar} className="space-y-4">
          <Aviso>{crud.errorForm}</Aviso>
          <div className="grid gap-4 sm:grid-cols-3">
            <Campo label="Código" requerido error={err("codigo")} ayuda="Ej. P-0001">
              <input name="codigo" value={crud.form.codigo} onChange={crud.cambiar} required maxLength={20}
                pattern="[A-Za-z0-9][A-Za-z0-9\-]*" title="Solo letras, números y guiones"
                className={`${claseInput(err("codigo"))} uppercase`} />
            </Campo>
            <div className="sm:col-span-2">
              <Campo label="Producto" requerido error={err("producto")}>
                <input name="producto" value={crud.form.producto} onChange={crud.cambiar} required maxLength={120} autoFocus
                  className={claseInput(err("producto"))} placeholder="Taza personalizada" />
              </Campo>
            </div>
          </div>
          <Campo label="Descripción" error={err("descripcion")} ayuda="Opcional: material, tamaño, colores…">
            <textarea name="descripcion" value={crud.form.descripcion} onChange={crud.cambiar} rows={3}
              className={claseInput(err("descripcion"))} placeholder="Taza de cerámica de 11 oz con foto y nombre" />
          </Campo>
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo label="Costo unitario (MXN)" requerido error={err("costo_unitario")} ayuda="Lo que te cuesta a ti">
              <input name="costo_unitario" type="number" min="0" step="0.01" inputMode="decimal" value={crud.form.costo_unitario}
                onChange={crud.cambiar} required className={claseInput(err("costo_unitario"))} placeholder="60.00" />
            </Campo>
            <Campo label="Precio de venta (MXN)" requerido error={err("precio_venta")} ayuda="Lo que paga el cliente">
              <input name="precio_venta" type="number" min="0.01" step="0.01" inputMode="decimal" value={crud.form.precio_venta}
                onChange={crud.cambiar} required className={claseInput(err("precio_venta"))} placeholder="150.00" />
            </Campo>
            <Campo label="Stock (piezas)" requerido error={err("stock")}>
              <input name="stock" type="number" min="0" step="1" inputMode="numeric" value={crud.form.stock}
                onChange={crud.cambiar} required className={claseInput(err("stock"))} placeholder="10" />
            </Campo>
            <Campo label="Fecha de registro" requerido error={err("fecha_registro")}>
              <input name="fecha_registro" type="date" max={hoyISO()} value={crud.form.fecha_registro}
                onChange={crud.cambiar} required className={claseInput(err("fecha_registro"))} />
            </Campo>
          </div>
          <p className="text-xs text-tinta/50"><span className="text-rose-500">*</span> Campos obligatorios</p>
          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
            <Boton type="button" variante="secundario" onClick={crud.cerrarForm} disabled={crud.guardando}>Cancelar</Boton>
            <Boton type="submit" disabled={crud.guardando}>
              {crud.guardando ? "Guardando…" : crud.editandoId ? "Guardar cambios" : "Agregar producto"}
            </Boton>
          </div>
        </form>
      </Modal>

      <ConfirmarEliminar
        item={crud.porEliminar}
        etiqueta={(p) => `${p.codigo} · ${p.producto}`}
        eliminando={crud.eliminando}
        onCancelar={() => crud.setPorEliminar(null)}
        onConfirmar={crud.confirmarEliminar}
      />
    </>
  );
}
