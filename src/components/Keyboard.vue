<template>
  <div class="keyboard">
    <div
      v-for="(slot, idx) in slots"
      :key="slot.lower"
      class="white-slot"
    >
      <Key
        :note="slot.lower.note"
        :midi="slot.lower.midi"
        :frequency="slot.lower.frequency"
        :is-upper="false"
        :is-black="false"
        :is-active="store.performance.active.notes[slot.lower.midi]"
        :is-passive="store.performance.passive.notes[slot.lower.midi]"
        @press="onPress"
        @release="onRelease"
      />

      <Key
        v-if="slot.upper"
        :note="slot.upper.note"
        :midi="slot.upper.midi"
        :frequency="slot.upper.frequency"
        :is-upper="true"
        :is-black="true"
        :is-active="store.performance.active.notes[slot.upper.midi]"
        :is-passive="store.performance.passive.notes[slot.upper.midi]"
        class="upper-overlay"
        @press="onPress"
        @release="onRelease"
      />
    </div>
  </div>
</template>



<script setup>

import { computed } from 'vue';
import { useStore } from '../store';

import Key from './key.vue'; 

import keymap from '../config/keymap.js';
import keyboardPatterns from '../config/keyboardPatterns.js';

import Convert from '../utils/Convert.js';

const store = useStore();

const props = defineProps({
  startOctave: { type: Number, default: 3 },
  octaves: { type: Number, default: 2 },
  layout: { type: String, default: 'x66'},
  id: {type: String, default: 'something'},
})

store.instruments[props.id]={
  layout: props.layout,
}

console.log(props);

const layout= computed(()=> store.instruments[props.id].layout);
console.log(layout);

const pattern = computed (()=> keyboardPatterns[layout.value]);
const midiToKey = computed (()=> keymap[layout.value]) ;

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

      const wMidi=octaveMidi+offset;
      const lower = { 
        note: `${pattern.value[i].w}${octave}`, 
        midi: wMidi,
        frequency: Convert.midiToHz(wMidi),
      };
      offset++;

      let upper=null;
      if (pattern.value[i].b){
        const bMidi=octaveMidi+offset;
        upper = { 
          note: `${pattern.value[i].b}${octave}`,
          midi: bMidi,
          frequency: Convert.midiToHz(bMidi),
        }
        offset++
      }

      slots.push({ lower, upper });
    }
  }

  //final white key to close the pattern

  const octaveEndMidi= 12 * (octaveEnd +1);
  const last= `${pattern.value[0].w}${octaveEnd}`;

  slots.push({
    lower: {
      note: last, 
      midi: octaveEndMidi,
      frequency: Convert.midiToHz(octaveEndMidi),
    }, 
    upper: null});

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

.keyboard {
  --dark: #222 ;
  display: flex;
  position: relative;
  user-select: none;
  padding: 8px;
  background: var(--dark);
  border-radius: 8px;
  width: fit-content;
}

.white-slot {
  position: relative;
  display: inline-block;
  width: fit-content;
}

.upper-overlay :deep(.key-upper) {
}

.white-slot :deep(.piano-key) {
  vertical-align: top;
}

</style>
