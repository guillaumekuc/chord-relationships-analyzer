import Convert from '../utils/Convert.js';
import debugLog from './DebugLogger.js';

export default class Player {
  constructor(stores) {
    this.stores = stores;
    // Expected stores: { performance, config, audio }
    this.hp = 100;
    this.position = { x: 0, y: 0 };
  }

  pressNote(midi) {
    debugLog(`Press note: ${midi}`);
    
    switch (this.stores.config.sustain) {
      case true:
        if (this.stores.performance.active.notes.has(midi)) {
          this.stores.performance.noteOff(midi, this.stores.config);
        } else {
          this.stores.performance.noteOn(midi, this.stores.config);
          const frequency = Convert.midiToHz(midi);
          this.stores.audio.playTone(frequency);
        }
        break;
      case false:
        this.stores.performance.noteOn(midi, this.stores.config);
        const frequency = Convert.midiToHz(midi);
        this.stores.audio.playTone(frequency);
        break;
    }
  }

  releaseNote(midi) {
    debugLog(`Release note: ${midi}`);
    if (this.stores.config.sustain) { 
      return; 
    } 
    this.stores.performance.noteOff(midi, this.stores.config);
  }
}