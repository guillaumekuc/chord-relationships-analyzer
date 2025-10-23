import { defineStore } from 'pinia';
import Triads from "../../theory/Triads.js";
import Intervals from "../../theory/Intervals.js";
import * as Common from "../../theory/common.js";
import Helpers from "../../utils/Helpers.js";

export const usePerformanceStore = defineStore('performance', {
  state: () => ({
    active: {
      notes: new Set(),
      chord: null,
      cr: undefined,
      order: [], // track press order for clearLast()
    },
    passive: {
      notes: new Set(),
      chord: null,
      timeout: null,
    },
  }),

  actions: {
    noteOn(note, config = {}) {
      if (!this.active.notes.has(note)) {
        this.active.notes.add(note);
        this.active.order.push(note);
      }

      computeChord(this);
      if (config.autotrigger) { this.validate(config) };
    },

    noteOff(note, config = {}) {
      if (this.active.notes.has(note)) {
        this.active.notes.delete(note);
        this.active.order = this.active.order.filter(n => n !== note);
      }

      computeChord(this);
      if (config.autotrigger) { this.validate(config) };
    },

    validate(config = {}) {
      if (this.active.chord) {
        copyActiveToPassive(this, config);
        clearActive(this);
      } else {
        console.log('invalid chord');
      }
    },

    reset() {
      clearActive(this);
      clearPassive(this);
    },

    clearLast(config = {}) {
      const lastNote = this.active.order.pop();
      if (lastNote !== undefined) {
        this.active.notes.delete(lastNote);
        computeChord(this);
        if (config.autotrigger) { this.validate(config) };
      }
    },
  },
});

function computeChord(performance) {
  const chord = Triads.fromNotes([...performance.active.notes]);
  performance.active.chord = chord;

  if (performance.active.chord && performance.passive.chord) {
    const cr = computeCR(performance.active.chord, performance.passive.chord);
    performance.active.cr = cr;
  } else {
    performance.active.cr = null;
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
  console.log('copyActiveToPassive');
  console.log(performance.active);

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
  performance.active.cr = null;
}

function clearPassive(performance) {
  performance.passive.notes.clear();
  performance.passive.chord = null;
  performance.passive.timeout = null;
}
