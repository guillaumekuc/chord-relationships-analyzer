import debugLog from '../utils/DebugLogger.js';

class ConnectMIDI {
  constructor(stores) {
    this.midiStore = stores.midi;
  }
  
  async execute(params = {}) {
    if (!this.midiStore.isWebMidiSupported) {
      debugLog('ConnectMIDI: Web MIDI not supported');
      return { success: false, error: 'Web MIDI not supported' };
    }
    
    if (this.midiStore.isConnected) {
      debugLog('ConnectMIDI: Already connected');
      return { success: false, error: 'Already connected' };
    }
    
    try {
      const access = await navigator.requestMIDIAccess({ sysex: false });
      this.midiStore.setAccess(access);
      this.midiStore.setConnected(true);
      debugLog('ConnectMIDI: MIDI connected successfully');
      
      // Set up hot-plug listener
      access.onstatechange = () => {
        this.midiStore.refreshInputs();
      };
      
      return { success: true };
    } catch (error) {
      debugLog('ConnectMIDI: Failed to get MIDI access', String(error));
      return { success: false, error: String(error) };
    }
  }
}

export default ConnectMIDI;
