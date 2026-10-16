// Lógica de facetas compartida entre páginas y astro.config (sin import.meta.env)
import casos from './casos.json' with { type: 'json' };
export const MIN_INDEX = 3;
export const HERR = { 'whatsapp-business':'WhatsApp Business', chatgpt:'ChatGPT / OpenAI', claude:'Claude', make:'Make', n8n:'n8n', hubspot:'HubSpot', 'google-workspace':'Google Workspace', thefork:'TheFork', prestashop:'PrestaShop', woocommerce:'WooCommerce', stripe:'Stripe', vapi:'Vapi', llama:'Llama (modelo local)', doctoralia:'Doctoralia', copilotgestoria:'CopilotGestoria', nubioo:'Nubioo', bookline:'Bookline', solwees:'Solwees', kokuai:'Kokuai', agenteuno:'AgenteUno', 'ai-shop-helper':'AI Shop Helper', 'clinic-cloud':'Clinic Cloud', moodle:'Moodle', 'agente-ia-a-medida':'Agente de IA a medida', citaflow:'Citaflow', claudia:'ClaudIA' };
export const slugify = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\(.*?\)/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const herrMain = c => c.herramientas[0];
export function facetCounts(){
  const m = new Map(); const add = p => m.set(p,(m.get(p)||0)+1);
  for (const c of casos){ add(`/sector/${c.sector}/`); add(`/tarea/${c.tarea}/`); if(c.ciudad) add(`/ciudad/${slugify(c.ciudad)}/`); c.herramientas.forEach(h=>add(`/herramientas/${h}/`)); }
  return m;
}
export const thinFacets = () => new Set([...facetCounts()].filter(([,n])=>n<MIN_INDEX).map(([p])=>p));
