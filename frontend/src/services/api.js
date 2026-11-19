import { API_URL } from "../config.js";

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. ¿Está encendido el backend?");
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error("Revisa los datos del formulario.");
    err.fields = data && typeof data === "object" ? data : {};
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
