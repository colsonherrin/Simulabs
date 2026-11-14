// A software headset for desktop testing (?emulate=1): Meta's Immersive Web Emulation Runtime
// with a captured room, so the AR code path (session, floor, planes, furniture) can run in an
// ordinary browser. It proves the code runs, not that it works on a physical headset.
import { XRDevice, metaQuest3 } from 'iwer';
import { SyntheticEnvironmentModule } from '@iwer/sem';
import room from '@iwer/sem/captures/living_room.json';

const device = new XRDevice(metaQuest3);
// Desktop browsers have their own navigator.xr (without AR); replace it for this page only.
device.installRuntime({ forceInstall: true });
device.installSEM(SyntheticEnvironmentModule);
device.sem.loadEnvironment(room);
device.position.set(0, 1.6, 0);
window.__xrDevice = device;
