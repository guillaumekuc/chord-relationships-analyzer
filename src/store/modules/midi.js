import { defineStore } from 'pinia'

const useMIDIStore = defineStore('midi', {
  state: () => ({
    isConnected: false,
    access: null,
    input: null,
    inputs: [], // [{ id, name, manufacturer }]
    selectedId: '',
    isWebMidiSupported: typeof navigator !== 'undefined' && 'requestMIDIAccess' in navigator
  }),
  
  actions: {
    setConnected(connected) {
      this.isConnected = connected;
    },
    
    setAccess(access) {
      this.access = access;
    },
    
    setInput(input) {
      this.input = input;
    },
    
    setInputs(inputs) {
      this.inputs = inputs;
    },
    
    setSelectedId(selectedId) {
      this.selectedId = selectedId;
    },
    
    addInput(input) {
      this.inputs.push(input);
    },
    
    removeInput(inputId) {
      this.inputs = this.inputs.filter(input => input.id !== inputId);
    },
    
    clearInputs() {
      this.inputs = [];
    },
    
    refreshInputs() {
      if (!this.access) return;
      
      const inputs = Array.from(this.access.inputs.values()).map(input => ({
        id: input.id,
        name: input.name,
        manufacturer: input.manufacturer
      }));
      
      this.setInputs(inputs);
      
      // Auto-select first device if current selection is invalid
      const currentSelection = this.selectedId;
      const validSelection = inputs.find(input => input.id === currentSelection);
      
      if (!validSelection && inputs.length > 0) {
        this.setSelectedId(inputs[0].id);
      }
    }
  }
})

export default useMIDIStore;
