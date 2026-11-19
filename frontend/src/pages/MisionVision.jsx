import PageHeader from "../components/PageHeader.jsx";
import { IconMision } from "../components/Icons.jsx";

export default function MisionVision() {
  return (
    <>
      <PageHeader etiqueta="Nuestro propósito" titulo="Misión y visión" />
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-lila-100 bg-white p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lila-100 text-lila-600">
            <IconMision />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-lila-600">Misión</h2>
          <p className="mt-3 leading-relaxed text-tinta/80">
            Crear regalos personalizados de calidad que expresen emociones y fortalezcan los lazos entre las personas,
            ofreciendo diseños originales, atención cercana y entregas puntuales para cada ocasión especial.
          </p>
        </article>
        <article className="rounded-3xl border border-menta-100 bg-white p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-menta-100 text-menta-600">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
          </div>
          <h2 className="mt-5 text-2xl font-bold text-menta-600">Visión</h2>
          <p className="mt-3 leading-relaxed text-tinta/80">
            Ser la tienda de regalos personalizados preferida de nuestra región, reconocida por su creatividad, su calidad
            y por convertir cada detalle en un recuerdo inolvidable.
          </p>
        </article>
      </div>
    </>
  );
}
