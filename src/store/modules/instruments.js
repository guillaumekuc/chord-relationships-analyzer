import { defineStore } from 'pinia'

export const useInstrumentsStore = defineStore('instruments', {
  state: () => ({
    instruments: {},
  }),
  
  actions: {
    setInstrument(name, instrument) {
      this.instruments[name] = instrument;
    },
    
    getInstrument(name) {
      return this.instruments[name];
    },
    
    updateInstrumentProperty(name, property, value) {
      if (this.instruments[name]) {
        this.instruments[name][property] = value;
      }
    }
  }
})
