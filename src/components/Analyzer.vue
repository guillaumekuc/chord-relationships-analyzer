<template>


  <div class="analyzer">
  
    <h1></h1>
    <div class="cr-container">
      <span :class="store.performance.passive.chord?.name ? 'passive' : ''">{{store.performance.passive.chord?.name ?? ""}}</span>
      <span :class="store.performance.passive.chord?.name && store.performance.active.chord?.name ? 'separator' : ''"></span>
      <span class="cr">{{store.performance.active?.cr ?? ""}}</span>
      <span :class="store.performance.passive.chord?.name && store.performance.active.chord?.name ? 'separator' : ''"></span>
      <span :class="store.performance.active.chord?.name ? 'active' : ''">{{store.performance.active.chord?.name ?? ""}}</span>
      
    </div>
  </div>
</template>

<script setup>

  import { useStore } from '../store';
  import { computed } from 'vue';
  import { watch } from 'vue';
  import Triads from "../theory/Triads.js";
  import Notes from "../theory/Notes.js";
  import * as Common from "../theory/common.js";
  import Helpers from "../utils/Helpers.js";
  import Intervals from "../theory/Intervals.js";

  const store = useStore();

  const triad = computed(() => Object.entries(store.performance.active.notes).length === 3);
  const triadTypes=Triads.types;

  watch(() => store.performance.active.notes, computeChord, { deep: true, immediate: true });

  function computeChord(activeNotes) {
    const chord=Triads.fromNotes(Object.keys(activeNotes));
    store.performance.active.chord=chord;
    if (store.performance.active.chord && store.performance.passive.chord){
      console.log(store.performance.active.chord, store.performance.passive.chord);
      const cr = computeCR(store.performance.active.chord, store.performance.passive.chord);
      store.performance.active.cr=cr
    }
  }

  function computeCR(activeChord, passiveChord) {
    Helpers.assert(
      activeChord.quality != null
      && activeChord.root != null
      && passiveChord.quality != null
      && passiveChord.root != null
      , activeChord);
    const interval=Intervals.romans[Common.modulo12(activeChord.root - passiveChord.root)];
    const quickString=`${passiveChord.quality} ${interval} ${activeChord.quality}`;
    return quickString; 


  }

</script>

<style scoped>
  .passive, .active {
    height: 1.66rem;
    width: 1.66rem;
    border-radius: 5px;    
    padding: 5px;
    color: white;
  }

  .passive {
    background-color: var(--color-passive);
  }

  .active {
    background-color: var(--color-active);
  }

  .analyzer {
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    font-weight: bold;

  }

  .cr-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: sans-serif;
    width: 30rem;

  }

  .cr-container span {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    vertical-align: middle;
  }

  .cr {
    font-size: 4rem;
    height: 2rem;

  }

  .separator:before {
    content: "·";
  }

</style>