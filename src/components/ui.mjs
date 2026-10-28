// Ayudas de presentación (solo diseño): color estable por herramienta/sector y un emoji por sector y tarea.
// Los emojis son decorativos: se pintan siempre con aria-hidden y nunca sustituyen al texto.
const slug = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
// Tonos claros (300-400): con texto negro el contraste es ≥ 7:1 en los dos temas.
export const PALETA = ['#a78bfa','#67e8f9','#f0abfc','#93c5fd','#c4b5fd','#5eead4','#f9a8d4','#7dd3fc','#a5b4fc','#86efac','#e879f9','#38bdf8'];
const FIJOS = {
  'whatsapp-business':'#86efac', chatgpt:'#5eead4', claude:'#fdba74', make:'#c4b5fd', n8n:'#f9a8d4', 'agente-ia-a-medida':'#93c5fd', lovable:'#f0abfc', 'ia-generica':'#d4d4d8',
  inmobiliaria:'#7dd3fc', hosteleria:'#fcd34d', comercio:'#f9a8d4', asesoria:'#c4b5fd', salud:'#86efac', servicios:'#93c5fd', academia:'#fde68a', abogados:'#a5b4fc', taller:'#fca5a5', construccion:'#fdba74'
};
export const colorDe = (k = '') => { const s = slug(k); if (FIJOS[s]) return FIJOS[s]; let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return PALETA[h % PALETA.length]; };
export const EMOJI_SECTOR = { inmobiliaria:'🏠', hosteleria:'🍽️', comercio:'🛍️', asesoria:'🧾', salud:'🩺', servicios:'🧰', academia:'🎓', abogados:'⚖️', taller:'🔧', construccion:'🏗️' };
export const EMOJI_TAREA = { facturacion:'💶', 'atencion-cliente':'💬', marketing:'📣', ventas:'🤝', admin:'🗂️' };
