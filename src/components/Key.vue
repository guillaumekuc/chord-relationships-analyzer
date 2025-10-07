<template>
  <div
    :class="['piano-key', {'key-lower': !key.isUpper, 'key-upper': key.isUpper, 'key-white': !key.isBlack, 'key-black': key.isBlack, 'key-active': key.isActive, 'key-passive': key.isPassive}]"
    @mousedown="onPress"
    @mouseup="onRelease"
    @mouseleave="onRelease"
    @touchstart.prevent="onPress"
    @touchend.prevent="onRelease"
  >
    <span :class="{ hidden: !store.instruments[key.parent].display.keyboardLabels }" class="keyboard-mapping-label">{{ key.keyboard }}</span>
    <span :class="{ hidden: !store.instruments[key.parent].display.noteLabels }" class="note-label">{{ key.note }}</span>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue';
import { useStore } from '../store';
const store = useStore();

// Props
const key = defineProps({
  note: { type: String, required: true },
  midi: { type: Number, required: true},
  keyboard: { type: String},
  frequency: {type: Number, required: true},
  isUpper: { type: Boolean, default: false, required:true },
  isBlack: { type: Boolean, default: false, required:true},
  isActive: { type: Boolean, default: false },
  isPassive: { type: Boolean, default: false},
  parent: {type: String, required: true},
});

console.log(key);

// Bubble-up
const emit = defineEmits(['press', 'release']);

function onPress() {
  	emit('press', key.midi);
}

function onRelease() {
  	emit('release', key.midi);
}



</script>

<style scoped>

.hidden {
  display: none !important;
}

.piano-key {

  display: inline-block;
  width: 40px; /* total= 44px w/ margins */
  height: 160px;
  margin: 0 2px; 
  background: var(--color-light);
  border-radius: 0 0 5px 5px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.piano-key.key-passive {
  background: var(--color-passive) !important; 
}

.piano-key.key-active {
  background: var(--color-active) !important; 
}

.piano-key:hover{
	background: var(--color-hover) !important;
}

.key-upper {
  width: 26px;
  height: 100px;
  position: absolute;
  left: 29px; /* (lower key width + margins/2) - (upper key width / 2) = 42 - 13 = 29px*/
  z-index: 2;
}

.key-black {
 	background: var(--color-darker);
}


.note-label {
	position: absolute; 
	bottom: 6px; 
	left: 50%; 
	transform: translateX(-50%); 
	font-size: 10px;	
}

.key-white .note-label { 
	color: var(--color-dark); 
}

.key-black .note-label  { 
	color: var(--color-light);
}

.key-upper {
 border: 3px solid var(--color-dark);
 border-radius: 0 0 7px 7px;
 border-top: 0;
}

.keyboard-mapping-label {
  position: absolute; 
  bottom: calc(6px + 1rem); 
  left: 50%; 
  transform: translateX(-50%); 
  font-size: 10px;  
  opacity: 0.5;
}

.key-white .keyboard-mapping-label { 
  color: var(--color-dark); 
}

.key-black .keyboard-mapping-label  { 
  color: var(--color-light);
}
</style>
