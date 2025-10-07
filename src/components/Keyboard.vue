<template>
  <div class="Keyboard-container">
  <KeyboardInspector
    :parent="props.id"
  />
  <div class="keyboard">

    <div
      v-for="(slot, idx) in slots"
      class="slot"
    >
      <Key
        :note="slot.lower.note"
        :keyboard="slot.lower.keyboard"
        :midi="slot.lower.midi"
        :frequency="slot.lower.frequency"
        :is-upper="false"
        :is-black="slot.lower.color==='b' ? true : false"
        :is-active="store.performance.active.notes[slot.lower.midi]"
        :is-passive="store.performance.passive.notes[slot.lower.midi]"
        :parent="props.id"
        @press="onPress"
        @release="onRelease"
      />

      <Key
        v-if="slot.upper"
        :note="slot.upper.note"
        :keyboard="slot.upper.keyboard"
        :midi="slot.upper.midi"
        :frequency="slot.upper.frequency"
        :is-upper="true"
        :is-black="slot.upper.color==='b' ? true : false"
        :is-active="store.performance.active.notes[slot.upper.midi]"
        :is-passive="store.performance.passive.notes[slot.upper.midi]"
        :parent="props.id"
        class="upper-overlay"
        @press="onPress"
        @release="onRelease"
      />
    </div>
  </div>
  </div>
</template>



<script setup>

import { computed } from 'vue';
import { useStore } from '../store';

import Key from './Key.vue'; 
import KeyboardInspector from './KeyboardInspector.vue';

import keymap from '../config/keymap.js';
import keyboardRowPatterns from '../config/keyboardRowPatterns.js';
import keyboardColorPatterns from '../config/keyboardColorPatterns.js';

import Convert from '../utils/Convert.js';

const store = useStore();

const props = defineProps({
  startOctave: { type: Number, default: 3 },
  octaves: { type: Number, default: 2 },
  layout: { type: String, default: 'x66'},
  colors: {type: String, default: 'x75'},
  id: {type: String, default: 'something'},
  displayNoteLabels: {type: Boolean, default: true},
  displayKeyboardLabels: {type: Boolean, default: false},
})

store.instruments[props.id]={
  layout: props.layout,
  colors: props.colors,
  display: {
    noteLabels: props.displayNoteLabels,
    keyboardLabels: props.displayKeyboardLabels,
  }
}

console.log(props);

const layout= computed(()=> store.instruments[props.id].layout);
const colors= computed(()=> store.instruments[props.id].colors);
console.log("colors:", colors);

const pattern = computed (()=> keyboardRowPatterns[layout.value]);
const colorPattern= computed(()=> keyboardColorPatterns[colors.value]); //@WIP
console.log("colorPattern:", colorPattern);
const midiToKey = computed (()=> keymap[store.config.keymap]) ;

const emit = defineEmits(['press', 'release']); //bubble-up


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
        midi: lMidi,
        frequency: Convert.midiToHz(lMidi),
        color: colorPattern.value[offset],
        keyboard: midiToKey.value[lMidi],

      };


      offset++;


      let upper=null;
      if (pattern.value[i].u){
        const uMidi=octaveMidi+offset;
        upper = { 
          note: `${pattern.value[i].u}${octave}`,
          midi: uMidi,
          frequency: Convert.midiToHz(uMidi),
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
      frequency: Convert.midiToHz(octaveEndMidi),
    }, 
    upper: null});

  console.log(slots);
  return slots
})


function onPress(midi) {

  store.player.PressNote(midi);
  emit('press', midi);
}

function onRelease(midi) {
  store.player.ReleaseNote(midi);
  emit('release', midi);
}

</script>

<style scoped>

.Keyboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
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
