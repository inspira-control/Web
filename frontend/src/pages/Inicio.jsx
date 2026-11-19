import { Link } from "react-router-dom";
import { whatsappLink } from "../config.js";
import { IconWhatsApp } from "../components/Icons.jsx";

const categorias = [
  { titulo: "Tazas y termos", texto: "Con fotos, nombres o frases que lo dicen todo.", imagen: "/img/tazas.webp", alt: "Taza con el nombre Ana y termo personalizado" },
  { titulo: "Playeras y textiles", texto: "Diseños únicos para regalar o celebrar en equipo.", imagen: "/img/playeras.webp", alt: "Playeras personalizadas con corazón y estrella" },
  { titulo: "Cajas sorpresa", texto: "Detalles armados a la medida de cada ocasión.", imagen: "/img/cajas.webp", alt: "Caja de regalo con moño menta" },
  { titulo: "Recuerdos para eventos", texto: "Bodas, XV años, bautizos y cumpleaños.", imagen: "/img/recuerdos.webp", alt: "Frasco de recuerdo de XV años con globos" },
];

export default function Inicio() {
  return (
    <>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lila-100 via-white to-menta-100 px-6 py-14 sm:px-12 sm:py-20">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lila-200/50 blur-2xl" />
        <div className="absolute -bottom-20 right-24 h-56 w-56 rounded-full bg-menta-200/60 blur-2xl" />
        <div className="relative max-w-xl">
          <span className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-lila-600">
            Regalos personalizados
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-tinta sm:text-5xl">
            Detalles que <span className="font-logo font-normal text-lila-500">inspiran</span> y se recuerdan
          </h1>
          <p className="mt-5 text-lg text-tinta/70">
            Creamos regalos únicos con tu toque personal: nombres, fotos y mensajes que convierten cualquier objeto en un recuerdo especial.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/productos" className="rounded-xl bg-lila-500 px-6 py-3 font-semibold text-white shadow-sm shadow-lila-500/30 transition hover:bg-lila-600">
              Ver productos
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-menta-600 shadow-sm transition hover:bg-menta-50">
              <IconWhatsApp /> Pide el tuyo
            </a>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">¿Qué personalizamos?</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categorias.map((c) => (
            <article key={c.titulo} className="rounded-2xl border border-lila-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md hover:shadow-lila-100">
              <img src={c.imagen} alt={c.alt} width="800" height="600" loading="lazy"
                className="mb-4 aspect-[4/3] w-full rounded-xl object-cover" />
              <h3 className="font-bold">{c.titulo}</h3>
              <p className="mt-2 text-sm text-tinta/70">{c.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 sm:grid-cols-3">
        {[
          ["1", "Elige", "Escoge el producto que quieres regalar."],
          ["2", "Personaliza", "Envíanos tu foto, nombre o frase por WhatsApp."],
          ["3", "Sorprende", "Recibe tu regalo listo para emocionar."],
        ].map(([n, t, d]) => (
          <div key={n} className="rounded-2xl bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-menta-400 text-lg font-bold text-white">{n}</div>
            <h3 className="mt-4 font-bold">{t}</h3>
            <p className="mt-1 text-sm text-tinta/70">{d}</p>
          </div>
        ))}
      </section>
    </>
  );
}
