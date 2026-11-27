import { API_URL } from "../config.js";

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. Revisa tu conexión o que el backend esté encendido.");
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    let mensaje = "Ocurrió un error inesperado. Intenta de nuevo.";
    if (res.status === 400) mensaje = "Revisa los campos marcados en rojo.";
    else if (res.status === 404) mensaje = "Ese registro ya no existe; puede que se haya eliminado. Actualizamos la lista.";
    else if (res.status >= 500) mensaje = "El servidor tuvo un problema. Intenta de nuevo en un momento.";
    const err = new Error(mensaje);
    err.status = res.status;
    if (res.status === 400 && data && typeof data === "object") err.fields = data;
    throw err;
  }
  return data;
}

// Crea las funciones CRUD para un recurso de la API (productos, clientes)
function recurso(nombre) {
  return {
    listar: () => request(`/${nombre}/`),
    crear: (datos) => request(`/${nombre}/`, { method: "POST", body: JSON.stringify(datos) }),
    actualizar: (id, datos) => request(`/${nombre}/${id}/`, { method: "PUT", body: JSON.stringify(datos) }),
    eliminar: (id) => request(`/${nombre}/${id}/`, { method: "DELETE" }),
  };
}

export const productosApi = recurso("productos");
export const clientesApi = recurso("clientes");
