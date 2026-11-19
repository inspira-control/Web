// Iconos SVG simples (sin dependencias externas)
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconInicio = (p) => (<svg {...base} {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-5h4v5" /></svg>);
export const IconNosotros = (p) => (<svg {...base} {...p}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 19c0-3 3-5 6-5s6 2 6 5" /><path d="M15 14.5c3 0 6 1.5 6 4.5" /></svg>);
export const IconMision = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></svg>);
export const IconProductos = (p) => (<svg {...base} {...p}><rect x="3" y="9" width="18" height="12" rx="1.5" /><path d="M2 9h20" /><path d="M12 9v12" /><path d="M12 9C9 3 5 5 7 8m5 1c3-6 7-4 5-1" /></svg>);
export const IconClientes = (p) => (<svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>);
export const IconMenu = (p) => (<svg {...base} {...p}><path d="M4 6h16M4 12h16M4 18h16" /></svg>);
export const IconCerrar = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconMas = (p) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const IconEditar = (p) => (<svg {...base} {...p}><path d="M4 20h4L19 9l-4-4L4 16v4z" /><path d="M14 6l4 4" /></svg>);
export const IconBorrar = (p) => (<svg {...base} {...p}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></svg>);
export const IconBuscar = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></svg>);

export const IconWhatsApp = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.1-1.3c0-.1-.2-.2-.5-.3z" /></svg>
);
export const IconFacebook = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2A21 21 0 0014.6 2C12.2 2 10.6 3.5 10.6 6.1v2.4H8v3.4h2.6V22H14V11.9h2.7l.4-3.4H14z" /></svg>
);
export const IconInstagram = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
);
