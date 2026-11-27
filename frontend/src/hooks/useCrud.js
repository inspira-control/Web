import { useCallback, useEffect, useState } from "react";

// Maneja la lista, el formulario y la eliminación para cualquier tabla.
// `vacio(items)` devuelve el formulario en blanco (recibe la lista para sugerir el siguiente código).
export default function useCrud(api, vacio) {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const [formAbierto, setFormAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(() => vacio([]));
  const [erroresCampo, setErroresCampo] = useState({});
  const [errorForm, setErrorForm] = useState("");
  const [guardando, setGuardando] = useState(false);

  const [porEliminar, setPorEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const cargar = useCallback(async () => {
    try {
      setItems(await api.listar());
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, [api]);

  useEffect(() => { cargar(); }, [cargar]);

  // El aviso verde desaparece solo después de 4 segundos
  useEffect(() => {
    if (!exito) return;
    const t = setTimeout(() => setExito(""), 4000);
    return () => clearTimeout(t);
  }, [exito]);

  const abrirNuevo = () => {
    setForm(vacio(items));
    setEditandoId(null);
    setErroresCampo({});
    setErrorForm("");
    setFormAbierto(true);
  };

  const abrirEditar = (item) => {
    const { id, ...datos } = item;
    // Los campos nulos se muestran como texto vacío
    setForm(Object.fromEntries(Object.entries(datos).map(([k, v]) => [k, v ?? ""])));
    setEditandoId(id);
    setErroresCampo({});
    setErrorForm("");
    setFormAbierto(true);
  };

  const cerrarForm = useCallback(() => { if (!guardando) setFormAbierto(false); }, [guardando]);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Al corregir un campo se quita su mensaje de error
    setErroresCampo((errs) => (errs[name] ? { ...errs, [name]: undefined } : errs));
  };

  const guardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErroresCampo({});
    setErrorForm("");
    try {
      if (editandoId) await api.actualizar(editandoId, form);
      else await api.crear(form);
      await cargar();
      setFormAbierto(false);
      setExito(editandoId ? "Cambios guardados correctamente." : "Registro agregado correctamente.");
    } catch (err) {
      setErroresCampo(err.fields || {});
      const general = err.fields?.non_field_errors?.[0] || err.fields?.detail;
      setErrorForm(general || err.message);
      if (err.status === 404) cargar();
    } finally {
      setGuardando(false);
    }
  };

  const confirmarEliminar = async () => {
    setEliminando(true);
    try {
      await api.eliminar(porEliminar.id);
      await cargar();
      setExito("Registro eliminado.");
    } catch (e) {
      setError(e.message);
      await cargar();
    } finally {
      setEliminando(false);
      setPorEliminar(null);
    }
  };

  return {
    items, cargando, error, setError, exito, setExito,
    formAbierto, editandoId, form, erroresCampo, errorForm, guardando,
    abrirNuevo, abrirEditar, cerrarForm, cambiar, guardar,
    porEliminar, setPorEliminar, eliminando, confirmarEliminar,
  };
}

// Sugiere el siguiente código consecutivo: P-0001, P-0002…
export function siguienteCodigo(items, prefijo) {
  const max = items.reduce((m, it) => {
    const r = new RegExp(`^${prefijo}-(\\d+)$`, "i").exec(it.codigo || "");
    return r ? Math.max(m, Number(r[1])) : m;
  }, 0);
  return `${prefijo}-${String(max + 1).padStart(4, "0")}`;
}
