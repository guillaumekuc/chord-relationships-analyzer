import { usePerformanceStore } from './modules/performance.js'
import { useConfigStore } from './modules/config.js'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    performance: usePerformanceStore(),
    config: useConfigStore(),
    audio: null,
    player: null,
    instruments: {},
  }),
})
