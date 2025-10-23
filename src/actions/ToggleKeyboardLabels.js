import debugLog from '../utils/DebugLogger.js';

class ToggleKeyboardLabels {
  constructor(stores) {
    this.instrumentsStore = stores.instruments;
  }
  
  execute(params) {
    const { parent } = params;
    
    if (!parent) {
      debugLog('ToggleKeyboardLabels: parent parameter is required');
      return;
    }
    
    const instrument = this.instrumentsStore.getInstrument(parent);
    if (!instrument) {
      debugLog(`ToggleKeyboardLabels: instrument not found for parent: ${parent}`);
      return;
    }
    
    if (!instrument.display) {
      instrument.display = {};
    }
    
    instrument.display.keyboardLabels = !instrument.display.keyboardLabels;
    debugLog(`ToggleKeyboardLabels: keyboard labels ${instrument.display.keyboardLabels ? 'enabled' : 'disabled'}`);
  }
}

export default ToggleKeyboardLabels;
