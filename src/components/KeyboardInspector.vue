<template>
  <section class="keyboard-inspector">
    <span>Layout: <button @click="cycleLayouts">{{ currentLayout }}</button></span>
    <span>Colors: <button @click="cycleColors">{{ currentColors }}</button></span>
    <span><button @click="toggleKeyboardLabels"> Keyboard Labels</button></span>
    <span><button @click="toggleNoteLabels"> Note Labels</button></span>
  </section>
</template>


<style scoped>
  .keyboard-inspector {
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
// Vue imports
import { computed } from 'vue'

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

// Computed properties for derived states
const instrument = computed(() => stores.instruments.getInstrument(props.parent))
const currentLayout = computed(() => instrument.value.layout)
const currentColors = computed(() => instrument.value.colors)
const showKeyboardLabels = computed(() => instrument.value.display.keyboardLabels)
const showNoteLabels = computed(() => instrument.value.display.noteLabels)

// Methods
function cycleColors() {
    const colors = instrument.value.colors;
    const allColors = Object.keys(keyboardColorPatterns);
    if (allColors.includes(colors)) {
      const index = allColors.indexOf(colors);
      const nextIndex = (index + 1) % allColors.length;
      instrument.value.colors = allColors[nextIndex];
    } else {
      instrument.value.colors = allColors[0];
    }
  }

  function cycleLayouts() {
    const layout = instrument.value.layout;
    const allLayouts = Object.keys(keyboardRowPatterns);
    if (allLayouts.includes(layout)) {
      const index = allLayouts.indexOf(layout);
      const nextIndex = (index + 1) % allLayouts.length;
      instrument.value.layout = allLayouts[nextIndex];
    } else {
      instrument.value.layout = allLayouts[0];
    }
    
  }

  function toggleKeyboardLabels() {
    instrument.value.display.keyboardLabels = !instrument.value.display.keyboardLabels;
  }

  function toggleNoteLabels() {
    instrument.value.display.noteLabels = !instrument.value.display.noteLabels;
  }

</script>