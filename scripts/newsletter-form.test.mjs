import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Ejecuta el manejador real, sin enviar altas ni cargar servicios externos.
const source = readFileSync(new URL('../src/components/NewsletterForm.astro', import.meta.url), 'utf8');
const script = source.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'La newsletter debe tener un manejador de envío comprobable');

async function submit({ ok = true, payload = {}, invalidJson = false, offline = false }) {
  const message = { textContent: '' };
  const button = { disabled: false, hidden: false };
  const fields = [{ hidden: false }, button];
  let handler;
  const form = {
    action: 'https://example.test/subscribe',
    website: { value: '' },
    addEventListener: (event, callback) => { assert.equal(event, 'submit'); handler = callback; },
    querySelector: selector => selector === '.nlmsg' ? message : button,
    querySelectorAll: () => fields,
  };
  vm.runInNewContext(script, {
    document: { querySelectorAll: () => [form] },
    FormData: class {},
    fetch: async () => {
      if (offline) throw new Error('offline');
      return { ok, json: async () => {
        if (invalidJson) throw new SyntaxError('invalid JSON');
        return payload;
      } };
    },
  });
  let prevented = false;
  await handler({ preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
  return { message: message.textContent, button, fields };
}

test('HTTP correcto y success booleano true muestran la solicitud de confirmación', async () => {
  const result = await submit({ payload: { success: true } });
  assert.match(result.message, /email para confirmar/);
  assert.ok(result.fields.every(field => field.hidden));
});

for (const [name, response] of [
  ['objeto vacío', {}],
  ['success false', { payload: { success: false } }],
  ['success como texto', { payload: { success: 'true' } }],
  ['success numérico', { payload: { success: 1 } }],
  ['success null', { payload: { success: null } }],
  ['respuesta null', { payload: null }],
  ['JSON inválido o vacío', { invalidJson: true }],
  ['error HTTP aunque success sea true', { ok: false, payload: { success: true } }],
  ['fallo de red', { offline: true }],
]) {
  test(`${name}: no muestra éxito y permite reintentar`, async () => {
    const result = await submit(response);
    assert.doesNotMatch(result.message, /te hemos enviado/);
    assert.match(result.message, /No se ha podido/);
    assert.equal(result.button.disabled, false);
    assert.ok(result.fields.every(field => !field.hidden));
  });
}
