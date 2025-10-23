import { defineStore } from 'pinia';
import Triads from "../../theory/Triads.js";
import Intervals from "../../theory/Intervals.js";
import Common from "../../theory/common.js";
import Helpers from "../../utils/Helpers.js";
import debugLog from "../../utils/DebugLogger.js";

const usePerformanceStore = defineStore('performance', {
  state: () => ({
    active: {
      notes: new Set(),
      chord: null,
      chordRelationship: undefined,
      order: [], // track press order for clearLast()
    },
    passive: {
      notes: new Set(),
      chord: null,
      timeout: null,
    },
  }),

  actions: {
    addNote(note, config = {}) {
      if (!this.active.notes.has(note)) {
        this.active.notes.add(note);
        this.active.order.push(note);
        debugLog(`Note ON: ${note}`);
      }

      computeChord(this);
      if (config.autotrigger) { this.validate(config); };
    },

    removeNote(note, config = {}) {
      if (this.active.notes.has(note)) {
        this.active.notes.delete(note);
        this.active.order = this.active.order.filter(n => n !== note);
        debugLog(`Note OFF: ${note}`);
      }

      computeChord(this);
      if (config.autotrigger) { this.validate(config); };
    },

    validateCurrentChord(config = {}) {
      if (this.active.chord) {
        debugLog('Valid chord detected:', this.active.chord);
        copyActiveToPassive(this, config);
        clearActive(this);
      } else {
        debugLog('Invalid chord');
      }
    },

    reset() {
      debugLog('Resetting performance state');
      clearActive(this);
      clearPassive(this);
    },

    removeLastNote(config = {}) {
      const lastNote = this.active.order.pop();
      if (lastNote !== undefined) {
        this.active.notes.delete(lastNote);
        debugLog(`Clearing last note: ${lastNote}`);
        computeChord(this);
        if (config.autotrigger) { this.validate(config); };
      } else {
        debugLog('No notes to clear - order is empty');
      }
    },
  },
});

function computeChord(performance) {
  const chord = Triads.fromNotes([...performance.active.notes]);
  performance.active.chord = chord;

  // Only log when chord changes
  if (performance.active.chord !== chord) {
    debugLog('Chord computed:', chord);
  }

  if (performance.active.chord && performance.passive.chord) {
    const chordRelationship = computeCR(performance.active.chord, performance.passive.chord);
    performance.active.chordRelationship = chordRelationship;
    debugLog('Chord relationship:', chordRelationship);
  } else {
    performance.active.chordRelationship = null;
  }
}

function computeCR(activeChord, passiveChord) {
  Helpers.assert(
    activeChord.quality != null &&
    activeChord.root != null &&
    passiveChord.quality != null &&
    passiveChord.root != null,
    activeChord
  );

  const interval = Intervals.romans[Common.modulo12(activeChord.root - passiveChord.root)];
  return `${passiveChord.quality} ${interval} ${activeChord.quality}`;
}

function copyActiveToPassive(performance, config = {}) {
  debugLog('Copying active chord to passive');

  performance.passive.chord = performance.active.chord;
  performance.passive.notes = new Set(performance.active.notes);
  performance.active.chord = null;

  if (config.fadeout) {
    setPassiveTimeout(performance, config.fadeoutDuration);
  }
}

function setPassiveTimeout(performance, duration) {
  if (performance.passive.timeout) {
    clearTimeout(performance.passive.timeout);
    performance.passive.timeout = null;
  }

  performance.passive.timeout = setTimeout(() => {
    if (!performance.active.chord) {
      clearPassive(performance);
    } else {
      setPassiveTimeout(performance, duration);
    }
  }, duration);
}

function clearActive(performance) {
  performance.active.notes.clear();
  performance.active.order = [];
  performance.active.chordRelationship = null;
}

function clearPassive(performance) {
  performance.passive.notes.clear();
  performance.passive.chord = null;
  performance.passive.timeout = null;
}

export default usePerformanceStore;
