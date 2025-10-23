import debugLog from '../utils/DebugLogger.js';

class ValidateChord {
  constructor(stores) {
    this.performanceStore = stores.performance;
    this.configStore = stores.config;
  }
  
  execute() {
    const that = this;
    
    // Main logic flow
    if (that.performanceStore.active.chord) {
      debugLog('Valid chord detected:', that.performanceStore.active.chord);
      copyActiveToPassive();
      clearActive();
    } else {
      debugLog('Invalid chord');
    }
    
    // Helper functions
    function copyActiveToPassive() {
      debugLog('Copying active chord to passive');
      
      that.performanceStore.passive.chord = that.performanceStore.active.chord;
      that.performanceStore.passive.notes = new Set(that.performanceStore.active.notes);
      that.performanceStore.active.chord = null;
      
      if (that.configStore.fadeout) {
        setPassiveTimeout(that.configStore.fadeoutDuration);
      }
    }
    
    function setPassiveTimeout(duration) {
      if (that.performanceStore.passive.timeout) {
        clearTimeout(that.performanceStore.passive.timeout);
        that.performanceStore.passive.timeout = null;
      }
      
      that.performanceStore.passive.timeout = setTimeout(() => {
        if (!that.performanceStore.active.chord) {
          clearPassive();
        } else {
          setPassiveTimeout(duration);
        }
      }, duration);
    }
    
    function clearActive() {
      that.performanceStore.active.notes.clear();
      that.performanceStore.active.order = [];
      that.performanceStore.active.chordRelationship = null;
    }
    
    function clearPassive() {
      that.performanceStore.passive.notes.clear();
      that.performanceStore.passive.chord = null;
      that.performanceStore.passive.timeout = null;
    }
  }
}

export default ValidateChord;
