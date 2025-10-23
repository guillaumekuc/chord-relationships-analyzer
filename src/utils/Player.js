import Convert from '../utils/Convert.js';
import debugLog from './DebugLogger.js';

export default class Player {
  constructor(stores) {
    this.stores = stores;
    // Expected stores: { performance, config, audio }
    this.hp = 100;
    this.position = { x: 0, y: 0 };
  }

  pressNote(midi) {
    this.stores.actions.pressNote.execute(midi);
  }

  releaseNote(midi) {
    this.stores.actions.releaseNote.execute(midi);
  }
}