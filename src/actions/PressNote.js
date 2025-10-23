import Convert from '../utils/Convert.js';
import debugLog from '../utils/DebugLogger.js';

class PressNote {
  constructor(stores) {
    this.performanceStore = stores.performance;
    this.audioStore = stores.audio;
    this.configStore = stores.config;
  }
  
  execute(midi) {
    debugLog(`Press note: ${midi}`);
    
    const that = this;
    
    // Main logic flow
    if (that.configStore.sustain) {
      if (that.performanceStore.active.notes.has(midi)) {
        removeNote(midi);
      } else {
        addNoteAndPlay(midi);
      }
    } else {
      addNoteAndPlay(midi);
    }
    
    // Helper functions
    function addNoteAndPlay(midi) {
      that.performanceStore.addNote(midi, that.configStore);
      const frequency = Convert.midiToHz(midi);
      that.audioStore.playTone(frequency);
    }
    
    function removeNote(midi) {
      that.performanceStore.removeNote(midi, that.configStore);
    }
  }
}

export default PressNote;
