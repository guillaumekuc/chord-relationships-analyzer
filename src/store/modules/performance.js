import { defineStore } from 'pinia';
import { useConfigStore } from './config.js';

export const usePerformanceStore = defineStore('performance', {
  state: () => ({
    active: {
      notes: {},
      chord: null,
      cr: undefined,
    },
    passive: {
      notes: {},
      chord: null,
      timeout: null,
    },
  }),
  actions: {
    noteOn(note) {
      this.active.notes[note] = true;
    },
    noteOff(note) {
      if (this.active.chord) {
        copyActiveToPassive(this);

      }

      delete this.active.notes[note];

      if (Object.keys(this.active.notes).length === 0) {
        this.active.cr = null;
      }
    },

    reset() {
      if (this.active.chord) {
        copyActiveToPassive(this);
      }

      this.active.notes = {}
      this.active.cr=null;

    }
  }
})

function copyActiveToPassive(performance){
  console.log('copyActiveToPassive');
  console.log(performance.active);
  performance.passive.chord = performance.active.chord;

  performance.passive.notes = { ...performance.active.notes };
  performance.active.chord = null; 

  setPassiveTimeout(performance);
}

function setPassiveTimeout(performance) {
  const config=useConfigStore();

  if (performance.passive.timeout) {
        clearTimeout(performance.passive.timeout)
        performance.passive.timeout = null
  }
  performance.passive.timeout = setTimeout(() => {
    clearPassive(performance);
  }, config.passiveTimeout)
}

function clearPassive(performance){ 
  performance.passive.notes = {}
  performance.passive.chord = null
  performance.passive.timeout = null

}

