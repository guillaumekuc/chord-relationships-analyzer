<template>

  <MIDIConsole />
  <ConfigInspector />
  <Analyzer />
  <div class= "container">
    <Keyboard
      start-octave=4
      octaves=2
      layout='x66'
      key='x66Keyboard'
      id='x66Keyboard'
      colors='x75'
    />
    <Keyboard 
      :start-octave="4"
      :octaves="2"
      :layout="'x75'"
      :key="'x75Keyboard'"
      :id="'x75Keyboard'"

    />

</div>
</template>

<script setup>
import { useStore } from './store';
import MIDIConsole from './components/MIDIConsole.vue';
import Keyboard from './components/Keyboard.vue';
import Analyzer from './components/Analyzer.vue';
import ConfigInspector from './components/ConfigInspector.vue';

import ShortcutManager from './utils/ShortcutManager.js';

const store= useStore();
const shortcutManager= new ShortcutManager(store);
shortcutManager.init();

</script>

<style scoped>
  .container{
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }



</style>