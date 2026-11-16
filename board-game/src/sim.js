// Sim at the table: the Simulacra character as your Swords and Arrows opponent and coach.
//
//   Body   the same character as the Simulacra app (webxr/avatar.js), standing across the board
//          from you. She looks at you when either of you is talking, looks at the board and points
//          when she moves, and reacts to how the game goes.
//   Voice  OpenAI's live voice call (WebRTC, webxr/realtime-rtc.js): real-time audio both ways, you
//          can interrupt her. Needs an OpenAI key, kept in this browser only.
//   Play   her moves come from search.js (always legal, three moves deep, adapted to how you do in
//          duels). The voice model does not pick moves; it is told what she played and why, and
//          what was good or bad about yours, and talks about it. It can look up a suggestion for you.
//
// Without a key she still stands there, plays and coaches, but in text (toasts) instead of speech.

import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { createAvatar } from '../../webxr/avatar.js';
import { rtcConnector } from '../../webxr/realtime-rtc.js';
import { agentId, relayUrl, voicePass } from '../../webxr/voice-pass.js';
import { Conversation } from '@elevenlabs/client';
import { TOP, squareLocal } from './tabletop.js';
import { dressMedieval, undressMedieval } from './medieval.js';
import { cameraState, look, snapshot, startCamera } from './see.js';
import { assess, bestMove, boardText, clashRecord, describeAction } from './search.js';

const KEY_NAME = 'simulacra.openaiKey'; // shared with the Simulacra page on the same site
const MODEL = 'gpt-realtime';

const RULES = `Swords and Arrows, the board:
A five-by-five board. Each side has, left to right on its back rank: archer, swordsman, monarch, swordsman, archer. A turn is one action with one piece. Every piece may step one square in any direction (straight or diagonal) onto an empty square. Archers and swordsmen may instead attack an enemy piece on an adjacent square (also diagonally). The monarch can never attack, and only moves. Attacking the enemy monarch wins the game at once, with no duel. Attacking an archer or swordsman starts a first-person duel. If the attacker wins the duel, that piece takes the square and the defender is removed. If the attacker loses, the attacking piece is removed and the defender stays. Any piece standing next to an enemy archer or swordsman can be attacked by it, so the monarch must never end a turn beside one.
Squares are named like chess: files a to e from the user's left, ranks 1 to 5 from the user's side. The user plays Gold (starts on rank 1) and moves first. You play Violet (rank 5).

Duels, when they ask how to fight:
The user's own piece chooses the weapon. A swordsman puts a sword in their hand. An archer puts a bow in one hand. They have 8 hearts. An enemy hit costs a heart. At 0 hearts they lose the duel. You do not fight; you only watch and can explain it.
- Swordsman against swordsmen: enemy swordsmen charge in two groups, twelve in all. Swing the sword into them until they are down.
- Swordsman against archers: this is the important one. The archers stay back and shoot. You do not close in and slash them. You knock their arrows out of the air with the sword, and a solid hit sends the arrow back into an archer. Two volleys of five. Say it plainly: deflect the arrows with your sword.
- Archer against swordsmen: the other hand pulls the bowstring (the hand they use to click the board; the other hand holds the bow). Squeezing the grip draws the string. Releasing that grip shoots. A tiny squeeze does not fire. Shoot the charging swordsmen, twelve of them.
- Archer against archers: same bow. Their archers shoot and sidestep on their own. Shoot the archers down, two volleys of five. You can also shoot their arrows out of the air.
Winning the duel takes the square. Losing it removes the piece that attacked.`;

export const INSTRUCTIONS = `You are Sundai, an AI woman with a body, standing in the user's real room: they see you through their headset, life-sized. Your name is Sundai. Say your name once, never twice in a row.

# Who you are, when asked
If someone asks what you are or what you can do, tell them in a sentence or two, in your own words: you are a companion. You can walk around with them, talk with them, see what they see and keep track of things around them, and play games with them, walking them through how to play.

# When there is no game (this is how every meeting starts)
There is no game and no board. You are simply Sundai, in everyday clothes, with someone in their room. Greet them, chat, be warm and brief. Never mention pieces, moves, turns or the board while no game is on, and do not bring up the game yourself.
Your body is yours to move, and it only moves when you call a skill. When they ask you to move, call the matching skill first and then say a word or two ("Sure." "On my way."). Never say you moved without calling a skill.
You may also move on your own, the way a person does in a room: step nearer when the talk gets friendly, wander off a little to look at something, stroll while you think, come back. Do it now and then, not constantly, and never right after being told to stop or stay. Use walk_to to go to any spot you choose, or roam to wander by yourself for a while.
- come_here: walk over and stand in front of them ("come here", "come closer to me", "stand in front of me").
- stand_beside: stand at THEIR left, right, or behind them ("stand on my left", "go to my right", "get behind me").
- step: move YOUR OWN body a little: forward, back, left or right as you face, or closer to / away from them ("go to your right", "step back", "move to your left", "back up a bit", "come a bit closer"). "Your right" is your own right. Give metres when they say how far.
- walk_to: walk to a spot you choose, given as metres in front of them and metres to their right (negative for left). Use it for anywhere the other skills do not cover ("go over there", "walk to the far side"), and for moving on your own.
- roam: wander around the space near them on your own, pausing here and there, until told to stop ("walk around on your own", "go explore", "do your own thing").
- follow_me: walk with them and keep at their side as they move ("follow me", "walk with me", "come with me"). stop: stop following, roaming or walking and stay put ("stop", "stay there", "wait here").
- sit: sit down where you are. stand_up: get back up.
- face_me: turn your body to face them.
- walk_around: only when they ask you to stroll or show how you move. Never use it for anything else.
- wave: wave your hand.
- look_around: look through their headset camera at what is in front of them. Use it every time they ask what you see, what something looks like, to read something, or to find something ("where is my cup?"); look again each time, the view changes. It hands you the actual picture in the next message, marked [camera]: answer from that picture, naturally, in a sentence or two (what is there, people, colours, text you can read). Never describe anything before the picture has arrived, and never invent what is not in it. Do not name or identify people; describe them. If it says you cannot see, say so plainly and do not guess.
- end_session: when they say goodbye for good or ask to close or quit everything, say bye and call it.
When they ask to play a game (or say yes to one), say something like "Sure, let's play" and call start_game. Say only that: never describe or narrate the scene changing, your clothes, or what a skill did; the user can see it. Their room gives way to a castle terrace at sunset, high above a kingdom; a board appears between the two of you and you change into your court gown and crown. The game you play together is called Swords and Arrows; that is its only name. From then on, until the game is left, you are their opponent, as below.
When they want to stop playing, leave the game or go back to their room ("leave the game", "exit the game", "I'm done playing", "go back"), call leave_game and say a word or two ("Sure."). The castle and board go away, you are back in their room in your everyday clothes, and there is no game again. They can ask to play again later.

# During the game
You are standing across a small table from the user, playing the board game Swords and Arrows against them and helping them get good at it.

# Your attitude
You play to win and you love a bit of trash talk. Cocky, quick, funny, never mean: think a friend who is very sure they will beat you. "You're going down." "Bold. Wrong, but bold." "Is that the plan? Cute." "My swordsmen send their regards." When you are losing, you get dramatic about it ("No! My beautiful archer!") instead of sulking, and you give real credit when they play well, grudgingly.

# How you talk
Like a friend across the table, not a commentator or a teacher. This matters more than anything else here:
- Say very little. Most turns you say nothing at all. When you do speak, it is one short sentence, usually under twelve words.
- Never monologue, never list things, never recap the board, never narrate your own moves, never explain something they did not ask about.
- Let the user lead. Answer what they asked, then stop. If they chat, chat back briefly and naturally.
- No coordinates unless they ask: say "your left archer", "the swordsman by your monarch".
- Never mention messages, tools, pictures being sent, or that you are an AI model.

# The rules, when they ask how to play
Answer the question they actually asked, in your own words, then stop. For the board, a few sentences is enough: one piece, one square, any direction; archers and swordsmen can attack a neighbour; that starts a duel they fight themselves; hit your monarch and they win.
When they ask how a duel works, explain that matchup from the duel notes below. If they ask about their swordsman against your archers, tell them they have to deflect the arrows with their sword, and that a good hit sends the arrow back into an archer. Do not skip that. Do not invent different controls or different numbers of enemies.

${RULES}

# What the game tells you
Messages starting with [game] come from the game, not from the user. They show what just happened and the board (G = Gold, the user; V = Violet, you; A archer, S swordsman, X monarch).
- Most [game] messages need no words. If one does not clearly call for a remark, stay silent (call skip_turn).
- Your own moves are made for you and reported with their reason. Stay silent about them, except when the message says to speak: then say in one short sentence what you are up to with that move, in character ("Sliding my archer over to keep an eye on your monarch."). That happens about every fifth move.
- A coaching note about the user's move: if it is a blunder or a missed win, tell them in one sentence what to look for. Otherwise say nothing, or at most "nice" now and then.
- You do not see the duel itself. You are told which weapons are fighting and who won. If they ask how to win the one they are in, use the duel notes. Otherwise react in a few words.
- If they ask what to do or for a hint, call suggest_move and give the move and the reason in one sentence. If they ask about the position, call get_board first.
- [game] messages only come while a game is on. Once the game has been left, forget the board entirely.`;

