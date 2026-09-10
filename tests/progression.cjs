const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8').replace(/\r\n/g, '\n');
function extractFunction(name) {
  const match = source.match(new RegExp(`^function ${name}\\([^\\n]*\\)\\{[\\s\\S]*?^\\}`, 'm'));
  if (!match) throw new Error(`Missing function ${name}`);
  return match[0];
}
const definitions = source.match(/^const TROPHEES=\[[\s\S]*?^\];/m)?.[0];
assert.ok(definitions, 'Trophy definitions found');
const functions = ['courseNonComptee', 'die', 'defaitCompte', 'verifieTrophees', 'ordreMondes', 'demarre'].map(extractFunction).join('\n');

function game(overrides = {}) {
  const elements = new Map();
  const noop = () => {};
  const records = {};
  const ctx = {
    S: { MENU: 0, PLAY: 1, DEAD: 2 }, state: 1, t: 100,
    save: { flies: 90, km: 4500, runs: 8, cool: 0, or: 0, trophees: [] },
    eaten: 5, distance: 300, best: 0, vies: 0, vaSeRelever: false,
    hen: { ground: true, x: 0, y: 0, vy: 0 }, plumes: [], coeurs: [],
    airMax: 0, travObs: 0, dernierPoint: null,
    trophFile: [], trophT: -9, trophCur: null, TROPH_DUREE: 3.4, TROPH_ECART: 4,
    RECUL_VX: 1, RECUL_FREIN: 1, PAS_METRE: 1,
    monde: { nom: 'ferme' },
    // The draft must not make the all-worlds trophy impossible.
    MONDES: { ferme: {}, ville: {}, jungle: {}, desert: {}, glacier: {}, plage: {}, essai: { brouillon: true } },
    $: id => {
      if (!elements.has(id)) elements.set(id, { classList: { add: noop, remove: noop } });
      return elements.get(id);
    },
    T: (...args) => args.join(' '), chiffreHTML: String,
    montreVol: noop, SFX: { choc: noop, trophee: noop }, storeSave: noop,
    textesFin: noop, poseCarnet: noop, poseNiveaux: noop,
    carnetMonde: name => records[name] ||= { best: 0, bestMou: 0, bestDist: 0, runs: 0 },
    ...overrides,
  };
  ctx.carnet = () => ctx.carnetMonde(ctx.monde.nom);
  ctx.metres = () => ctx.distance;
  ctx.score = () => ctx.eaten * 50 + ctx.distance * 7;
  vm.createContext(ctx);
  vm.runInContext(`${functions}\n${definitions}\nglobalThis.trophies=TROPHEES;`, ctx);
  return ctx;
}
const cumulative = ['cent', 'km5', 'parties10'];
const unlocked = (g, key) => g.trophies.find(tr => tr.k === key).ok();

{
  const g = game();
  assert.deepEqual(cumulative.map(key => unlocked(g, key)), [false, false, false]);
  g.die();
  assert.deepEqual([g.save.flies, g.save.km, g.save.runs], [95, 4800, 9]);
  g.verifieTrophees();
  assert.deepEqual(cumulative.map(key => g.save.trophees.includes(key)), [false, false, false],
    'Final death must not double count this run and unlock unmet thresholds');
}
{
  const g = game({ save: { flies: 95, km: 4700, runs: 9, cool: 0, or: 0, trophees: [] } });
  assert.deepEqual(cumulative.map(key => unlocked(g, key)), [true, true, true]);
  g.die();
  g.verifieTrophees();
  assert.deepEqual(cumulative.map(key => g.save.trophees.includes(key)), [true, true, true],
    'Thresholds reached on the final frame remain eligible');
}
{
  const g = game({ vies: 1, save: { flies: 95, km: 4700, runs: 9, cool: 0, or: 0, trophees: [] } });
  g.die();
  assert.equal(g.vaSeRelever, true);
  assert.deepEqual([g.save.flies, g.save.km, g.save.runs], [95, 4700, 9]);
  assert.deepEqual(cumulative.map(key => unlocked(g, key)), [true, true, true],
    'A recoverable fall includes the still-unsaved current run');
}
{
  const g = game();
  for (let attempt = 0; attempt < 3; attempt++) {
    g.state = g.S.PLAY;
    g.eaten = 5 + attempt;
    g.distance = 300 + 50 * attempt;
    g.die();
    g.defaitCompte();
    assert.deepEqual([g.save.flies, g.save.km, g.save.runs], [90, 4500, 8],
      'Every checkpoint retry must undo flies, distance and run count together');
    assert.equal(g.carnet().runs, 0);
  }
  g.state = g.S.PLAY;
  g.eaten = 9;
  g.distance = 499;
  g.die();
  g.verifieTrophees();
  assert.deepEqual([g.save.flies, g.save.km, g.save.runs], [99, 4999, 9]);
  assert.deepEqual(cumulative.map(key => g.save.trophees.includes(key)), [false, false, false]);
}
{
  const g = game({ state: 0 });
  assert.equal(g.courseNonComptee(), false, 'Menus use saved totals only');
  const trophy = g.trophies.find(tr => tr.k === 'mondes');
  assert.equal(trophy.n, 6);
  for (const name of ['ferme', 'ville', 'jungle', 'desert', 'glacier']) g.carnetMonde(name).best = 1;
  assert.equal(trophy.ok(), false, 'Five records cannot unlock a six-world trophy');
  g.carnetMonde('plage').best = 1;
  assert.equal(trophy.ok(), true, 'Draft worlds do not block the trophy');
}
{
  // Boot from an existing save, then finish below or above the previous record.
  // The menu previously showed the saved record while the run compared against zero.
  for (const [score, expected, newRecord] of [[126, 133, false], [140, 140, true]]) {
    const g = game();
    g.save.monde = 'ferme';
    g.MONDES.ferme.nom = 'ferme';
    g.carnet().best = 133;
    g.score = () => score;
    g.best = 0;
    g.document = { body: {} };
    g.getComputedStyle = () => ({ fontFamily: 'sans-serif' });
    g.$('load').remove = () => {};
    for (const name of ['poseLangue', 'styleJeu', 'posePastillesMonde', 'setMute', 'checkOrient', 'resize', 'reset', 'requestAnimationFrame']) {
      g[name] = () => {};
    }
    g.muted = false;
    g.mondeOuvert = () => true;
    g.demarre();
    assert.equal(g.best, 133, 'Reload must restore the saved record before a new run');
    g.die();
    assert.equal(g.carnet().best, expected, 'A lower score must never overwrite the saved record');
    assert.equal(g.finRec, newRecord, 'New-record message must compare against the saved record');
  }
}
console.log('PASS: death, last-frame thresholds, extra life, repeated checkpoints, saved menu totals, all-worlds trophy, and record preservation after reload.');
