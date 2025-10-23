import { usePerformanceStore } from './modules/performance.js'
import { useConfigStore } from './modules/config.js'
import { useAudioStore } from './modules/audio.js'
import { usePlayerStore } from './modules/player.js'
import { useInstrumentsStore } from './modules/instruments.js'

// Import actions
import { PressNote } from '../actions/PressNote.js'
import { ReleaseNote } from '../actions/ReleaseNote.js'
import { ValidateChord } from '../actions/ValidateChord.js'
import { ResetPerformance } from '../actions/ResetPerformance.js'
import { RemoveLastNote } from '../actions/RemoveLastNote.js'
import { ToggleSustain } from '../actions/ToggleSustain.js'
import { ToggleFadeout } from '../actions/ToggleFadeout.js'
import { ToggleAutotrigger } from '../actions/ToggleAutotrigger.js'
import { CycleKeymap } from '../actions/CycleKeymap.js'

// Unified API that provides access to all stores and actions
export const useStores = () => {
  const stores = {
    performance: usePerformanceStore(),
    config: useConfigStore(),
    audio: useAudioStore(),
    player: usePlayerStore(),
    instruments: useInstrumentsStore(),
  }
  
  // Create actions with store dependencies
  const actions = {
    pressNote: new PressNote(stores),
    releaseNote: new ReleaseNote(stores),
    validateChord: new ValidateChord(stores),
    resetPerformance: new ResetPerformance(stores),
    removeLastNote: new RemoveLastNote(stores),
    toggleSustain: new ToggleSustain(stores),
    toggleFadeout: new ToggleFadeout(stores),
    toggleAutotrigger: new ToggleAutotrigger(stores),
    cycleKeymap: new CycleKeymap(stores)
  }
  
  return {
    ...stores,
    actions
  }
}

// Individual store exports for direct access when needed
export { usePerformanceStore } from './modules/performance.js'
export { useConfigStore } from './modules/config.js'
export { useAudioStore } from './modules/audio.js'
export { usePlayerStore } from './modules/player.js'
export { useInstrumentsStore } from './modules/instruments.js'
