// Piezas de interfaz reutilizables: campos, botones y avisos

export function Campo({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-tinta/80">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-rose-600">{error}</span>}
    </label>
  );
}

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
    <div className={`mb-5 flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${estilos}`}>
      <span>{children}</span>
      {onCerrar && <button onClick={onCerrar} className="font-bold opacity-60 hover:opacity-100">×</button>}
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
