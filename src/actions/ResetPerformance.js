import debugLog from '../utils/DebugLogger.js';

export default class ResetPerformance {
  constructor(stores) {
    this.performanceStore = stores.performance;
  }
  
  execute() {
    debugLog('Resetting performance state');
    
    const that = this;
    
    // Main logic flow
    clearActive();
    clearPassive();
    
    // Helper functions
    function clearActive() {
      that.performanceStore.active.notes.clear();
      that.performanceStore.active.order = [];
      that.performanceStore.active.chord = null;
      that.performanceStore.active.chordRelationship = null;
    }
    
    function clearPassive() {
      that.performanceStore.passive.notes.clear();
      that.performanceStore.passive.chord = null;
      if (that.performanceStore.passive.timeout) {
        clearTimeout(that.performanceStore.passive.timeout);
        that.performanceStore.passive.timeout = null;
      }
    }
  }
}

