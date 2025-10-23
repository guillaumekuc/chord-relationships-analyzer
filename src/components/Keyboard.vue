<template>
  <section class="Keyboard-container">
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
          :is-active="store.performance.active.notes.has(slot.lower.midi)"
          :is-passive="store.performance.passive.notes.has(slot.lower.midi)"
          :parent="props.id"
        />

        <Key
          v-if="slot.upper"
          :note="slot.upper.note"
          :keyboard="slot.upper.keyboard"
          :midi="slot.upper.midi"
          :is-upper="true"
          :is-black="slot.upper.color==='b' ? true : false"
          :is-active="store.performance.active.notes.has(slot.upper.midi)"
          :is-passive="store.performance.passive.notes.has(slot.upper.midi)"
          :parent="props.id"
          class="upper-overlay"
        />
      </div>
    </div>
  </section>
</template>



<script setup>
// Vue imports
import { computed } from 'vue'

// Internal imports
import { useStore } from '../store'
import Key from './Key.vue'
import KeyboardInspector from './KeyboardInspector.vue'

// Config imports
import keymap from '../config/keymap.js'
import keyboardRowPatterns from '../config/keyboardRowPatterns.js'
import keyboardColorPatterns from '../config/keyboardColorPatterns.js'


// Props definition
const props = defineProps({
  startOctave: { type: Number, default: 3 },
  octaves: { type: Number, default: 2 },
  layout: { type: String, default: 'x66'},
  colors: {type: String, default: 'x75'},
  id: {type: String, default: 'something'},
  displayNoteLabels: {type: Boolean, default: true},
  displayKeyboardLabels: {type: Boolean, default: false},
})


// Store usage
const store = useStore()

// Initialize instrument in store
store.instruments[props.id] = {
  layout: props.layout,
  colors: props.colors,
  display: {
    noteLabels: props.displayNoteLabels,
    keyboardLabels: props.displayKeyboardLabels,
  }
}

// Computed properties
const layout = computed(() => store.instruments[props.id].layout)
const colors = computed(() => store.instruments[props.id].colors)
const pattern = computed(() => keyboardRowPatterns[layout.value])
const colorPattern = computed(() => keyboardColorPatterns[colors.value])
const midiToKey = computed(() => keymap[store.config.keymap])


// Build slots (each slot renders a white key + a black key on top)
// 6-6 Keyboard pattern, isomorphic layout.
const slots = computed(() => {
  const slots = [];
  const octaveStart= store.config.octaveStart;
  const octaveEnd=store.config.octaveEnd;

  const octaves= octaveEnd - octaveStart;
  if (!octaves>0){ console.error('invalid range'); return;}

  for (let o = 0; o < octaves; o++) {
    const octave = octaveStart + o;

    let offset = 0;
    for (let i = 0; i < pattern.value.length; i++) {

      const octaveMidi = 12 * (octaveStart + o + 1); //C0 => 0, C4 => 12 * (4 + 1) = 60

      const lMidi=octaveMidi+offset;
      const lower = { 
        note: `${pattern.value[i].l}${octave}`, 
        midi: Number(lMidi),
        color: colorPattern.value[offset],
        keyboard: midiToKey.value[lMidi],
      };


      offset++;


      let upper=null;
      if (pattern.value[i].u){
        const uMidi=octaveMidi+offset;
        upper = { 
          note: `${pattern.value[i].u}${octave}`,
          midi: Number(uMidi),
          color: colorPattern.value[offset],
          keyboard: midiToKey.value[uMidi],
        }
        offset++
      }

      slots.push({ lower, upper });
    }
  }

  //final white key to close the pattern

  const octaveEndMidi= 12 * (octaveEnd +1);
  const last= `${pattern.value[0].l}${octaveEnd}`;

  slots.push({
    lower: {
      note: last, 
      midi: octaveEndMidi,
    }, 
    upper: null});

  return slots
})



</script>

<style scoped>

.Keyboard-container {
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
