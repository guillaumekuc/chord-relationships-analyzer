<template>
  <div
    :class="[
      'piano-key',
      {
        'key-lower': !props.isUpper,
        'key-upper': props.isUpper,
        'key-white': !props.isBlack,
        'key-black': props.isBlack,
        'key-active': props.isActive,
        'key-passive': props.isPassive
      }
    ]"
    @pointerdown.prevent="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
    @pointerleave="onPointerLeave"
  >
    <span
      :class="{ hidden: !instrumentsStore.getInstrument(props.parent).display.keyboardLabels }"
      class="keyboard-mapping-label"
    >
      {{ props.keyboard }}
    </span>
    <span
      :class="{ hidden: !instrumentsStore.getInstrument(props.parent).display.noteLabels }"
      class="note-label"
    >
      {{ props.note }}
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStores } from '../store/index.js'

const props = defineProps({
  note: { type: String, required: true },
  midi: { type: Number, required: true },
  keyboard: { type: String },
  isUpper: { type: Boolean, default: false, required: true },
  isBlack: { type: Boolean, default: false, required: true },
  isActive: { type: Boolean, default: false },
  isPassive: { type: Boolean, default: false },
  parent: { type: String, required: true }
})

const stores = useStores()
const performanceStore = stores.performance
const instrumentsStore = stores.instruments

const pressed = ref(false)
let activePointerId = null

function onPointerDown(e) {
  if (e.button !== undefined && e.button !== 0) return

  activePointerId = e.pointerId
  pressed.value = true
  e.currentTarget.setPointerCapture(e.pointerId)
  stores.actions.pressNote.execute(props.midi)
}

function onPointerUp(e) {
  if (e.pointerId !== activePointerId || !pressed.value) return

  pressed.value = false
  activePointerId = null
  try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}
  stores.actions.releaseNote.execute(props.midi)
}

function onPointerCancel(e) {
  if (e.pointerId !== activePointerId) return

  if (pressed.value) stores.actions.releaseNote.execute(props.midi)
  pressed.value = false
  activePointerId = null
  try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}
}

function onPointerLeave() {
  // No action needed - pointerup will be captured
}
</script>

  <style scoped>
  .hidden {
    display: none !important;
  }

  .piano-key {
    display: inline-block;
    width: var(--key-width);
    height: var(--key-height);
    margin: 0 var(--key-margin);
    background: var(--color-light);
    border-radius: 0 0 5px 5px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    cursor: pointer;

    /* Important for touch/gesture correctness */
    touch-action: none;   /* prevent scroll/zoom gestures from stealing pointer */
    user-select: none;    /* avoid accidental text selection on desktop */
  }

  .piano-key.key-passive {
    background: var(--color-passive) !important;
  }

  .piano-key.key-active {
    background: var(--color-active) !important;
  }

  .piano-key:hover {
    background: var(--color-hover) !important;
  }

  .key-upper {
    width: var(--upper-key-width);
    height: var(--upper-key-height);
    position: absolute;
    left: var(--upper-key-offset);
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
