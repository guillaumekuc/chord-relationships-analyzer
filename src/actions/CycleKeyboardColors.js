import debugLog from '../utils/DebugLogger.js';
import keyboardColorPatterns from '../config/keyboardColorPatterns.js';

class CycleKeyboardColors {
  constructor(stores) {
    this.instrumentsStore = stores.instruments;
  }
  
  execute(params) {
    const { parent } = params;
    
    if (!parent) {
      debugLog('CycleKeyboardColors: parent parameter is required');
      return;
    }
    
    const instrument = this.instrumentsStore.getInstrument(parent);
    if (!instrument) {
      debugLog(`CycleKeyboardColors: instrument not found for parent: ${parent}`);
      return;
    }
    
    const colors = instrument.colors;
    const allColors = Object.keys(keyboardColorPatterns);
    
    if (allColors.includes(colors)) {
      const index = allColors.indexOf(colors);
      const nextIndex = (index + 1) % allColors.length;
      instrument.colors = allColors[nextIndex];
      debugLog(`CycleKeyboardColors: colors changed from ${colors} to ${allColors[nextIndex]}`);
    } else {
      instrument.colors = allColors[0];
      debugLog(`CycleKeyboardColors: colors set to default: ${allColors[0]}`);
    }
  }
}

export default CycleKeyboardColors;
