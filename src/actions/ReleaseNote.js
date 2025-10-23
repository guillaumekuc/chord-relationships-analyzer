import debugLog from '../utils/DebugLogger.js';

class ReleaseNote {
  constructor(stores) {
    this.performanceStore = stores.performance;
    this.configStore = stores.config;
  }
  
  execute(midi) {
    debugLog(`Release note: ${midi}`);
    
    const that = this;
    
    // Main logic flow
    removeNoteIfNotSustained();
    
    // Helper functions
    function removeNoteIfNotSustained() {
      if (!that.configStore.sustain) {
        that.performanceStore.removeNote(midi, that.configStore);
      }
    }
  }
}

export default ReleaseNote;