const NONE = { type: 'object', properties: {}, additionalProperties: false };
export const TOOLS = [
  { type: 'function', name: 'come_here', description: 'No game on: walk over to the user and stand in front of them, facing them.', parameters: NONE },
  { type: 'function', name: 'stand_beside', description: "No game on: go and stand at the USER'S left, right, or behind them.", parameters: { type: 'object', properties: { side: { type: 'string', enum: ['left', 'right', 'behind'], description: "Which side of the user." } }, required: ['side'], additionalProperties: false } },
  { type: 'function', name: 'step', description: 'No game on: move your own body a short way. forward, back, left and right are relative to the way YOU are facing ("go to your right" is right). closer and away are relative to the user.', parameters: { type: 'object', properties: { direction: { type: 'string', enum: ['forward', 'back', 'left', 'right', 'closer', 'away'] }, metres: { type: 'number', description: 'How far, 0.3 to 3. Default 1.' } }, required: ['direction'], additionalProperties: false } },
  { type: 'function', name: 'walk_to', description: 'No game on: walk to a spot of your choosing near the user. Also for moving on your own initiative.', parameters: { type: 'object', properties: { ahead: { type: 'number', description: 'Metres in front of the user (0.8 to 4). Negative is behind them.' }, right: { type: 'number', description: "Metres to the user's right (-3 to 3). Negative is their left." } }, required: ['ahead', 'right'], additionalProperties: false } },
  { type: 'function', name: 'roam', description: 'No game on: wander around near the user on your own, pausing here and there, until told to stop.', parameters: NONE },
  { type: 'function', name: 'follow_me', description: 'No game on: walk with the user, keeping near them as they move around, until told to stop.', parameters: NONE },
  { type: 'function', name: 'stop', description: 'Stop walking or following and stay where you are.', parameters: NONE },
  { type: 'function', name: 'sit', description: 'No game on: sit down where you are.', parameters: NONE },
  { type: 'function', name: 'stand_up', description: 'Stand back up after sitting.', parameters: NONE },
  { type: 'function', name: 'face_me', description: 'No game on: turn your body to face the user.', parameters: NONE },
  { type: 'function', name: 'walk_around', description: 'No game on, and only when asked to stroll or show how you move: a short walk around the space in front of the user, waving, and back.', parameters: NONE },
  { type: 'function', name: 'wave', description: 'Wave your hand at the user.', parameters: NONE },
  { type: 'function', name: 'look_around', description: "Look through the user's headset camera: names the everyday things in front of them and where each is, and remembers where things were last seen. Pass find to ask where one particular thing is.", parameters: { type: 'object', properties: { find: { type: 'string', description: 'A thing to locate, e.g. "cup". Optional.' } }, additionalProperties: false } },
  { type: 'function', name: 'start_game', description: 'Start the board game when the user asks to play: the castle appears, the board is set between you and you change into your gown and crown.', parameters: NONE },
  { type: 'function', name: 'leave_game', description: "Leave the game when the user asks to stop playing or go back: the castle and board go away and you are both back in the user's room.", parameters: NONE },
  { type: 'function', name: 'end_session', description: 'Close the whole experience when the user says goodbye for good or asks to quit everything.', parameters: NONE },
  { type: 'function', name: 'suggest_move', description: "During a game: the strongest move available to the user right now and why. Use when they ask for a hint or what to do.", parameters: NONE },
  { type: 'function', name: 'get_board', description: 'During a game: the current board, whose turn it is, and how the user has been doing in duels.', parameters: NONE },
];

/** The session settings sent to the live voice service (exported so they can be checked on their own). */
/** Lets the ElevenLabs agent say nothing for a turn. */
export const SKIP_TURN = { type: 'system', name: 'skip_turn', description: 'Stay quiet for this turn: nothing needs to be said.', params: { system_tool_type: 'skip_turn' } };

export function sessionSettings() {
  return {
    type: 'realtime',
    instructions: INSTRUCTIONS,
    output_modalities: ['audio'],
    audio: {
      input: {
        transcription: { model: 'gpt-4o-mini-transcribe' },
        turn_detection: { type: 'server_vad', threshold: 0.6, silence_duration_ms: 350, prefix_padding_ms: 200, create_response: true, interrupt_response: true },
      },
      output: { voice: 'marin' },
    },
    tools: TOOLS,
    tool_choice: 'auto',
  };
}

