import PageHeader from "../components/PageHeader.jsx";

const valores = [
  { titulo: "Creatividad", texto: "Cada diseño se piensa para la persona que lo va a recibir." },
  { titulo: "Calidad", texto: "Usamos materiales duraderos y cuidamos cada acabado." },
  { titulo: "Cercanía", texto: "Te acompañamos desde la idea hasta la entrega." },
  { titulo: "Puntualidad", texto: "Sabemos que las fechas especiales no esperan." },
];

export default function Nosotros() {
  return (
    <>
      <PageHeader etiqueta="Quiénes somos" titulo="Nosotros" />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-4 text-tinta/80 lg:col-span-3">
          <p>
            <strong className="text-lila-600">Inspira</strong> nació de la idea de que los mejores regalos son los que cuentan una historia.
            Somos un taller de regalos personalizados donde transformamos objetos cotidianos en recuerdos únicos.
          </p>
          <p>
            Trabajamos con tazas, playeras, cojines, cajas sorpresa, recuerdos para eventos y mucho más. Escuchamos lo que quieres
            transmitir y lo convertimos en un diseño hecho a la medida.
          </p>
          <p>
            Cada pedido se elabora con dedicación, porque sabemos que detrás de cada regalo hay una persona especial.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-lila-100 to-menta-100 shadow-sm shadow-lila-200 lg:col-span-2">
          <video
            className="aspect-square h-auto w-full object-cover"
            src="/video/inspira-nosotros.mp4"
            poster="/video/inspira-nosotros.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Video de regalos personalizados Inspira: tazas, playeras y tarjetas"
          />
        </div>
      </div>

      <h2 className="mt-14 text-2xl font-bold">Nuestros valores</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {valores.map((v, i) => (
          <div key={v.titulo} className={`rounded-2xl p-6 ${i % 2 ? "bg-menta-50" : "bg-lila-50"}`}>
            <h3 className={`font-bold ${i % 2 ? "text-menta-600" : "text-lila-600"}`}>{v.titulo}</h3>
            <p className="mt-2 text-sm text-tinta/70">{v.texto}</p>
          </div>
        ))}
      </div>
    </>
  );
}
