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

// Store imports
import { useStores } from './store/index.js'

// Utils imports
import ShortcutManager from './utils/ShortcutManager.js'

// Store usage - unified API
const stores = useStores()

// Initialize shortcut manager with the unified stores
const shortcutManager = new ShortcutManager(stores)
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