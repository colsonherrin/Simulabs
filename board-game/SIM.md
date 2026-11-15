# Sim in Crownfall

The Simulacra character stands across the board from you, plays Violet, and teaches you the game.
She is there whenever you play "Vs computer".

## Using it

1. On the title screen paste an OpenAI key and press **Save** (or press **Talk to Sim** if a key
   is already saved). Allow the microphone. The key stays in this browser and is sent only to OpenAI.
2. Start the game (Play here, Enter AR or Enter VR). Just talk to her: ask how to play, ask for a
   hint, or chat. You can interrupt her.

Without a key she still stands there, plays and coaches, in text instead of speech.

## How it works

| Part | Where | What it does |
|---|---|---|
| Body | `../webxr/avatar.js` (shared with the Simulacra page), placed by `src/sim.js` | Stands on the floor on Violet's side, faces the board, looks at you when either of you talks, looks at the square and reaches toward it when she moves; her mouth follows her voice |
| Voice | `../webxr/realtime-rtc.js`, session in `src/sim.js` | OpenAI's live voice call over WebRTC (`gpt-realtime`): real-time audio both ways |
| Play | `src/search.js` | Searches three moves deep. Always legal. Weighs each attack by how often *you* have been winning that kind of duel, remembered between games, so she adapts to you |
| Coaching | `src/search.js` (`assess`), `src/sim.js` | Each of your moves is compared with the best one; a missed win, an exposed monarch or a clearly weaker move is passed to her as a coaching note. She can look up a suggested move for you when asked |

The voice model does not choose moves. It is told what she played and why, and what was good or
bad about yours, and talks about it. That keeps play instant and legal while the talking stays live.

## Checked, and not

- `npm test`: the search takes wins, saves its monarch, changes its choices with the player's duel
  record, recognises missed wins and blunders, and beat the previous computer player 18 to 12 over
  30 games with duels as coin flips (about 4 ms a move).
- In a desktop browser: she appears at the table at the right size, looks down and reaches when she
  moves, greets, warns about an exposed monarch, and wins when it is left there (text mode).
- OpenAI accepted the live-voice session settings and the call request with a real key.
- **Not checked: the live audio itself** (the machine this was written on cannot carry it), and
  anything in a headset: her position at a real table, the duel hand-off, the microphone in AR.
