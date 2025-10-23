import debugLog from '../utils/DebugLogger.js';

export class ToggleSustain {
  constructor(stores) {
    this.configStore = stores.config;
  }
  
  execute() {
    debugLog('Toggling sustain mode');
    
    const that = this;
    
    // Main logic flow
    that.configStore.toggle('sustain');
    
    // Helper functions
    // (No helper functions needed for this simple toggle)
  }
}
