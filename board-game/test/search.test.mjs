import assert from 'node:assert/strict';
import { createGame, advanceTurn, options } from '../src/rules.js';
import { chooseMove } from '../src/ai.js';
import { bestMove, assess, boardText, clashRecord, actionsFor, canStrike } from '../src/search.js';

const empty = () => Array.from({ length: 5 }, () => Array(5).fill(null));
const P = (side, type, id) => ({ side, type, id: id || `${side}${type}${Math.random()}` });
// 1. takes a win when one is on
let b = empty(); b[0][2] = P(1, 'X'); b[1][2] = P(0, 'S'); b[4][2] = P(0, 'X'); b[3][0] = P(1, 'A');
let m = bestMove(b, 0); assert.ok(m.attack && m.to.r === 0 && m.to.c === 2, 'strikes the monarch'); assert.match(m.reason, /wins the game/);
// 2. saves its monarch when threatened (cannot win first)
b = empty(); b[0][2] = P(1, 'X'); b[4][2] = P(0, 'X'); b[3][1] = P(1, 'S'); b[2][4] = P(0, 'A');
m = bestMove(b, 0, { human: 1, rate: () => 0.5 });
let after = b.map((r) => r.slice()); after[m.to.r][m.to.c] = after[m.from.r][m.from.c]; after[m.from.r][m.from.c] = null;
let k; for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) if (after[r][c]?.side === 0 && after[r][c].type === 'X') k = { r, c };
assert.ok(!canStrike(after, k.r, k.c, 1), 'monarch no longer strikable: ' + m.text + ' (' + m.reason + ')');
// 3. adapts: avoids a fight the human always wins, takes one the human always loses
b = empty(); b[0][4] = P(1, 'X'); b[4][4] = P(0, 'X'); b[1][0] = P(1, 'S'); b[1][1] = P(0, 'A');
const strong = { human: 0, rate: () => 0.97 }, weak = { human: 0, rate: () => 0.03 };
assert.equal(bestMove(b, 1, strong, () => 0).attack, false, 'does not attack a human who wins every fight');
assert.equal(bestMove(b, 1, weak, () => 0).attack, true, 'attacks a human who loses every fight');
// 4. coaching: missed win and blunder are recognised
b = empty(); b[0][2] = P(1, 'X'); b[1][2] = P(0, 'S'); b[4][2] = P(0, 'X'); b[3][0] = P(1, 'A');
assert.equal(assess(b, 0, { from: { r: 4, c: 2 }, to: { r: 4, c: 1 }, attack: false }).kind, 'missed_win');
b = empty(); b[0][2] = P(1, 'X'); b[4][2] = P(0, 'X'); b[2][2] = P(1, 'S'); b[4][0] = P(0, 'A');
const bl = assess(b, 0, { from: { r: 4, c: 2 }, to: { r: 3, c: 2 }, attack: false }); assert.equal(bl.kind, 'blunder'); assert.match(bl.note, /monarch on c2 can now be struck/);
// 5. clash record
const store = { v: {}, getItem(k) { return this.v[k] ?? null; }, setItem(k, x) { this.v[k] = x; } };
const rec = clashRecord(store, 0); assert.equal(rec.rate('S', 'A'), 0.6); for (let i = 0; i < 5; i++) rec.record('S', 'A', false); assert.equal(rec.rate('S', 'A'), 0.3); assert.equal(clashRecord(store, 0).rate('S', 'A'), 0.3); assert.match(rec.summary(), /swordsman against archer: won 0 of 5/);
// 6. plays whole games legally and beats the old one-move player more often than not (clashes at even odds)
let wins = 0, losses = 0, draws = 0, ms = 0, n = 0;
for (let g = 0; g < 30; g++) {
  const game = createGame(); const strongSide = g % 2; let plies = 0;
  while (game.phase === 'play' && plies++ < 120) {
    const t0 = performance.now();
    const a = game.turn === strongSide ? bestMove(game.board, game.turn, null) : chooseMove(game);
    if (game.turn === strongSide) { ms += performance.now() - t0; n++; }
    assert.ok(actionsFor(game.board, game.turn).some((x) => x.from.r === a.from.r && x.from.c === a.from.c && x.to.r === a.to.r && x.to.c === a.to.c && x.attack === a.attack), 'legal');
    const target = game.board[a.to.r][a.to.c];
    if (a.attack && target.type === 'X') { game.phase = 'over'; game.winner = game.turn; break; }
    if (!a.attack || Math.random() < 0.5) { game.board[a.to.r][a.to.c] = game.board[a.from.r][a.from.c]; }
    game.board[a.from.r][a.from.c] = null;
    advanceTurn(game);
  }
  if (game.winner === strongSide) wins++; else if (game.winner == null) draws++; else losses++;
}
console.log(`new search vs old player over 30 games: ${wins} won, ${losses} lost, ${draws} unfinished; ${(ms / n).toFixed(1)} ms per move`);
console.log(boardText(createGame().board));
assert.ok(wins > losses, 'stronger than the old player');
console.log('ok');
