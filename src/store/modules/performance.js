import { defineStore } from 'pinia'

export const usePerformanceStore = defineStore('performance', {
  state: () => ({
    activeNotes: {},
    passiveNotes: {},
  }),
  actions: {
    noteOn(note) {
      this.activeNotes[note] = true
    },
    noteOff(note) {
      delete this.activeNotes[note]
    },
    reset() {
      this.activeNotes = {}
    }
  }
})

