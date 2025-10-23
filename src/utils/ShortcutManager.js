import Convert from './Convert.js';
import keymap from '../config/keymap.js';
import debugLog from './DebugLogger.js';

export default class ShortcutManager {
  constructor(stores) {
    this.stores = stores;
    // Expected stores: { performance, config, player }
    // Note: player is the Player store, not the Player instance
  }

  init() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown = (e) => {
    if (e.repeat) { return; }

    if (e.key === 'Enter') {
      this.stores.actions.validateChord.execute();
    }

    if (e.key === 'Escape' || e.key === 'Esc') {
      debugLog('Reset');
      this.stores.actions.resetPerformance.execute();
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      debugLog('Clear last note');
      this.stores.actions.removeLastNote.execute();
    }

    const map = keymap[this.stores.config.keymap];
    const midi = Convert.keyToMidi(e.key.toLowerCase(), map);
    if (!midi) { return; }

    debugLog(`Key: ${e.key} -> MIDI ${midi}`);

    this.stores.actions.pressNote.execute(midi);
  }

  handleKeyUp = (e) => {
    const map = keymap[this.stores.config.keymap];
    const midi = Convert.keyToMidi(e.key.toLowerCase(), map);
    if (!midi) { return; }
    if (this.stores.config.sustain) { 
      return; 
    } 
    this.stores.actions.releaseNote.execute(midi);
  }
}