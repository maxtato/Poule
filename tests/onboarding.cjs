const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8').replace(/\r\n/g, '\n');
const fn = name => {
  const match = source.match(new RegExp(`^function ${name}\\([^\\n]*\\)\\{[\\s\\S]*?^\\}`, 'm'));
  assert.ok(match, `Missing ${name}`);
  return match[0];
};

function app(saved = {}, initial = {}) {
  const elements = new Map();
  const events = new Map();
  const counters = { reset: 0, stored: 0, released: 0, countdown: 0, pressed: 0 };
  const doc = { activeElement: null };
  function el(id) {
    if (elements.has(id)) return elements.get(id);
    const classes = new Set();
    const e = {
      id, inert: false, hidden: false, isConnected: true, dataset: {}, textContent: '',
      classList: {
        add: value => classes.add(value), remove: value => classes.delete(value),
        contains: value => classes.has(value),
      },
      focus() { doc.activeElement = e; },
      addEventListener(type, listener) { events.set(`${id}:${type}`, listener); },
    };
    elements.set(id, e);
    return e;
  }
  el('stage').children = ['canvas', 'menu', 'pref', 'aide', 'over'].map(el);
  el('over').inert = true; // Existing inert state must survive opening and closing help.
  el('menu').classList.add('on');
  el('aide').hidden = true;
  el('play').focus();
  const ctx = {
    $: el, document: doc,
    save: { runs: 0, guideVu: false, ...saved },
    S: { MENU: 0, PLAY: 1, DEAD: 2 }, state: 0, couche: false, halted: false, decompte: null,
    fingers: new Set([1]), hen: { feathers: 1 }, combo: 0, eaten: 0, t: 20, lastEat: 0,
    monde: { nom: 'ferme' }, cooling: false,
    release() { counters.released++; },
    cool() { return ctx.cooling; },
    T: key => `translated:${key}`, fontePixel() {},
    storeSave() { counters.stored++; },
    mondeOuvert() { return true; }, choisirMonde() {},
    unhalt() { ctx.halted = false; },
    reset() { counters.reset++; },
    decompteVers() { counters.countdown++; ctx.decompte = {}; },
    press() { counters.pressed++; },
    addEventListener(type, callback) { events.set(`window:${type}`, callback); },
    ...initial,
  };
  vm.createContext(ctx);
  const handlers = source.slice(source.indexOf('$("aideouvrir").addEventListener'), source.indexOf('/* Les rappels des trois premières parties'));
  const keys = source.match(/^addEventListener\("keydown",e=>\{\n  if\(\$\("aide"\)[\s\S]*?^\}\);/m)?.[0];
  const frozen = source.match(/^const frozen=.*;$/m)?.[0];
  vm.runInContext(`let aideDepart=false, aideRetourFocus=null; const aideInertes=new Map();
    ${['ouvreAide', 'fermeAide', 'start', 'cleConseil', 'poseConseil'].map(fn).join('\n')}
    ${frozen}
    ${handlers}
    ${keys}
    globalThis.isFrozen=frozen;`, ctx);
  return { ctx, el, doc, counters, events };
}

{
  const a = app();
  a.ctx.start();
  assert.equal(a.el('aide').hidden, false);
  assert.equal(a.ctx.state, a.ctx.S.MENU);
  assert.equal(a.counters.reset, 0, 'The world must not start behind first-run help');
  assert.equal(a.ctx.isFrozen(), true);
  assert.equal(a.ctx.fingers.size, 0);
  assert.equal(a.doc.activeElement.id, 'aideok');
  assert.equal(a.el('menu').inert, true);
  assert.equal(a.el('aide').inert, false);
  a.ctx.start();
  assert.equal(a.counters.reset, 0, 'Repeated Play inputs must not bypass help');
  a.ctx.fermeAide();
  assert.equal(a.ctx.save.guideVu, false, 'Back must leave the first-run guide eligible');
  assert.equal(a.counters.stored, 0);
  assert.equal(a.doc.activeElement.id, 'play');
  assert.equal(a.el('menu').inert, false);
  assert.equal(a.el('over').inert, true);
  a.ctx.start();
  a.ctx.fermeAide(true);
  assert.equal(a.ctx.save.guideVu, true);
  assert.equal(a.counters.stored, 1);
  assert.equal(a.ctx.state, a.ctx.S.PLAY);
  assert.equal(a.counters.reset, 1);
  assert.equal(a.counters.countdown, 1);
}
{
  for (const saved of [{ guideVu: true }, { runs: 4 }]) {
    const a = app(saved);
    a.ctx.start();
    assert.equal(a.el('aide').hidden, true, 'Returning players should start immediately');
    assert.equal(a.counters.countdown, 1);
  }
}
{
  const a = app({ guideVu: true }, { state: 1, halted: true });
  a.el('aideouvrir').focus();
  a.ctx.ouvreAide();
  assert.equal(a.el('aideretour').hidden, true);
  assert.equal(a.el('aideok').dataset.t, 'fermer');
  let prevented = false;
  a.events.get('aide:keydown')({ key: 'Tab', shiftKey: false, preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(a.doc.activeElement.id, 'aideok', 'Single-button guide traps Tab on Close');
  a.events.get('window:keydown')({ code: 'Space', preventDefault() { throw new Error('Space should activate the guide button normally'); } });
  assert.equal(a.counters.pressed, 0, 'Guide keyboard commands do not reach the game');
  a.ctx.fermeAide(true);
  assert.equal(a.ctx.halted, true, 'Reviewing help must preserve the existing pause');
  assert.equal(a.doc.activeElement.id, 'aideouvrir');
  assert.equal(a.counters.reset, 0);
  assert.equal(a.counters.stored, 0);
}
{
  const a = app({}, { state: 1 });
  assert.equal(a.ctx.cleConseil(), 'volmot');
  a.ctx.eaten = 1; a.ctx.lastEat = 19;
  assert.equal(a.ctx.cleConseil(), 'conseilmouche');
  a.ctx.t = 24;
  assert.equal(a.ctx.cleConseil(), 'volmot', 'Fly praise expires according to game time');
  a.ctx.combo = 5;
  assert.equal(a.ctx.cleConseil(), 'conseilcombo');
  a.ctx.hen.feathers = 0.1;
  assert.equal(a.ctx.cleConseil(), 'conseilplumes');
  a.ctx.cooling = true;
  assert.equal(a.ctx.cleConseil(), 'conseilcool');
  a.ctx.save.runs = 3;
  assert.equal(a.ctx.cleConseil(), 'volmot', 'Contextual hints end after three completed runs');
  a.ctx.poseConseil();
  assert.equal(a.el('volmot').textContent, 'translated:volmot');
}
console.log('PASS: first-run gating, cancellation, persistence, replay, inert/focus restoration, keyboard blocking and contextual hints.');
