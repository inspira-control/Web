// Piezas de interfaz reutilizables: campos, botones y avisos

export function Campo({ label, error, ayuda, requerido, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-tinta/80">
        {label} {requerido && <span className="text-rose-500" aria-hidden="true">*</span>}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-sm text-rose-600" role="alert">{error}</span>
      ) : ayuda ? (
        <span className="mt-1 block text-xs text-tinta/50">{ayuda}</span>
      ) : null}
    </label>
  );
}

// Clase del input según tenga error o no
export const claseInput = (error) =>
  error ? `${inputClase} border-rose-300 focus:border-rose-400 focus:ring-rose-100` : inputClase;

export const inputClase =
  "w-full rounded-xl border border-lila-200 bg-white px-4 py-2.5 text-tinta outline-none transition placeholder:text-tinta/40 focus:border-lila-400 focus:ring-4 focus:ring-lila-100";

export function Boton({ variante = "primario", className = "", ...props }) {
  const estilos = {
    primario: "bg-lila-500 text-white hover:bg-lila-600 shadow-sm shadow-lila-500/20",
    secundario: "bg-white text-tinta/70 border border-lila-200 hover:bg-lila-50",
    peligro: "bg-rose-500 text-white hover:bg-rose-600",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${estilos[variante]} ${className}`}
      {...props}
    />
  );
}

export function Aviso({ tipo = "error", children, onCerrar }) {
  if (!children) return null;
  const estilos = tipo === "error" ? "border-rose-200 bg-rose-50 text-rose-700" : "border-menta-200 bg-menta-50 text-menta-600";
  return (
    <div role={tipo === "error" ? "alert" : "status"} className={`mb-5 flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${estilos}`}>
      <span>{children}</span>
      {onCerrar && <button type="button" onClick={onCerrar} aria-label="Cerrar aviso" className="font-bold opacity-60 hover:opacity-100">×</button>}
    </div>
  );
}

export const primerError = (fields, campo) => {
  const v = fields?.[campo];
  return Array.isArray(v) ? v[0] : v;
};

export const hoyISO = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

export const formatoFecha = (iso) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" }) : "";

export const formatoPrecio = (n) =>
  Number(n).toLocaleString("es-MX", { style: "currency", currency: "MXN" });

// Contador "3 de 10 productos"
export function Contador({ mostrados, total, singular, plural }) {
  if (!total) return null;
  const palabra = total === 1 ? singular : plural;
  return (
    <p className="mb-3 text-sm text-tinta/50">
      {mostrados === total ? `${total} ${palabra}` : `Mostrando ${mostrados} de ${total} ${plural}`}
    </p>
  );
}

// Encabezado de columna que ordena la tabla al hacer clic
export function Columna({ campo, orden, onOrdenar, children, className = "" }) {
  const activo = orden.campo === campo;
  return (
    <th className={`px-3 py-3.5 font-bold ${className}`} aria-sort={activo ? (orden.asc ? "ascending" : "descending") : "none"}>
      <button type="button" onClick={() => onOrdenar(campo)} className="inline-flex items-center gap-1 hover:underline">
        {children}
        <span className={activo ? "opacity-100" : "opacity-30"} aria-hidden="true">{activo && !orden.asc ? "▼" : "▲"}</span>
      </button>
    </th>
  );
}

// Ordena una lista por un campo (números como números, texto en orden alfabético)
export function ordenar(lista, { campo, asc }) {
  const copia = [...lista];
  copia.sort((a, b) => {
    const x = a[campo] ?? "", y = b[campo] ?? "";
    const nx = Number(x), ny = Number(y);
    const r = x !== "" && y !== "" && !isNaN(nx) && !isNaN(ny)
      ? nx - ny
      : String(x).localeCompare(String(y), "es", { numeric: true, sensitivity: "base" });
    return asc ? r : -r;
  });
  return copia;
}

// Quita acentos y mayúsculas para que "lopez" encuentre "López"
export const normalizar = (t) => String(t ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
