import debugLog from '../utils/DebugLogger.js';
import keyboardRowPatterns from '../config/keyboardRowPatterns.js';

class CycleKeyboardLayout {
  constructor(stores) {
    this.instrumentsStore = stores.instruments;
  }
  
  execute(params) {
    const { parent } = params;
    
    if (!parent) {
      debugLog('CycleKeyboardLayout: parent parameter is required');
      return;
    }
    
    const instrument = this.instrumentsStore.getInstrument(parent);
    if (!instrument) {
      debugLog(`CycleKeyboardLayout: instrument not found for parent: ${parent}`);
      return;
    }
    
    const layout = instrument.layout;
    const allLayouts = Object.keys(keyboardRowPatterns);
    
    if (allLayouts.includes(layout)) {
      const index = allLayouts.indexOf(layout);
      const nextIndex = (index + 1) % allLayouts.length;
      instrument.layout = allLayouts[nextIndex];
      debugLog(`CycleKeyboardLayout: layout changed from ${layout} to ${allLayouts[nextIndex]}`);
    } else {
      instrument.layout = allLayouts[0];
      debugLog(`CycleKeyboardLayout: layout set to default: ${allLayouts[0]}`);
    }
  }
}

export default CycleKeyboardLayout;
