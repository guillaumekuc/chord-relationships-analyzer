<template>
  <section class="keyboard-inspector">
    <span>Layout: <button @click="stores.actions.cycleKeyboardLayout.execute({ parent })">{{ instrumentsStore.getInstrument(parent).layout }}</button></span>
    <span>Colors: <button @click="stores.actions.cycleKeyboardColors.execute({ parent })">{{ instrumentsStore.getInstrument(parent).colors }}</button></span>
    <span><button @click="stores.actions.toggleKeyboardLabels.execute({ parent })"> Keyboard Labels</button></span>
    <span><button @click="stores.actions.toggleNoteLabels.execute({ parent })"> Note Labels</button></span>
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
import { useStores } from '../store/index.js'

const props = defineProps({
  parent: {type: String, required: true},
})

const stores = useStores()
const instrumentsStore = stores.instruments
</script>