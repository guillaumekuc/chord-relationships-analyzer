import debugLog from '../utils/DebugLogger.js';

export default class ToggleNoteLabels {
  constructor(stores) {
    this.instrumentsStore = stores.instruments;
  }
  
  execute(params) {
    const { parent } = params;
    
    if (!parent) {
      debugLog('ToggleNoteLabels: parent parameter is required');
      return;
    }
    
    const instrument = this.instrumentsStore.getInstrument(parent);
    if (!instrument) {
      debugLog(`ToggleNoteLabels: instrument not found for parent: ${parent}`);
      return;
    }
    
    if (!instrument.display) {
      instrument.display = {};
    }
    
    instrument.display.noteLabels = !instrument.display.noteLabels;
    debugLog(`ToggleNoteLabels: note labels ${instrument.display.noteLabels ? 'enabled' : 'disabled'}`);
  }
}

