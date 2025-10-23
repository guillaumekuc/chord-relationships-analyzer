import usePerformanceStore from './modules/performance.js'
import useConfigStore from './modules/config.js'
import useAudioStore from './modules/audio.js'
import useInstrumentsStore from './modules/instruments.js'
import useMIDIStore from './modules/midi.js'

// Import actions
import PressNote from '../actions/PressNote.js'
import ReleaseNote from '../actions/ReleaseNote.js'
import ValidateChord from '../actions/ValidateChord.js'
import ResetPerformance from '../actions/ResetPerformance.js'
import RemoveLastNote from '../actions/RemoveLastNote.js'
import ToggleConfig from '../actions/ToggleConfig.js'
import CycleKeymap from '../actions/CycleKeymap.js'
import CycleKeyboardLayout from '../actions/CycleKeyboardLayout.js'
import CycleKeyboardColors from '../actions/CycleKeyboardColors.js'
import ToggleKeyboardLabels from '../actions/ToggleKeyboardLabels.js'
import ToggleNoteLabels from '../actions/ToggleNoteLabels.js'
import ConnectMIDI from '../actions/ConnectMIDI.js'
import SelectMIDIDevice from '../actions/SelectMIDIDevice.js'
import RefreshMIDIDevices from '../actions/RefreshMIDIDevices.js'

// Unified API that provides access to all stores and actions
export const useStores = () => {
  const stores = {
    performance: usePerformanceStore(),
    config: useConfigStore(),
    audio: useAudioStore(),
    instruments: useInstrumentsStore(),
    midi: useMIDIStore(),
  }
  
  // Create actions with store dependencies
  const actions = {
    pressNote: new PressNote(stores),
    releaseNote: new ReleaseNote(stores),
    validateChord: new ValidateChord(stores),
    resetPerformance: new ResetPerformance(stores),
    removeLastNote: new RemoveLastNote(stores),
    toggleConfig: new ToggleConfig(stores),
    cycleKeymap: new CycleKeymap(stores),
    cycleKeyboardLayout: new CycleKeyboardLayout(stores),
    cycleKeyboardColors: new CycleKeyboardColors(stores),
    toggleKeyboardLabels: new ToggleKeyboardLabels(stores),
    toggleNoteLabels: new ToggleNoteLabels(stores),
    connectMIDI: new ConnectMIDI(stores),
    selectMIDIDevice: new SelectMIDIDevice(stores),
    refreshMIDIDevices: new RefreshMIDIDevices(stores)
  }
  
  return {
    ...stores,
    actions
  }
}

// Individual store exports for direct access when needed
export { default as usePerformanceStore } from './modules/performance.js'
export { default as useConfigStore } from './modules/config.js'
export { default as useAudioStore } from './modules/audio.js'
export { default as useInstrumentsStore } from './modules/instruments.js'
export { default as useMIDIStore } from './modules/midi.js'
