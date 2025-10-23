import debugLog from '../utils/DebugLogger.js';
import Triads from '../theory/Triads.js';
import Intervals from '../theory/Intervals.js';
import Common from '../theory/common.js';

export default class RemoveLastNote {
  constructor(stores) {
    this.performanceStore = stores.performance;
    this.configStore = stores.config;
    this.stores = stores;
  }
  
  execute() {
    const that = this;
    
    // Main logic flow
    const lastNote = that.performanceStore.active.order.pop();
    if (lastNote !== undefined) {
      that.performanceStore.active.notes.delete(lastNote);
      debugLog(`Clearing last note: ${lastNote}`);
      computeChord();
      
      if (that.configStore.autotrigger) {
        that.stores.actions.validateChord.execute();
      }
    } else {
      debugLog('No notes to clear - order is empty');
    }
    
    // Helper functions
    function computeChord() {
      const chord = Triads.fromNotes([...that.performanceStore.active.notes]);
      that.performanceStore.active.chord = chord;
      
      if (that.performanceStore.active.chord && that.performanceStore.passive.chord) {
        const chordRelationship = computeChordRelationship(
          that.performanceStore.active.chord, 
          that.performanceStore.passive.chord
        );
        that.performanceStore.active.chordRelationship = chordRelationship;
        debugLog('Chord relationship:', chordRelationship);
      } else {
        that.performanceStore.active.chordRelationship = null;
      }
    }
    
    function computeChordRelationship(activeChord, passiveChord) {
      const interval = Intervals.romans[Common.modulo12(activeChord.root - passiveChord.root)];
      return `${passiveChord.quality} ${interval} ${activeChord.quality}`;
    }
  }
}

