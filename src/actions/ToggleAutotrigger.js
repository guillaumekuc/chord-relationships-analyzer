import debugLog from '../utils/DebugLogger.js';

export class ToggleAutotrigger {
  constructor(stores) {
    this.configStore = stores.config;
  }
  
  execute() {
    debugLog('Toggling autotrigger mode');
    
    const that = this;
    
    // Main logic flow
    that.configStore.toggle('autotrigger');
    
    // Helper functions
    // (No helper functions needed for this simple toggle)
  }
}
