<template>
  <section class="keyboard-container">
    <KeyboardInspector
      :parent="props.id"
    />
    <div class="keyboard">

      <div
        v-for="(slot, idx) in slots"
        :key="`slot-${idx}-${slot.lower.midi}`"
        class="slot"
      >
        <Key
          :note="slot.lower.note"
          :keyboard="slot.lower.keyboard"
          :midi="slot.lower.midi"
          :is-upper="false"
          :is-black="slot.lower.color==='b' ? true : false"
          :is-active="performanceStore.active.notes.has(slot.lower.midi)"
          :is-passive="performanceStore.passive.notes.has(slot.lower.midi)"
          :parent="props.id"
        />

        <Key
          v-if="slot.upper"
          :note="slot.upper.note"
          :keyboard="slot.upper.keyboard"
          :midi="slot.upper.midi"
          :is-upper="true"
          :is-black="slot.upper.color==='b' ? true : false"
          :is-active="performanceStore.active.notes.has(slot.upper.midi)"
          :is-passive="performanceStore.passive.notes.has(slot.upper.midi)"
          :parent="props.id"
          class="upper-overlay"
        />
      </div>
    </div>
  </section>
</template>



<script setup>
  import { computed } from 'vue'
  import usePerformanceStore from '../store/modules/performance.js'
  import useConfigStore from '../store/modules/config.js'
  import useInstrumentsStore from '../store/modules/instruments.js'
  import Key from './Key.vue'
  import KeyboardInspector from './KeyboardInspector.vue'
  import keymap from '../config/keymap.js'
  import keyboardRowPatterns from '../config/keyboardRowPatterns.js'
  import keyboardColorPatterns from '../config/keyboardColorPatterns.js'
  import generateKeyboardSlots from '../utils/keyboardLayout.js'

  const props = defineProps({
    startOctave: { type: Number, default: 3 },
    octaves: { type: Number, default: 2 },
    layout: { type: String, default: 'x66'},
    colors: {type: String, default: 'x75'},
    id: {type: String, default: 'something'},
    displayNoteLabels: {type: Boolean, default: true},
    displayKeyboardLabels: {type: Boolean, default: false},
  })

  const performanceStore = usePerformanceStore()
  const configStore = useConfigStore()
  const instrumentsStore = useInstrumentsStore()

  instrumentsStore.setInstrument(props.id, {
    layout: props.layout,
    colors: props.colors,
    display: {
      noteLabels: props.displayNoteLabels,
      keyboardLabels: props.displayKeyboardLabels,
    }
  })

  const pattern = computed(() => keyboardRowPatterns[instrumentsStore.getInstrument(props.id).layout])
  const colorPattern = computed(() => keyboardColorPatterns[instrumentsStore.getInstrument(props.id).colors])
  const midiToKey = computed(() => keymap[configStore.keymap])

  const slots = computed(() => {
    return generateKeyboardSlots(
      configStore.octaveStart,
      configStore.octaveEnd,
      pattern.value,
      colorPattern.value,
      midiToKey.value
    )
  })
</script>

<style scoped>

.keyboard-container {
  margin-left:auto;
  margin-right:auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  width: fit-content;
}

.keyboard {

  display: flex;
  position: relative;
  user-select: none;
  padding: 8px;
  background: var(--color-dark);
  border-radius: 8px;
  width: fit-content;
}

.slot {
  position: relative;
  display: inline-block;
  width: fit-content;
}



</style>
