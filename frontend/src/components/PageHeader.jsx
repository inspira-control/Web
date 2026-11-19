export default function PageHeader({ etiqueta, titulo, children }) {
  return (
    <div className="mb-8">
      {etiqueta && (
        <span className="inline-block rounded-full bg-menta-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-menta-600">
          {etiqueta}
        </span>
      )}
      <h1 className="mt-3 text-3xl font-bold text-tinta sm:text-4xl">{titulo}</h1>
      {children && <p className="mt-3 max-w-2xl text-tinta/70">{children}</p>}
    </div>
  );
}
