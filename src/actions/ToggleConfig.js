import debugLog from '../utils/DebugLogger.js';

export default class ToggleConfig {
  constructor(stores) {
    this.configStore = stores.config;
  }
  
  execute(configKey) {
    debugLog(`Toggling ${configKey} mode`);
    
    this.configStore.toggle(configKey);
  }
}

