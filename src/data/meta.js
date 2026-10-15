export const SECTORES = { inmobiliaria:'Inmobiliaria', hosteleria:'Hostelería', comercio:'Comercio', asesoria:'Asesoría y gestoría', salud:'Salud', servicios:'Servicios' };
export const TAREAS = { facturacion:'Facturación', 'atencion-cliente':'Atención al cliente', marketing:'Marketing', ventas:'Ventas', admin:'Administración' };
export const SITE = { nombre:'CasosIA', url:(import.meta.env.SITE+import.meta.env.BASE_URL).replace(/\/+$/,'').replace(/([^:])\/\//,'$1/'), desc:'Directorio de casos reales de agentes de IA para autónomos y pymes en España, con resultados, prompt listo para copiar y fuente verificable.' };

export const u = (p='/') => (import.meta.env.BASE_URL.replace(/\/$/,'') + p) || '/';
export const ORIGIN = new URL(import.meta.env.SITE).origin;