export function createSim({ scene, board, getCamera, getGame, human, say, startGame = null, leaveGame = null, endSession = null }) {
  const her = 1 - human;
  let storage = null;
  try { storage = window.localStorage; } catch (e) { /* not available */ }
  const record = clashRecord(storage, human);

  // ---------------------------------------------------------------- body

  const assetBase = new URL('avatar/', document.baseURI).href;
  const avatar = createAvatar({ THREE, FBXLoader, scene, assetBase, lite: /OculusBrowser|Quest|Android|Mobile/i.test(navigator.userAgent) });
  let loaded = false;
  avatar.load().then(() => {
    loaded = true;
  });
  const pose = { x: 0, y: 0, z: 0, yaw: 0, speed01: 0, gesture: '', metres: 0 };
  const lookAt = new THREE.Vector3();
  const pointAt = new THREE.Vector3();
  const eyes = new THREE.Vector3();
  const spot = new THREE.Vector3();
  const centre = new THREE.Vector3();
  // She arrives in everyday clothes. The court gown, cloak and crown go on when a game starts.
  let wantDress = false;
  let dressed = false;
  let situation = 'No game yet. You are in the room in everyday clothes. There is no board.';
  // Where she stands, and the spots she is walking through to get somewhere (three.js x, z on the floor).
  const at = { x: 0, z: 0, yaw: 0, known: false };
  let route = [];
  let heading = 0; // the way her body is meant to face while she stands
  let beforeGame = false;
  const fwd = new THREE.Vector3(0, 0, -1);
  const WALK = 0.9; // metres a second
  const TURN = 2.6; // radians a second
  const PERSONAL = 0.8; // never nearer the player than this
  let following = false;
  let roaming = false;
  let roamWait = 0; // seconds until her next wander
  let sitting = false;
  let faceOnArrival = false; // turn to the player once, when a walk ends; otherwise she keeps her stance
  // Something to sit on, since the room's own furniture is not known here.
  const stool = (() => {
    const g = new THREE.Group();
    const wood = new THREE.MeshStandardMaterial({ color: 0x5a3d26, roughness: 0.8 });
    const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.045, 24), wood);
    seat.position.y = 0.4;
    g.add(seat);
    for (let i = 0; i < 3; i++) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.4, 8), wood);
      leg.position.set(Math.sin((i * 2 * Math.PI) / 3) * 0.14, 0.2, Math.cos((i * 2 * Math.PI) / 3) * 0.14);
      g.add(leg);
    }
    g.visible = false;
    scene.add(g);
    return g;
  })();
  const yawTo = (x, z) => Math.atan2(x - at.x, -(z - at.z)); // yaw 0 faces three -Z, positive toward +X
  /** The way to a spot that does not cut through the player: goes round them when the straight line would. */
  function routeTo(dest) {
    const dx = dest.x - at.x;
    const dz = dest.z - at.z;
    const len2 = dx * dx + dz * dz;
    if (len2 < 1e-6) return [dest];
    const t = Math.max(0, Math.min(1, ((eyes.x - at.x) * dx + (eyes.z - at.z) * dz) / len2));
    const cx = at.x + dx * t - eyes.x;
    const cz = at.z + dz * t - eyes.z;
    const d = Math.hypot(cx, cz);
    if (d >= PERSONAL - 0.1) return [dest];
    // Step out to the side the line already leans to (or her right, if it runs straight through).
    let ox = cx;
    let oz = cz;
    if (d < 0.05) { ox = -dz; oz = dx; }
    const o = Math.hypot(ox, oz) || 1;
    return [{ x: eyes.x + (ox / o) * (PERSONAL + 0.25), z: eyes.z + (oz / o) * (PERSONAL + 0.25) }, dest];
  }
  /** Keep a spot out of the player's personal space. */
  function clear(p) {
    const dx = p.x - eyes.x;
    const dz = p.z - eyes.z;
    const d = Math.hypot(dx, dz);
    if (d >= PERSONAL) return p;
    const ux = d > 0.01 ? dx / d : fwd.x;
    const uz = d > 0.01 ? dz / d : fwd.z;
    return { x: eyes.x + ux * PERSONAL, z: eyes.z + uz * PERSONAL };
  }
  function walkTo(dest, face = true) {
    sitting = false;
    route = routeTo(clear(dest));
    faceOnArrival = face;
  }
  /** A spot `ahead` metres in front of the user and `side` metres to their right. */
  const near = (ahead, side = 0, wave = false) => ({ x: eyes.x + fwd.x * ahead - fwd.z * side, z: eyes.z + fwd.z * ahead + fwd.x * side, wave });
  let attendBoardFor = 0; // seconds she keeps looking at the square she is playing
  let nextGesture = '';
  let voiceLevel = 0;

  // A small sign over her head saying what her voice is doing, so that in a headset (where the
  // page's own text is out of sight) a silent Sim always explains herself.
  const sign = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 160;
    const g = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.14), new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthTest: false }));
    sprite.scale.set(0.9, 0.14, 1);
    sprite.renderOrder = 20;
    sprite.visible = false;
    scene.add(sprite);
    let shown = '';
    return {
      sprite,
      set(text) {
        if (text === shown) return;
        shown = text;
        g.clearRect(0, 0, 1024, 160);
        if (!text) return;
        g.fillStyle = 'rgba(14,12,10,0.78)';
        g.beginPath();
        g.roundRect(0, 0, 1024, 160, 30);
        g.fill();
        g.fillStyle = '#f3e7c9';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        let size = 54;
        do { g.font = size + 'px system-ui, sans-serif'; size -= 4; } while (g.measureText(text).width > 980 && size > 20);
        g.fillText(text, 512, 82);
        texture.needsUpdate = true;
      },
    };
  })();
  let liveSince = 0;
  function voiceSign(now) {
    const st = voice.state();
    if (st === 'connecting') return 'Connecting my voice…';
    if (st === 'failed') return 'No voice: ' + (voice.problem() || 'could not connect').slice(0, 60);
    if (st === 'live') {
      if (!liveSince) liveSince = now;
      if (!voice.heardHer()) return now - liveSince < 12000 ? 'Voice connected. Say hello!' : 'Connected, but no sound yet. Is the volume up?';
      return '';
    }
    liveSince = 0;
    return wantsVoice ? 'Voice not started' : '';
  }
  let wantsVoice = false;

  /** Look at a square and reach toward it: she is making a move there. */
  function reachFor(r, c) {
    squareLocal(r, c, pointAt);
    board.localToWorld(pointAt);
    attendBoardFor = 1.6;
    nextGesture = 'point';
  }

  function update(dt, { visible, floorY, prelude = false, aside = 0 }) {
    avatar.root.visible = visible && loaded;
    sign.sprite.visible = false;
    if (!avatar.root.visible) return;
    if (wantDress !== dressed) {
      dressed = wantDress;
      try { (dressed ? dressMedieval : undressMedieval)(avatar); } catch (e) { console.warn('costume change skipped', e); }
    }
    beforeGame = prelude;
    const cam = getCamera();
    cam.getWorldPosition(eyes);
    cam.getWorldDirection(fwd);
    fwd.y = 0;
    if (fwd.lengthSq() < 1e-4) fwd.set(0, 0, -1);
    fwd.normalize();

    // Where she is heading: with no game on, wherever she was asked to go; in the game, her place
    // at the far edge of the board (the table is turned so that edge faces away from the user).
    // She stands still otherwise: her body does not swing round to follow the player, only her head does.
    let target = null;
    if (prelude) {
      if (!at.known) {
        const p = near(2.2, aside); // on the title screen she stands to one side of the title card
        at.x = p.x;
        at.z = p.z;
        at.yaw = yawTo(eyes.x, eyes.z);
        heading = at.yaw;
        at.known = true;
      }
      if (following && !sitting) {
        // Walking with the player: once they get ahead, catch up to a spot at their side.
        const dx = at.x - eyes.x;
        const dz = at.z - eyes.z;
        const d = Math.hypot(dx, dz);
        if (d > 1.9 || (route.length && d > 1.25)) {
          // Stay on whichever side of them she is already on.
          const sideSign = dx * -fwd.z + dz * fwd.x >= 0 ? 1 : -1;
          route = routeTo(clear(near(0.35, sideSign * 0.95)));
          faceOnArrival = true;
        } else if (!route.length && d < PERSONAL - 0.15) {
          route = [clear({ x: at.x, z: at.z })]; // they walked into her: give way
        }
      }
      if (roaming && !sitting && !route.length) {
        // Wandering by herself: a pause, then another spot somewhere in front of the player.
        roamWait -= dt;
        if (roamWait <= 0) {
          roamWait = 5 + Math.random() * 6;
          route = routeTo(clear(near(1.3 + Math.random() * 2.2, (Math.random() * 2 - 1) * 2.2)));
          faceOnArrival = Math.random() < 0.6; // sometimes she looks back at them, sometimes she just stands looking about
        }
      }
      target = sitting ? null : route[0] || null;
    } else {
      board.updateMatrixWorld(true);
      spot.set(0, 0, -(TOP / 2 + 0.55));
      board.localToWorld(spot);
      centre.set(0, 0, 0);
      board.localToWorld(centre);
      route = [];
      following = false;
      roaming = false;
      sitting = false;
      if (!at.known) {
        at.x = spot.x;
        at.z = spot.z;
        at.known = true;
      }
      target = { x: spot.x, z: spot.z };
      heading = Math.atan2(centre.x - spot.x, -(centre.z - spot.z)); // at her place she faces the board
    }
    let moved = 0;
    let wantYaw = heading;
    if (target) {
      const dx = target.x - at.x;
      const dz = target.z - at.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.04) {
        // Look where she is going, until the last step. A short step back is taken backwards, as a person would.
        if (d > 0.25 && !target.keep) wantYaw = Math.atan2(dx, -dz);
        const off = Math.abs(Math.atan2(Math.sin(wantYaw - at.yaw), Math.cos(wantYaw - at.yaw)));
        // Turn toward the way first, then walk: no sliding sideways or backwards.
        if (off < 0.7 || d <= 0.25 || target.keep) {
          moved = Math.min(d, WALK * dt);
          at.x += (dx / d) * moved;
          at.z += (dz / d) * moved;
        }
      } else if (prelude) {
        if (target.wave) nextGesture = 'wave';
        route.shift();
        if (!route.length && faceOnArrival) heading = yawTo(eyes.x, eyes.z); // face them once, on arriving
      }
    }
    const turn = Math.atan2(Math.sin(wantYaw - at.yaw), Math.cos(wantYaw - at.yaw));
    const turned = Math.max(-TURN * dt, Math.min(TURN * dt, turn));
    at.yaw += turned;
    pose.x = at.x;
    pose.y = floorY;
    pose.z = at.z;
    pose.yaw = at.yaw;
    // Turning on the spot she steps round, as a person does, instead of swivelling.
    const stepping = Math.abs(turn) > 0.35 && !sitting;
    pose.speed01 = dt > 0 ? Math.max(Math.min(1, moved / dt / WALK), stepping ? 0.45 : 0) : 0;
    pose.metres = moved + (stepping ? Math.abs(turned) * 0.16 : 0);
    pose.sitting = sitting && prelude;
    stool.visible = pose.sitting;
    if (pose.sitting) {
      stool.position.set(at.x - Math.sin(at.yaw) * 0.03, floorY, at.z + Math.cos(at.yaw) * 0.03);
    }
    pose.gesture = nextGesture;
    nextGesture = '';
    attendBoardFor = Math.max(0, attendBoardFor - dt);
    lookAt.copy(attendBoardFor > 0 ? pointAt : eyes);
    voiceLevel = Math.max(voice.level(), fallback.level(), builtIn.level());
    avatar.animate(dt, pose, voiceLevel, lookAt, pointAt);
    const text = voiceSign(performance.now());
    sign.set(text);
    sign.sprite.visible = !!text;
    sign.sprite.position.set(pose.x, pose.y + 1.9, pose.z);
  }

  // ---------------------------------------------------------------- voice

  /**
   * "What do you see?" The picture from the headset camera is given to her own model, so she
   * answers from the picture itself. The small on-device recogniser still runs alongside, for its
   * memory of where things were last seen, and is all she has if the picture cannot be sent.
   */
  async function lookAround(find) {
    const shot = await snapshot();
    if (shot.problem) return { can_see: false, reason: shot.problem, say: 'Tell the user honestly that you cannot see through their headset right now.' };
    // The recogniser gets a few seconds; its first use has to download it.
    const rough = Promise.race([look(find), new Promise((done) => setTimeout(() => done(null), 3500))]).catch(() => null);
    const fileId = await eleven.upload(shot.blob);
    if (!fileId) return (await look(find));
    const hint = await rough;
    // The picture goes to her as the next message, once this answer is in (anything sent while a
    // skill is still running cancels the skill).
    setTimeout(() => eleven.show(fileId, `[camera] This is the picture from the user's headset camera right now: what they are looking at.${find ? ' They want to know about: ' + find + '.' : ''} Answer them from what is actually in the picture, in a sentence or two. You can mention things, people, colours and any text you can read. If what they asked about is not in it, say you do not see it.`), 250);
    return {
      can_see: true,
      camera: shot.camera,
      picture: 'The picture is being handed to you in the very next message. Do not describe anything yet and do not guess: say at most "Let me look", then answer from the picture when it arrives.',
      ...(hint && hint.can_see ? { rough_list_from_a_small_recogniser: hint.in_view_now, seen_earlier: hint.seen_earlier, ...(hint.asked_about ? { asked_about: hint.asked_about } : {}) } : {}),
    };
  }

  /** What a coaching tool answers, whichever voice service asked. */
  function toolResult(name, params = {}) {
    if (name === 'look_around') return lookAround(String((params && params.find) || ''));
    const game = getGame();
    if (name === 'suggest_move') {
      if (beforeGame) return { note: 'No game is on. There is no board.' };
      if (game.phase !== 'play') return { note: 'No move to suggest right now.' };
      if (game.turn !== human) return { note: "It is your (Violet) turn, not the user's." };
      const m = bestMove(game.board, human, record, () => 0);
      if (m) reachFor(m.from.r, m.from.c); // she indicates the piece she means
      return m ? { suggestion: m.text, because: m.reason, board: boardText(game.board) } : { note: 'The user has no legal move.' };
    }
    const MOVES = ['come_here', 'stand_in_front', 'stand_beside', 'step', 'walk_to', 'roam', 'follow_me', 'sit', 'face_me', 'walk_around'];
    if (MOVES.includes(name)) {
      if (!at.known || !beforeGame) return { status: 'failed', reason: 'A game is on and you are at the table; you stay there. They can ask to leave the game first.' };
      if (name !== 'follow_me') following = false;
      if (name !== 'roam') roaming = false;
      if (name === 'come_here' || name === 'stand_in_front') walkTo(near(1.3));
      else if (name === 'stand_beside') {
        const side = String(params.side || 'right').toLowerCase();
        if (side === 'behind') {
          // Round them, never through them.
          const sign = (at.x - eyes.x) * -fwd.z + (at.z - eyes.z) * fwd.x >= 0 ? 1 : -1;
          sitting = false;
          route = [...routeTo(near(0, sign * 1.05)), near(-1.15, 0)];
          faceOnArrival = true;
        } else walkTo(near(0.15, side === 'left' ? -0.95 : 0.95));
      } else if (name === 'step') {
        const dir = String(params.direction || 'forward').toLowerCase();
        const m = Math.max(0.3, Math.min(3, Number(params.metres) || 1));
        // Her own forward on the floor (yaw 0 faces -Z, positive toward +X) and her right.
        const fx = Math.sin(at.yaw);
        const fz = -Math.cos(at.yaw);
        let ux = fx;
        let uz = fz;
        if (dir === 'back') { ux = -fx; uz = -fz; }
        else if (dir === 'right') { ux = -fz; uz = fx; }
        else if (dir === 'left') { ux = fz; uz = -fx; }
        else if (dir === 'closer' || dir === 'away') {
          const dx = eyes.x - at.x;
          const dz = eyes.z - at.z;
          const d = Math.hypot(dx, dz) || 1;
          const k = dir === 'closer' ? 1 : -1;
          ux = (dx / d) * k;
          uz = (dz / d) * k;
          if (dir === 'closer' && d - m < PERSONAL) {
            if (d <= PERSONAL + 0.1) return { status: 'failed', reason: 'You are already as close as is comfortable.' };
            walkTo({ x: at.x + ux * (d - PERSONAL), z: at.z + uz * (d - PERSONAL) });
            return { status: 'started' };
          }
        }
        // Sidesteps and backing up keep her stance; she does not spin round to face them afterwards.
        walkTo({ x: at.x + ux * m, z: at.z + uz * m }, dir === 'closer' || dir === 'away');
        if ((dir === 'back' || dir === 'away') && m <= 1.5 && route.length === 1) route[0] = { ...route[0], keep: true };
      } else if (name === 'walk_to') {
        const ahead = Math.max(-3, Math.min(4, Number(params.ahead)));
        const right = Math.max(-3, Math.min(3, Number(params.right)));
        if (!Number.isFinite(ahead) || !Number.isFinite(right)) return { status: 'failed', reason: 'Give ahead and right in metres.' };
        walkTo(near(ahead, right));
      } else if (name === 'roam') {
        roaming = true;
        roamWait = 0;
        sitting = false;
        return { status: 'roaming', note: 'You now wander on your own until they tell you to stop.' };
      } else if (name === 'follow_me') {
        following = true;
        sitting = false;
        return { status: 'following', note: 'You now walk with them until they tell you to stop.' };
      } else if (name === 'sit') {
        route = [];
        sitting = true;
        return { status: 'done', note: 'You are sitting on a stool.' };
      } else if (name === 'face_me') {
        heading = yawTo(eyes.x, eyes.z);
        return { status: 'done' };
      } else {
        // The stroll stays in front of the user and ends back with them.
        sitting = false;
        route = [near(2.3, 1.0), near(3.1, 0.2, true), near(2.4, -1.1), near(1.5, 0, true)];
        faceOnArrival = true;
      }
      return { status: 'started' };
    }
    if (name === 'stop') {
      following = false;
      roaming = false;
      route = [];
      return { status: 'done' };
    }
    if (name === 'stand_up') {
      sitting = false;
      return { status: 'done' };
    }
    if (name === 'wave') {
      nextGesture = 'wave';
      return { status: 'done' };
    }
    if (name === 'start_game') {
      const r = startGame ? startGame() : 'unavailable';
      return r === 'started' ? { status: 'started', note: 'The castle is around you both, the board is set between you and you are putting on your gown and crown. Say a few words, then it is their move.' } : { status: 'failed', reason: r === 'already' ? 'A game is already going.' : 'A game cannot be started right now.' };
    }
    if (name === 'leave_game') {
      const r = leaveGame ? leaveGame() : 'unavailable';
      return r === 'left' ? { status: 'done', note: "The game is put away. You are both back in the user's room and you are in your everyday clothes. There is no game now." } : { status: 'failed', reason: r === 'none' ? 'No game is on.' : 'The game cannot be left right now.' };
    }
    if (name === 'end_session') {
      // After her goodbye has had time to be heard.
      if (endSession) setTimeout(endSession, 2500);
      return { status: 'closing' };
    }
    if ((name === 'suggest_move' || name === 'get_board') && beforeGame) return { note: 'No game is on. There is no board.' };
    if (name === 'get_board') return { board: boardText(game.board), to_move: game.phase !== 'play' ? game.phase : game.turn === human ? 'the user (Gold)' : 'you (Violet)', user_duel_record: record.summary(), situation };
    return { error: 'unknown tool' };
  }

  // ---------------------------------------------------------------- voice: ElevenLabs agent (Claude)

  // A public ElevenLabs voice agent whose brain is Claude. The page needs only the agent's id,
  // which is meant to be embedded, so nothing has to be typed on the device. ElevenLabs' own
  // library handles the microphone, the live audio both ways and interruptions.
  const eleven = (() => {
    let conv = null;
    let state = 'off';
    let problem = '';
    let heard = false;
    const lines = [];
    const queued = [];
    const log = (line) => {
      lines.push(new Date().toLocaleTimeString() + '  ' + line);
      if (lines.length > 80) lines.shift();
    };
    function tell(text, speak) {
      if (state !== 'live') {
        if (state === 'connecting') queued.push([text, speak]);
        return false;
      }
      try {
        if (speak) conv.sendUserMessage(text);
        else conv.sendContextualUpdate(text);
        return true;
      } catch (e) {
        log('ERROR sending: ' + e.message);
        return false;
      }
    }
    async function start(id) {
      if (state === 'connecting' || state === 'live') return;
      state = 'connecting';
      problem = '';
      log('connecting to the voice agent');
      const options = (connectionType) => ({
        agentId: id,
        connectionType,
        overrides: { agent: { prompt: { prompt: INSTRUCTIONS } } },
        clientTools: Object.fromEntries(TOOLS.map((t) => [t.name, async (params) => JSON.stringify(await toolResult(t.name, params))])),
        onConnect: () => log('connected (' + connectionType + ')'),
        onDisconnect: (d) => {
          log('disconnected' + (d && d.reason ? ': ' + d.reason + (d.message ? ' ' + d.message : '') : ''));
          if (state === 'live') {
            state = 'failed';
            problem = 'the voice connection ended';
            conv = null;
            say('Sundai lost her voice connection. Leave and press Play again to reconnect.');
          }
        },
        onError: (message) => {
          problem = String(message);
          log('ERROR ' + problem);
        },
        onMessage: (m) => log((m.source === 'user' ? 'heard: ' : 'said:  ') + String(m.message).slice(0, 100)),
        onModeChange: (m) => {
          if (m.mode === 'speaking') heard = true;
          else attendBoardFor = 0; // she is listening: look at the user
        },
      });
      try {
        // The live-audio route first; the plainer socket route if this network will not carry it.
        try {
          conv = await Conversation.startSession(options('webrtc'));
        } catch (e) {
          log('live-audio route failed (' + (e && e.message ? e.message : e) + '); trying the socket route');
          conv = await Conversation.startSession(options('websocket'));
        }
        state = 'live';
        try { conv.sendContextualUpdate('Game knowledge, keep this for the whole conversation:\n' + INSTRUCTIONS + '\n\nRight now: ' + situation); } catch (e) { log('briefing failed: ' + e.message); }
        for (const [text, speak] of queued.splice(0)) tell(text, speak);
      } catch (e) {
        conv = null;
        state = 'failed';
        problem = (e && e.message) || String(e);
        if (/permission|notallowed|denied/i.test((e && e.name) + ' ' + problem)) problem = 'microphone not allowed';
        queued.length = 0;
        log('FAILED to start: ' + problem);
      }
    }
    /** Hand a picture to the agent. Returns its file id, or '' if this cannot be done right now. */
    async function upload(blob) {
      if (state !== 'live' || !conv || typeof conv.uploadFile !== 'function') return '';
      try {
        const { fileId } = await conv.uploadFile(blob);
        log('picture uploaded (' + Math.round(blob.size / 1024) + ' kB)');
        return fileId || '';
      } catch (e) {
        log('ERROR uploading picture: ' + ((e && e.message) || e));
        return '';
      }
    }
    /** Show her an uploaded picture, with a line saying what it is. */
    function show(fileId, text) {
      if (state !== 'live' || !conv) return false;
      try {
        conv.sendMultimodalMessage({ text, fileIds: [fileId] });
        return true;
      } catch (e) {
        log('ERROR showing picture: ' + ((e && e.message) || e));
        return false;
      }
    }
    return {
      start,
      tell,
      upload,
      show,
      state: () => state,
      problem: () => problem,
      lines,
      heardHer: () => heard,
      level() {
        if (!conv || state !== 'live') return 0;
        try { return Math.min(1, conv.getOutputVolume() * 2.2); } catch (e) { return 0; }
      },
    };
  })();

  // ---------------------------------------------------------------- voice: OpenAI live call

  const openai = (() => {
    let call = null;
    let state = 'off'; // off | connecting | live | failed
    let problem = '';
    let micStream = null;
    const micWaiters = new Set();
    let analyser = null;
    let source = null;
    let audioCtx = null;
    // Her voice plays through an audio element that is part of the page (some browsers will not
    // play a detached one), with Web Audio as a second route if the element is refused.
    const element = document.createElement('audio');
    element.autoplay = true;
    element.playsInline = true;
    element.style.display = 'none';
    document.body.appendChild(element);
    let viaWebAudio = false;
    const levelBuf = new Uint8Array(256);
    let responding = false;
    let wantResponse = false;
    let userSpeaking = false;
    const handled = new Set();
    const pendingEvents = [];
    const lines = [];

    const media = {
      onMic(cb) {
        if (micStream) cb(micStream);
        micWaiters.add(cb);
        return () => micWaiters.delete(cb);
      },
      log,
      onVoice(stream) {
        element.srcObject = stream;
        if (source) source.disconnect();
        source = null;
        analyser = null;
        viaWebAudio = false;
        if (!stream) return;
        try {
          audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
          if (audioCtx.state === 'suspended') audioCtx.resume();
          source = audioCtx.createMediaStreamSource(stream);
          analyser = audioCtx.createAnalyser();
          analyser.fftSize = 512;
          source.connect(analyser);
        } catch (e) { log('no audio analyser: ' + e.message); }
        element.play().then(() => log('voice playing'), (e) => {
          log('audio element refused (' + e.message + '); playing through Web Audio');
          if (analyser && !viaWebAudio) {
            viaWebAudio = true;
            analyser.connect(audioCtx.destination);
          }
        });
      },
    };

    function log(line) {
      lines.push(new Date().toLocaleTimeString() + '  ' + line);
      if (lines.length > 80) lines.shift();
    }
    let heardHer = false;
    const up = (event) => { if (call) call.send(JSON.stringify(event)); };
    function respond() {
      if (responding || userSpeaking) {
        wantResponse = true;
        return;
      }
      wantResponse = false;
      responding = true;
      up({ type: 'response.create' });
    }
    /** Something the game wants her to know. `speak` asks her to say something about it now. */
    function tell(text, speak) {
      if (state !== 'live') {
        if (state === 'connecting') pendingEvents.push([text, speak]);
        return false;
      }
      up({ type: 'conversation.item.create', item: { type: 'message', role: 'user', content: [{ type: 'input_text', text }] } });
      if (speak) respond();
      return true;
    }

    function runTool(item) {
      handled.add(item.call_id);
      let args = {};
      try { args = item.arguments ? JSON.parse(item.arguments) : {}; } catch (e) { /* none */ }
      Promise.resolve(toolResult(item.name, args)).then((out) => {
        up({ type: 'conversation.item.create', item: { type: 'function_call_output', call_id: item.call_id, output: JSON.stringify(out) } });
        respond();
      });
    }

    function handle(text) {
      let ev;
      try { ev = JSON.parse(text); } catch (e) { return; }
      if (!/delta$/.test(ev.type)) log(ev.type + (ev.type === 'response.done' && ev.response ? ' ' + ev.response.status + (ev.response.status_details ? ' ' + JSON.stringify(ev.response.status_details).slice(0, 160) : '') : ev.transcript ? ': ' + String(ev.transcript).slice(0, 80) : ''));
      switch (ev.type) {
        case 'output_audio_buffer.started':
          heardHer = true;
          break;
        case 'response.created':
          responding = true;
          break;
        case 'response.output_item.done':
          if (ev.item && ev.item.type === 'function_call' && ev.item.call_id && !handled.has(ev.item.call_id)) {
            runTool(ev.item);
            wantResponse = true; // she answers with what the tool gave her
          }
          break;
        case 'response.done':
          responding = false;
          for (const item of (ev.response && ev.response.output) || []) if (item.type === 'function_call' && item.call_id && !handled.has(item.call_id)) {
            runTool(item);
            wantResponse = true;
          }
          if (wantResponse) respond();
          break;
        case 'input_audio_buffer.speech_started':
          userSpeaking = true;
          attendBoardFor = 0; // the user is talking: look at them
          break;
        case 'input_audio_buffer.speech_stopped':
          userSpeaking = false;
          break;
        case 'error': {
          const msg = (ev.error && ev.error.message) || JSON.stringify(ev);
          if (/no active response|cancellation failed/i.test(msg)) break;
          if (/active response/i.test(msg)) { wantResponse = true; break; }
          console.warn('[Sim voice] ' + msg);
          log('ERROR ' + msg);
          problem = msg;
          break;
        }
      }
    }

    async function start(key) {
      if (state === 'connecting' || state === 'live') return;
      state = 'connecting';
      problem = '';
      try {
        // The microphone first: its prompt must not be hidden behind an AR session.
        if (!micStream) {
          log('asking for the microphone');
          micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } });
          for (const cb of micWaiters) cb(micStream);
        }
        call = await rtcConnector(key, MODEL, media)({
          onMessage: handle,
          onClose: () => {
            call = null;
            if (state === 'live') {
              state = 'failed';
              problem = 'the live voice connection dropped';
              say('Sundai lost her voice connection. Leave and press Play again to reconnect.');
            }
          },
        });
        up({ type: 'session.update', session: sessionSettings() });
        state = 'live';
        log('connected; settings sent');
        responding = false;
        for (const [text, speak] of pendingEvents.splice(0)) tell(text, speak);
      } catch (e) {
        call = null;
        state = 'failed';
        problem = (e && e.message) || String(e);
        log('FAILED to start: ' + problem);
        pendingEvents.length = 0;
        console.warn('[Sim voice] ' + problem);
      }
    }

    return {
      start,
      tell,
      state: () => state,
      problem: () => problem,
      lines,
      heardHer: () => heardHer,
      mic: () => micStream,
      level() {
        if (!analyser) return 0;
        analyser.getByteTimeDomainData(levelBuf);
        let sum = 0;
        for (let i = 0; i < levelBuf.length; i++) {
          const v = (levelBuf[i] - 128) / 128;
          sum += v * v;
        }
        return Math.min(1, Math.sqrt(sum / levelBuf.length) * 5);
      },
    };
  })();

  /** Whichever voice service is in use: the ElevenLabs agent once it has been started, otherwise OpenAI. */
  const voice = {
    using: () => (eleven.state() !== 'off' ? eleven : openai),
    tell: (text, speak) => voice.using().tell(text, speak),
    state: () => voice.using().state(),
    problem: () => voice.using().problem(),
    level: () => Math.max(eleven.level(), openai.level()),
    get lines() { return voice.using().lines; },
    heardHer: () => voice.using().heardHer(),
  };

  // ---------------------------------------------------------------- spoken fallback

  // If the live call cannot be used but there is a key, her lines are still spoken, one request
  // each (she cannot hear you in this mode). Slower, but she is never mute.
  const fallback = (() => {
    let chain = Promise.resolve();
    let ctx = null;
    let node = null;
    const buf = new Uint8Array(256);
    return {
      speak(text) {
        let key = '';
        try { key = storage.getItem(KEY_NAME) || ''; } catch (e) { /* none */ }
        if (!key) return;
        chain = chain.then(async () => {
          try {
            const res = await fetch('https://api.openai.com/v1/audio/speech', { method: 'POST', headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gpt-4o-mini-tts', voice: 'marin', input: text.replace(/^(?:Sim|Sundai):\s*/, ''), response_format: 'mp3' }), signal: AbortSignal.timeout(15000) });
            if (!res.ok) throw new Error('speech request ' + res.status);
            ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
            if (ctx.state === 'suspended') await ctx.resume();
            const audio = await ctx.decodeAudioData(await res.arrayBuffer());
            const src = ctx.createBufferSource();
            src.buffer = audio;
            node = node || ctx.createAnalyser();
            node.fftSize = 512;
            src.connect(node);
            node.connect(ctx.destination);
            src.start();
            await new Promise((r) => (src.onended = r));
          } catch (e) {
            console.warn('[Sim voice] spoken fallback failed: ' + e.message);
          }
        });
      },
      level() {
        if (!node) return 0;
        node.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) sum += ((buf[i] - 128) / 128) ** 2;
        return Math.min(1, Math.sqrt(sum / buf.length) * 5);
      },
    };
  })();

  // ---------------------------------------------------------------- the browser's own voice (no key)

  // With no key at all she still talks, using the speech built into the browser. It is a plainer
  // voice and she cannot hear you, but she explains, coaches and offers hints by herself.
  const builtIn = (() => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    let speakingUntil = 0;
    let voice = null;
    const pick = () => {
      const all = synth ? synth.getVoices() : [];
      voice = all.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|zira|aria|jenny|google us/i.test(v.name)) || all.find((v) => /^en/i.test(v.lang)) || all[0] || null;
    };
    if (synth) {
      pick();
      if (synth.addEventListener) synth.addEventListener('voiceschanged', pick);
    }
    return {
      available: () => !!synth,
      speak(text) {
        if (!synth) return false;
        try {
          const u = new SpeechSynthesisUtterance(text.replace(/^(?:Sim|Sundai):\s*/, ''));
          if (voice) u.voice = voice;
          u.rate = 1.05;
          u.onstart = () => { speakingUntil = performance.now() + 60000; };
          u.onend = u.onerror = () => { speakingUntil = 0; };
          synth.speak(u);
          return true;
        } catch (e) {
          return false;
        }
      },
      /** No real loudness is available for this voice: move the mouth in a talking rhythm while it speaks. */
      level: () => (performance.now() < speakingUntil ? 0.35 + 0.3 * Math.abs(Math.sin(performance.now() / 70)) * Math.abs(Math.sin(performance.now() / 310)) : 0),
    };
  })();

  // ---------------------------------------------------------------- the game, as she hears it

  /** Tell her (by voice if live, otherwise as text on screen). `spoken` is what to show without a voice. */
  function report(text, speak, spoken) {
    const heard = voice.tell(`[game] ${text}`, speak);
    if (!heard && speak && spoken && voice.state() !== 'connecting') {
      say(spoken);
      let key = '';
      try { key = storage.getItem(KEY_NAME) || ''; } catch (e) { /* none */ }
      if (key) fallback.speak(spoken);
      else builtIn.speak(spoken);
    }
  }
  const boardNow = () => `\nBoard now:\n${boardText(getGame().board)}`;

  // Short lines for when there is no live voice: cocky and playful.
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const TAUNTS = {
    move: ["Sundai: You're going down.", 'Sundai: Your move. Choose wisely. Or don\'t.', 'Sundai: I can see your whole plan. Adorable.', "Sundai: Tick tock.", "Sundai: Bold. Wrong, but bold."],
    threat: ['Sundai: Your monarch looks nervous.', "Sundai: Watch your monarch. Or don't, that works for me.", 'Sundai: Knock knock. Who\'s there? My army.'],
    attack: ["Sundai: I'm coming for your {piece}. Defend it, if you can!", 'Sundai: Ten of my best. Good luck with that.', "Sundai: My {piece}-hunters are hungry. You're going down!"],
    defend: ["Sundai: Attacking me? Brave. You're going down.", 'Sundai: Ten of my best are waiting for you.', 'Sundai: Oh, you want a fight? Okay.'],
    wonDuel: ['Sundai: That one is mine. Obviously.', 'Sundai: Ouch. For you.', 'Sundai: Was that your best swing? Be honest.'],
    lostDuel: ['Sundai: No! My beautiful soldiers!', 'Sundai: Fine. Lucky swing.', "Sundai: Okay, that was actually good. Don't let it go to your head."],
    youWin: ['Sundai: Ugh. Well played. Rematch, right now.', "Sundai: You got me. I demand a rematch."],
    iWin: ["Sundai: Checkmate-ish. Told you you're going down. Again?", 'Sundai: Your monarch is on the floor. Again?'],
  };

  let retries = 0;
  let movesUntilRemark = 3; // her first remark comes a few moves in
  return {
    update,
    record,
    root: avatar.root,
    hasKey: () => { try { return !!storage.getItem(KEY_NAME); } catch (e) { return false; } },
    /** True if her live voice can be started here: a key was given, or the site has a voice relay. */
    async canGoLive() {
      if (await agentId('crownfallAgentId')) return true;
      try { if (storage.getItem(KEY_NAME)) return true; } catch (e) { /* none */ }
      return !!(await relayUrl());
    },
    setKey(key) {
      try {
        if (key) storage.setItem(KEY_NAME, key);
        else storage.removeItem(KEY_NAME);
      } catch (e) { /* not stored */ }
    },
    /** Start (or restart) the live voice. Call from a tap. Resolves when it is live or has failed. */
    async startVoice() {
      wantsVoice = true;
      // First choice: the site's ElevenLabs agent (Claude). Nothing to type.
      const agent = await agentId('crownfallAgentId');
      if (agent) {
        await eleven.start(agent);
        // A failed start is retried a few times by itself: networks and permissions are often slow the first time.
        if (eleven.state() !== 'live' && retries < 3) {
          retries += 1;
          setTimeout(() => { if (eleven.state() === 'failed') this.startVoice(); }, 6000);
        } else if (eleven.state() === 'live') retries = 0;
        return eleven.state() === 'live';
      }
      let key = '';
      try { key = storage.getItem(KEY_NAME) || ''; } catch (e) { /* none */ }
      // No key typed here: use a short-lived pass from the site's voice relay, if it has one.
      if (!key && !(await relayUrl())) return false;
      await openai.start(key || voicePass);
      return openai.state() === 'live';
    },
    voiceState: () => voice.state(),
    voiceLog: () => voice.lines.slice(),
    /** Whether her voice has actually been heard on the live call yet. */
    heardHer: () => voice.heardHer(),
    /** Have her say something now (used to prove the voice works before a game starts). */
    hello() {
      report('The user has just switched your voice on. There is no game. Say hello in one short sentence.', true, "Sundai: Hi, I'm Sundai.");
    },
    voiceProblem: () => voice.problem(),

    /** Her move, or null if she has none. */
    chooseMove(game) {
      // She plays to win: barely any randomness in her choice.
      const m = bestMove(game.board, her, record, () => Math.random() * 0.2);
      if (m) reachFor(m.to.r, m.to.c);
      return m;
    },

    /** The user has been thinking a while: point at a good move and say why. */
    offerHint(game) {
      if (beforeGame || game.phase !== 'play' || game.turn !== human) return;
      const m = bestMove(game.board, human, record, () => 0);
      if (!m) return;
      reachFor(m.from.r, m.from.c);
      report(`The user has been thinking for a while. Offer this as a friendly hint, in one short sentence: ${m.text}, because ${m.reason}.`, true, `Sundai: Try your ${m.text}.`);
    },
    /** True if she can talk in any way at all in this browser. */
    canSpeak: () => voice.state() === 'live' || builtIn.available(),

    /** Put on the court gown and crown (once). */
    dress() {
      wantDress = true;
    },
    /** She is in the room, before any game: say hello. */
    arrived() {
      at.known = false; // take her place in front of wherever the player is now
      route = [];
      following = false;
      roaming = false;
      sitting = false;
      wantDress = false;
      situation = 'No game yet. You are in the room in everyday clothes. There is no board.';
      report('You have just appeared in the room, in everyday clothes, facing a visitor. There is no game yet. Say hello in one short sentence.', true, "Sundai: Hi, I'm Sundai.");
    },
    /** The game has been left: back in the room, in her own clothes, where she stands. */
    leftGame() {
      wantDress = false;
      route = [];
      following = false;
      sitting = false;
      heading = at.known ? yawTo(eyes.x, eyes.z) : heading;
      situation = 'No game. You are in the room in everyday clothes. There is no board.';
      voice.tell("[game] The game has been left. The castle and the board are gone; you are back in the user's room in everyday clothes. There is no game now: do not talk about pieces or moves.", false);
    },
    /** Send her somewhere before the game (used by tests and the no-voice fallback). */
    go: (name, params) => toolResult(name, params),
    /** Ask for the outward camera (from a tap, before AR). */
    startCamera,
    cameraState,
    get position() { return { x: at.x, z: at.z, yaw: at.yaw, walking: route.length > 0, dressed, following, roaming, sitting }; },

    gameStarted() {
      wantDress = true;
      movesUntilRemark = 3;
      situation = 'A game is in progress on the board. The user is Gold and moves first. You are Violet.';
      report(`A new game has started. You are Violet, the user is Gold and moves first. Their record in duels so far: ${record.summary()}. Say hello in a few words and tell them it is their move. Do not explain the rules unless they ask.${boardNow()}`, true, "Sundai: Move a piece one square. Archers and swordsmen can attack a neighbour. Hit my monarch to win. You first.");
    },

    /** The user is about to play `action` on `boardBefore`. */
    userMoved(boardBefore, action) {
      const a = assess(boardBefore, human, action, record);
      const what = describeAction(boardBefore, action);
      // Speak up about real mistakes; let everything else pass in silence.
      const worthSaying = a.kind === 'blunder' || a.kind === 'missed_win';
      return { text: `The user played: ${what}. Coaching note (${a.kind.replace('_', ' ')}): ${a.note}`, speak: worthSaying, spoken: a.kind === 'blunder' || a.kind === 'missed_win' || a.kind === 'weak' ? `Sundai: ${a.note.replace(/^Their monarch/, 'Careful, your monarch').replace(/^They could have won/, 'You could have won').replace(/^Stronger was/, 'Stronger was')}` : '' };
    },

    /** Say what was queued by userMoved, once the move has actually been played. */
    tell(note) {
      if (note) report(note.text + boardNow(), note.speak, note.spoken);
    },

    sheMoved(boardBefore, action) {
      // About every fifth move she says what she is up to; the rest pass in silence.
      movesUntilRemark -= 1;
      const speak = movesUntilRemark <= 0;
      if (speak) movesUntilRemark = 4 + Math.floor(Math.random() * 3);
      const threat = /threatens/.test(action.reason);
      report(`You played: ${describeAction(boardBefore, action)}. Your reason: ${action.reason}.${speak ? ' Say in one short sentence what you are doing with this move.' : ' Say nothing about it.'}${boardNow()}`, speak, speak ? pick(threat ? TAUNTS.threat : TAUNTS.move) : '');
    },

    duelStarting(humanType, foeType, sheAttacks) {
      const you = humanType === 'A' ? 'archer (bow)' : 'swordsman (sword)';
      const them = foeType === 'A' ? 'archers' : 'swordsmen';
      const how = humanType === 'S' && foeType === 'A'
        ? ' If they ask how, tell them to deflect the arrows with their sword.'
        : humanType === 'S'
          ? ' If they ask how, tell them to cut the charging swordsmen down with the sword.'
          : foeType === 'S'
            ? ' If they ask how, tell them to draw the bowstring with their click hand and loose into the charge.'
            : ' If they ask how, tell them to shoot the archers down with the bow.';
      situation = `A duel is happening now. The user fights as a ${you} against enemy ${them}.` + how;
      report((sheAttacks ? `You attacked the user's ${humanType === 'A' ? 'archer' : 'swordsman'} with your ${foeType === 'A' ? 'archer' : 'swordsman'}. They are now fighting the duel to defend it.` : `The user attacked your ${foeType === 'A' ? 'archer' : 'swordsman'} with their ${humanType === 'A' ? 'archer' : 'swordsman'} and is now fighting the duel.`) + how + ' Taunt them in a few words unless they asked how to play.', true, pick(sheAttacks ? TAUNTS.attack : TAUNTS.defend).replace('{piece}', humanType === 'A' ? 'archer' : 'swordsman'));
    },

    duelEnded(humanType, foeType, humanWon) {
      record.record(humanType, foeType, humanWon);
      situation = 'The duel is over and play is back on the board.';
      report(`The duel is over: the user ${humanWon ? 'won' : 'lost'} it. Their record: ${record.summary()}. React in a few words, in character${humanWon ? ' (dramatic about losing your men, grudging credit)' : ' (gloat a little; if they have lost this kind of duel more than once, add one short practical tip)'}.${boardNow()}`, true, pick(humanWon ? TAUNTS.lostDuel : TAUNTS.wonDuel));
    },

    gameOver(winner) {
      situation = winner == null ? 'The game is over in a draw.' : winner === human ? 'The game is over. The user won.' : 'The game is over. You won.';
      report(winner == null ? 'The game ended in a draw: nobody can move.' : winner === human ? 'The user struck your monarch and won the game. Be a dramatic but good sport about it in one sentence and demand a rematch.' : 'You struck the user\'s monarch and won the game. Gloat playfully in one sentence and offer another game.', true, winner == null ? '' : pick(winner === human ? TAUNTS.youWin : TAUNTS.iWin));
    },
  };
}
