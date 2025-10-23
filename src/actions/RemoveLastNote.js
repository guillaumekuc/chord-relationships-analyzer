import debugLog from '../utils/DebugLogger.js';
import Triads from '../theory/Triads.js';
import Intervals from '../theory/Intervals.js';
import * as Common from '../theory/common.js';

export class RemoveLastNote {
  constructor(stores) {
    this.performanceStore = stores.performance;
    this.configStore = stores.config;
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
        validateChord();
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
    
    function validateChord() {
      if (that.performanceStore.active.chord) {
        debugLog('Valid chord detected:', that.performanceStore.active.chord);
        copyActiveToPassive();
        clearActive();
      } else {
        debugLog('Invalid chord');
      }
    }
    
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
