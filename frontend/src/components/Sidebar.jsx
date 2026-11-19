import { NavLink } from "react-router-dom";
import { FACEBOOK_URL, INSTAGRAM_URL, whatsappLink } from "../config.js";
import {
  IconInicio, IconNosotros, IconMision, IconProductos, IconClientes,
  IconWhatsApp, IconFacebook, IconInstagram, IconCerrar,
} from "./Icons.jsx";

const enlaces = [
  { to: "/", label: "Inicio", icon: IconInicio },
  { to: "/nosotros", label: "Nosotros", icon: IconNosotros },
  { to: "/mision-vision", label: "Misión y visión", icon: IconMision },
  { to: "/productos", label: "Productos", icon: IconProductos },
  { to: "/clientes", label: "Clientes", icon: IconClientes },
];

export default function Sidebar({ abierto, onCerrar }) {
  return (
    <>
      {/* Fondo oscuro en móvil cuando el menú está abierto */}
      <div
        onClick={onCerrar}
        className={`fixed inset-0 z-30 bg-tinta/30 backdrop-blur-sm transition-opacity lg:hidden ${abierto ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-lila-100 bg-white transition-transform duration-300 lg:translate-x-0 ${abierto ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 pb-4 pt-7">
          <NavLink to="/" onClick={onCerrar} className="font-logo text-4xl text-lila-500">
            Inspira
          </NavLink>
          <button onClick={onCerrar} className="rounded-lg p-2 text-lila-500 hover:bg-lila-50 lg:hidden" aria-label="Cerrar menú">
            <IconCerrar />
          </button>
        </div>
        <p className="px-6 text-sm text-tinta/60">Regalos personalizados</p>

        <nav className="mt-8 flex-1 space-y-1 px-4">
          {enlaces.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onCerrar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${
                  isActive ? "bg-lila-100 text-lila-700" : "text-tinta/70 hover:bg-menta-50 hover:text-menta-600"
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Contacto */}
        <div className="m-4 rounded-2xl bg-menta-50 p-5">
          <p className="text-sm font-bold text-menta-600">Contáctanos</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-menta-500 px-4 py-2.5 font-semibold text-white transition hover:bg-menta-600"
          >
            <IconWhatsApp /> WhatsApp
          </a>
          <div className="mt-4 flex justify-center gap-3">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="rounded-full bg-white p-2.5 text-lila-500 shadow-sm transition hover:bg-lila-500 hover:text-white">
              <IconFacebook />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="rounded-full bg-white p-2.5 text-lila-500 shadow-sm transition hover:bg-lila-500 hover:text-white">
              <IconInstagram />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
