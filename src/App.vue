<template>
  <article class="main-container" data-theme="light">
    <header>
      <MIDIConsole />
      <ConfigInspector/>
    </header>
    <Analyzer />

      <Keyboard
        :start-octave="4"
        :octaves="2"
        layout="x66"
        key="x66Keyboard"
        id="x66Keyboard"
        colors="x75"
      />
      <Keyboard 
        :start-octave="4"
        :octaves="2"
        layout="x75"
        key="x75Keyboard"
        id="x75Keyboard"
      />

  </article>
</template>

<script setup>
// Internal imports
import MIDIConsole from './components/MIDIConsole.vue'
import Keyboard from './components/Keyboard.vue'
import Analyzer from './components/Analyzer.vue'
import ConfigInspector from './components/ConfigInspector.vue'

// Store imports - use direct imports for better performance
import { usePerformanceStore } from './store/modules/performance.js'
import { useConfigStore } from './store/modules/config.js'
import { useAudioStore } from './store/modules/audio.js'
import { usePlayerStore } from './store/modules/player.js'
import { useInstrumentsStore } from './store/modules/instruments.js'

// Utils imports
import ShortcutManager from './utils/ShortcutManager.js'

// Store usage - direct imports for better performance
const performanceStore = usePerformanceStore()
const configStore = useConfigStore()
const audioStore = useAudioStore()
const playerStore = usePlayerStore()
const instrumentsStore = useInstrumentsStore()

// Initialize shortcut manager with the stores it actually uses
const shortcutManager = new ShortcutManager({
  performance: performanceStore,
  config: configStore,
  player: playerStore  // Pass the Player store, which has the methods
})
shortcutManager.init()
</script>

<style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin:0px;

  }




</style>