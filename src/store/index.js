import { usePerformanceStore } from './modules/performance.js'
import { useConfigStore } from './modules/config.js'
import { useAudioStore } from './modules/audio.js'

// Unified API that provides access to all stores
export const useStores = () => {
  return {
    performance: usePerformanceStore(),
    config: useConfigStore(),
    audio: useAudioStore(),
  }
}

// Individual store exports for direct access when needed
export { usePerformanceStore } from './modules/performance.js'
export { useConfigStore } from './modules/config.js'
export { useAudioStore } from './modules/audio.js'
