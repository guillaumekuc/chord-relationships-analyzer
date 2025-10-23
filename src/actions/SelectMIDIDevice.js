import debugLog from '../utils/DebugLogger.js';

class SelectMIDIDevice {
  constructor(stores) {
    this.midiStore = stores.midi;
    this.performanceStore = stores.performance;
  }
  
  execute(params) {
    const { deviceId } = params;
    
    if (!this.midiStore.isConnected || !this.midiStore.access) {
      debugLog('SelectMIDIDevice: MIDI not connected');
      return { success: false, error: 'MIDI not connected' };
    }
    
    // Clear previous input listener
    if (this.midiStore.input) {
      this.midiStore.input.onmidimessage = null;
    }
    
    // Set new input
    const input = deviceId ? this.midiStore.access.inputs.get(deviceId) : null;
    this.midiStore.setInput(input);
    this.midiStore.setSelectedId(deviceId || '');
    
    if (input) {
      debugLog(`SelectMIDIDevice: Selected device: ${input.name}`);
      input.onmidimessage = this.handleMIDIMessage.bind(this);
    } else {
      debugLog('SelectMIDIDevice: No device selected');
    }
    
    return { success: true };
  }
  
  handleMIDIMessage(e) {
    const [status, data1 = 0, data2 = 0] = e.data;
    const type = status & 0xf0;
    
    if (type === 0x90) {
      if (data2 === 0) {
        // Note Off
        debugLog(`MIDI OFF: ${data1}`);
        this.performanceStore.removeNote(data1);
      } else {
        // Note On
        debugLog(`MIDI ON: ${data1}`);
        this.performanceStore.addNote(data1);
      }
    } else if (type === 0x80) {
      // Note Off
      debugLog(`MIDI OFF: ${data1}`);
      this.performanceStore.removeNote(data1);
    }
  }
}

export default SelectMIDIDevice;
