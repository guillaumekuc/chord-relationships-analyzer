import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    sustain: false,
    octaveStart: 4,
    octaveEnd: 6,
    keymap: 'x66',
    fadeout: false,
    fadeoutDuration: 2000,
    autotrigger: false,
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

