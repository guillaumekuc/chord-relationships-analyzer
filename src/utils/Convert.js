import keymap from '../config/keymap.js';

export default class Convert {
  static midiToHz(midi) {
    return (440 * Math.pow(2, (midi - 69) / 12));
  }

  static keyToMidi(key, map) {
    const midiToKey = map || keymap.x66;
    for (const [midi, mappedKey] of Object.entries(midiToKey)) {
      if (mappedKey === key) {
        return parseInt(midi, 10);
      }
    }
    return undefined;
  }
}