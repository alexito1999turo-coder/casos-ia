// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE MONETIZACIÓN Y LEGAL — único archivo que hay que rellenar.
// Mientras un valor esté vacío (''), la parte correspondiente NO se activa:
//  · formularios → muestran «próximamente» o un mailto (si hay CONTACT_EMAIL);
//  · aviso legal / privacidad / transparencia → muestran [PLACEHOLDER] y van en noindex.
// Ver README.md, sección «Monetización: qué tiene que crear Alex».
// ─────────────────────────────────────────────────────────────────────────────

// Email de contacto visible (hola@…). Se usa como respaldo en todos los formularios.
export const CONTACT_EMAIL = '';

// Titular del sitio (LSSI art. 10). Si falta alguno, las páginas legales llevan noindex.
export const TITULAR = {
  nombre: '',     // Nombre y apellidos o razón social
  nif: '',        // NIF / NIE / CIF
  direccion: '',  // Domicilio completo (calle, CP, ciudad, provincia)
  email: '',      // Email de contacto del titular (puede ser el mismo que CONTACT_EMAIL)
};

// Newsletter «Los 5 del lunes» (MailerLite, formulario embebido con doble opt-in).
// accountId y formId salen del código de inserción HTML del formulario en MailerLite:
//   https://assets.mailerlite.com/jsonp/<accountId>/forms/<formId>/subscribe
export const MAILERLITE = {
  accountId: '',
  formId: '',
};

// Formularios Tally (ID corto de la URL tally.so/r/<ID>).
export const TALLY = {
  enviarCaso: '',  // formulario «Envía un caso»
  patrocinar: '',  // formulario «Plaza de fundador / patrocinio»
};

// Programas de afiliación. NINGUNO ACTIVO. Para activarlo hacen falta las tres cosas:
//   1) activo: true y url de afiliado aquí;
//   2) el caso lleva el campo opcional "afiliado": "<clave>" en casos.json;
//   3) la herramienta ya aparece en el caso (herramientas[] o herramienta).
// El enlace sale marcado como «Enlace de afiliado» con rel="sponsored nofollow".
export const AFILIADOS = {
  make: { nombre: 'Make', herramienta: 'make', url: '', activo: false },
  n8n: { nombre: 'n8n', herramienta: 'n8n', url: '', activo: false },
  lovable: { nombre: 'Lovable', herramienta: 'lovable', url: '', activo: false },
};

// ── Derivados (no tocar) ─────────────────────────────────────────────────────
export const titularPendiente = () => Object.values(TITULAR).some(v => !String(v).trim());
// Candado: sin responsable identificado no se recoge ningún dato (formularios apagados).
export const formsOn = () => !titularPendiente();
export const mlAction = () => (formsOn() && MAILERLITE.accountId && MAILERLITE.formId)
  ? `https://assets.mailerlite.com/jsonp/${MAILERLITE.accountId}/forms/${MAILERLITE.formId}/subscribe` : '';
export const tallyId = id => formsOn() && id ? id : '';
export const tallyUrl = id => id ? `https://tally.so/r/${id}` : '';
export const tallyEmbed = id => id ? `https://tally.so/embed/${id}?alignLeft=1&hideTitle=1&transparentBackground=1` : '';
// Páginas con datos del titular: noindex y fuera del sitemap hasta que se rellenen.
export const LEGAL_PAGES = ['/aviso-legal/', '/privacidad/', '/transparencia/'];
export const afiliadoDe = c => {
  const a = c && c.afiliado && AFILIADOS[c.afiliado];
  if (!a || !a.activo || !a.url) return null;
  return (c.herramientas || []).includes(a.herramienta) ? a : null;
};
