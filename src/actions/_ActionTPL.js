import debugLog from '../utils/DebugLogger.js';

export class ExampleAction {
  constructor(stores) {
    
    this.performanceStore = stores.performanceStore;
    this.configStore = stores.configStore;
    this.audioStore = stores.audioStore;
    
  }
  
  execute(params) {
    
  }
}
