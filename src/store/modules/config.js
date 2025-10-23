import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    sustain: true,
    octaveStart: 4,
    octaveEnd: 6,
    keymap: 'x66',
    fadeout: true,
    fadeoutDuration: 2000,
    autotrigger: true,
  }),
  
  actions: {
    toggleSustain() {
      this.sustain = !this.sustain
    },
    
    toggleFadeout() {
      this.fadeout = !this.fadeout
    },
    
    toggleAutotrigger() {
      this.autotrigger = !this.autotrigger
    },
    
    setKeymap(keymap) {
      this.keymap = keymap
    }
  }
})

