import { useCallback, useEffect, useState } from "react";

// Maneja la lista, el formulario y la eliminación para cualquier tabla.
export default function useCrud(api, vacio) {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const [formAbierto, setFormAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(vacio);
  const [erroresCampo, setErroresCampo] = useState({});
  const [guardando, setGuardando] = useState(false);

  const [porEliminar, setPorEliminar] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
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

  // El aviso verde desaparece solo después de 3 segundos
  useEffect(() => {
    if (!exito) return;
    const t = setTimeout(() => setExito(""), 3000);
    return () => clearTimeout(t);
  }, [exito]);

  const abrirNuevo = () => {
    setForm(typeof vacio === "function" ? vacio() : vacio);
    setEditandoId(null);
    setErroresCampo({});
    setFormAbierto(true);
  };

  const abrirEditar = (item) => {
    const { id, ...datos } = item;
    setForm(datos);
    setEditandoId(id);
    setErroresCampo({});
    setFormAbierto(true);
  };

  const cerrarForm = useCallback(() => setFormAbierto(false), []);

  const cambiar = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const guardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErroresCampo({});
    try {
      if (editandoId) {
        await api.actualizar(editandoId, form);
        setExito("Cambios guardados.");
      } else {
        await api.crear(form);
        setExito("Registro agregado.");
      }
      setFormAbierto(false);
      await cargar();
    } catch (err) {
      setErroresCampo(err.fields || {});
      if (!err.fields) setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const confirmarEliminar = async () => {
    try {
      await api.eliminar(porEliminar.id);
      setExito("Registro eliminado.");
      setPorEliminar(null);
      await cargar();
    } catch (e) {
      setError(e.message);
      setPorEliminar(null);
    }
  };

  return {
    items, cargando, error, setError, exito, setExito,
    formAbierto, editandoId, form, erroresCampo, guardando,
    abrirNuevo, abrirEditar, cerrarForm, cambiar, guardar,
    porEliminar, setPorEliminar, confirmarEliminar,
  };
}
