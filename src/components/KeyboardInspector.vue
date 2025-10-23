<template>
  <section class="KeyboardInspector">
    <span>Layout: <button @click="cycleLayouts">{{stores.instruments.getInstrument(props.parent).layout}}</button></span>
    <span>Colors: <button @click="cycleColors">{{stores.instruments.getInstrument(props.parent).colors}}</button></span>
    <span><button @click="stores.instruments.getInstrument(props.parent).display.keyboardLabels= !stores.instruments.getInstrument(props.parent).display.keyboardLabels"> Keyboard Labels</button></span>
    <span><button @click="stores.instruments.getInstrument(props.parent).display.noteLabels= !stores.instruments.getInstrument(props.parent).display.noteLabels"> Note Labels</button></span>
  </section>
</template>


<style scoped>
  .KeyboardInspector {
    height: fit-content;
    width:100%;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    margin-bottom: 0.5rem;
  }

  span{
    margin-left: 0.5rem;
  }




</style>

<script setup>
// Internal imports
import { useStores } from '../store'

// Config imports
import keyboardColorPatterns from "../config/keyboardColorPatterns.js"
import keyboardRowPatterns from "../config/keyboardRowPatterns.js"

// Props definition
const props = defineProps({
  parent: {type: String, required: true},
})

// Store usage
const stores = useStores()

// Methods
function cycleColors() {
    const instrument = stores.instruments.getInstrument(props.parent);
    const colors = instrument.colors;
    const allColors=Object.keys(keyboardColorPatterns);
    if (allColors.includes(colors)){
      const index=allColors.indexOf(colors);
      const nextIndex = (index + 1) % allColors.length;
      instrument.colors = allColors[nextIndex];
    } else {
      instrument.colors = allColors[0];
    }
  }

  function cycleLayouts() {
    const instrument = stores.instruments.getInstrument(props.parent);
    const layout = instrument.layout;
    const allLayouts=Object.keys(keyboardRowPatterns);
    if (allLayouts.includes(layout)){
      const index=allLayouts.indexOf(layout);
      const nextIndex = (index + 1) % allLayouts.length;
      instrument.layout = allLayouts[nextIndex];
    } else {
      instrument.layout = allLayouts[0];
    }
    
  }

</script>