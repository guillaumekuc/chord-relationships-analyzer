<template>
  <section class="keyboard-inspector">
    <span>Layout: <button @click="cycleLayouts">{{ instrumentsStore.getInstrument(parent).layout }}</button></span>
    <span>Colors: <button @click="cycleColors">{{ instrumentsStore.getInstrument(parent).colors }}</button></span>
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
import { useInstrumentsStore } from '../store/modules/instruments.js'
import keyboardColorPatterns from "../config/keyboardColorPatterns.js"
import keyboardRowPatterns from "../config/keyboardRowPatterns.js"

const props = defineProps({
  parent: {type: String, required: true},
})

const instrumentsStore = useInstrumentsStore()

function cycleColors() {
  const instrument = instrumentsStore.getInstrument(props.parent)
  const colors = instrument.colors
  const allColors = Object.keys(keyboardColorPatterns)
  if (allColors.includes(colors)) {
    const index = allColors.indexOf(colors)
    const nextIndex = (index + 1) % allColors.length
    instrument.colors = allColors[nextIndex]
  } else {
    instrument.colors = allColors[0]
  }
}

function cycleLayouts() {
  const instrument = instrumentsStore.getInstrument(props.parent)
  const layout = instrument.layout
  const allLayouts = Object.keys(keyboardRowPatterns)
  if (allLayouts.includes(layout)) {
    const index = allLayouts.indexOf(layout)
    const nextIndex = (index + 1) % allLayouts.length
    instrument.layout = allLayouts[nextIndex]
  } else {
    instrument.layout = allLayouts[0]
  }
}

function toggleKeyboardLabels() {
  const instrument = instrumentsStore.getInstrument(props.parent)
  instrument.display.keyboardLabels = !instrument.display.keyboardLabels
}

function toggleNoteLabels() {
  const instrument = instrumentsStore.getInstrument(props.parent)
  instrument.display.noteLabels = !instrument.display.noteLabels
}
</script>