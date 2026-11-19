import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { IconMenu, IconWhatsApp } from "./Icons.jsx";
import { whatsappLink } from "../config.js";

export default function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

      {/* Barra superior solo en móvil */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-lila-100 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <button onClick={() => setMenuAbierto(true)} className="rounded-lg p-2 text-lila-600 hover:bg-lila-50" aria-label="Abrir menú">
          <IconMenu />
        </button>
        <span className="font-logo text-2xl text-lila-500">Inspira</span>
        <span className="w-9" />
      </header>

      <main className="lg:pl-72">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-12">
          <Outlet />
        </div>
        <footer className="border-t border-lila-100 py-6 text-center text-sm text-tinta/50">
          © {new Date().getFullYear()} Inspira · Regalos personalizados
        </footer>
      </main>

      {/* Botón flotante de WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-5 right-5 z-20 rounded-full bg-menta-500 p-4 text-white shadow-lg shadow-menta-500/30 transition hover:scale-105 hover:bg-menta-600"
      >
        <IconWhatsApp width={26} height={26} />
      </a>
    </div>
  );
}
