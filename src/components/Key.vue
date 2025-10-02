<template>
  <div
    :class="['piano-key', {'key-lower': !key.isUpper, 'key-upper': key.isUpper, 'key-white': !key.isBlack, 'key-black': key.isBlack, 'key-active': key.isActive, 'key-passive': key.isPassive}]"
    @mousedown="onPress"
    @mouseup="onRelease"
    @mouseleave="onRelease"
    @touchstart.prevent="onPress"
    @touchend.prevent="onRelease"
  >
    <span class="note-label">{{ key.note }}</span>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue';

// Props
const key = defineProps({
  note: { type: String, required: true },
  midi: { type: Number, required: true},
  frequency: {type: Number, required: true},
  isUpper: { type: Boolean, default: false, required:true },
  isBlack: { type: Boolean, default: false, required:true},
  isActive: { type: Boolean, default: false },
  isPassive: { type: Boolean, default: false}
});

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
.piano-key {
 /* color vars */
 --dark: #222;
 --light: #fff;
 --hover: #ffd700;
 --active: #f90;
 --passive: #9f9f9f;

  display: inline-block;
  width: 40px; /* total= 44px w/ margins */
  height: 160px;
  margin: 0 2px; 
  background: var(--light);
  border-radius: 0 0 5px 5px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.piano-key:hover{
	background: var(--hover) !important;
}

.key-upper {
  width: 26px;
  height: 100px;
  position: absolute;
  left: 29px; /* (lower key width + margins/2) - (upper key width / 2) = 42 - 13 = 29px*/
  z-index: 2;
}

.key-black {
 	background: var(--dark);
}

.piano-key.key-active {
  background: var(--active) !important; 
}

.piano-key.key-passive {
  background: var(--passive) !important; 
}

.note-label {
	position: absolute; 
	bottom: 6px; 
	left: 50%; 
	transform: translateX(-50%); 
	font-size: 10px;	
}

.key-white .note-label { 
	color: var(--dark); 
}

.key-black .note-label { 
	color: var(--light);
}
</style>
