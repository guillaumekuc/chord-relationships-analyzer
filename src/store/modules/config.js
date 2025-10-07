import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    sustain: true,
    octaveStart: 4,
    octaveEnd: 6,
    keymap: 'x66',
  }),
  actions: {
    
  }
})

