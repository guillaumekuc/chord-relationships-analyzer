<template>


  <div class="analyzer">
  
    <h1>ANALYZER</h1>
    <span>{{testConst}}</span>

  </div>
</template>

<script setup>

  import { useStore } from '../store';
  import { computed } from 'vue';
  import Triads from "../theory/Triads.js";
  import Notes from "../theory/Notes.js";
  import * as Common from "../theory/common.js";

  const store = useStore();

  const triad = computed(() => Object.entries(store.performance.activeNotes).length === 3);
  const triadTypes=Triads.types;
  const testConst= computed(()=> test(store.performance.activeNotes))


  function test(activeNotes) {
    let root=undefined;
    let quality=undefined;
    let string=undefined;

    //Get Pich Classes from notes using modulo 12 operations
    const activePCs= Object.keys(activeNotes).map(note => Common.modulo12(note));

    //check each inversion of the chord against known Triads types
    for (let i=0; i<activePCs.length; i++){ 
      const rootPC=activePCs[i];
      const normalized=activePCs.map(PC => Common.modulo12(PC-rootPC));

      // Sort ascending
      normalized.sort((a, b) => a - b);

      Object.keys(Triads.types).some(type => {
        if (arraysEqual(Triads.types[type].pitchClasses, normalized)) {
          console.log('match');
          
          root = Notes.fromPitchClass(activePCs[i]);
          quality = type;

          return true;
        }
        return false;
      });
    }


    if (root === undefined || quality === undefined){
      string = "—";
    } else {
      string = root + Triads.types[quality].symbol;
    }

    return string
  }


  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, index) => val === arr2[index]);
  }

</script>

<style>
  .analyzer {
    display:flex;
    text-align: center;
    flex-direction:column;
    justify-content: center;
    font-weight: bold;
  }



</style>