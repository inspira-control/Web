// Datos que cambian entre local y producción. Se leen del archivo .env
export const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "5540323871";
export const FACEBOOK_URL = import.meta.env.VITE_FACEBOOK_URL || "https://www.facebook.com/share/1EnVYnVfpd/";
export const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/inspiraarte.detalles?lqvp=azEydXc3YXFoeGFz";

export const whatsappLink = (mensaje = "¡Hola Inspira! Me gustaría información sobre un regalo personalizado.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
