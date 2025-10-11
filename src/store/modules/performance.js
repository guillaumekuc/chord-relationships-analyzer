import { defineStore } from 'pinia'

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
    },
  }),
  actions: {
    noteOn(note) {
      this.active.notes[note] = true;
    },
    noteOff(note) {
      if (this.active.chord) {
        this.passive.chord = this.active.chord;

        
        this.passive.notes = { ...this.active.notes };
        this.active.chord = null; 
      }

      delete this.active.notes[note];

      if (Object.keys(this.active.notes).length === 0) {
        this.active.cr = null;
      }
    },
    reset() {
      if (this.active.chord) {
        this.passive.chord=this.active.chord;
        this.passive.notes=this.active.notes;
        this.active.chord=null;
      }

      this.active.notes = {}
      this.active.cr=null;

    }
  }
})

