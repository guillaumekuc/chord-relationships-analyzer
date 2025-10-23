import debugLog from '../utils/DebugLogger.js';

class RefreshMIDIDevices {
  constructor(stores) {
    this.midiStore = stores.midi;
  }
  
  execute(params = {}) {
    if (!this.midiStore.isConnected || !this.midiStore.access) {
      debugLog('RefreshMIDIDevices: MIDI not connected');
      return { success: false, error: 'MIDI not connected' };
    }
    
    try {
      const inputs = Array.from(this.midiStore.access.inputs.values()).map(input => ({
        id: input.id,
        name: input.name,
        manufacturer: input.manufacturer
      }));
      
      this.midiStore.setInputs(inputs);
      debugLog(`RefreshMIDIDevices: Found ${inputs.length} MIDI devices`);
      
      // Auto-select first device if current selection is invalid
      const currentSelection = this.midiStore.selectedId;
      const validSelection = inputs.find(input => input.id === currentSelection);
      
      if (!validSelection && inputs.length > 0) {
        this.midiStore.setSelectedId(inputs[0].id);
        debugLog(`RefreshMIDIDevices: Auto-selected first device: ${inputs[0].name}`);
      }
      
      return { success: true, devices: inputs };
    } catch (error) {
      debugLog('RefreshMIDIDevices: Failed to refresh devices', String(error));
      return { success: false, error: String(error) };
    }
  }
}

export default RefreshMIDIDevices;
