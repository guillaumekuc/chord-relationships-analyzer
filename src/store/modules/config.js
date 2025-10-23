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
    // Generic, flexible actions
    set(key, value) {
      this[key] = value
    },
    
    toggle(key) {
      this[key] = !this[key]
    },
    
    cycle(key, options) {
      const currentValue = this[key]
      const availableOptions = Array.isArray(options) ? options : Object.keys(options)
      
      if (availableOptions.includes(currentValue)) {
        const index = availableOptions.indexOf(currentValue)
        const nextIndex = (index + 1) % availableOptions.length
        this[key] = availableOptions[nextIndex]
      } else {
        this[key] = availableOptions[0]
      }
    }
  }
})

