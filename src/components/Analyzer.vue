<template>


  <div class="analyzer">
  
    <h1>ANALYZER</h1>
    <span>{{store.performance.active?.cr ?? "—"}}</span>
    <span>{{store.performance.active.chord?.name ?? "—"}}</span>
    <span>({{store.performance.passive.chord?.name ?? "—"}})</span>

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
  .analyzer {
    display:flex;
    text-align: center;
    flex-direction:column;
    justify-content: center;
    font-weight: bold;
  }



</style>