<template>
  <div
    :class="[
      'piano-key',
      {
        'key-lower': !key.isUpper,
        'key-upper': key.isUpper,
        'key-white': !key.isBlack,
        'key-black': key.isBlack,
        'key-active': key.isActive,
        'key-passive': key.isPassive
      }
    ]"
    @pointerdown.prevent="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
    @pointerleave="onPointerLeave"
  >
    <span
      :class="{ hidden: !store.instruments[key.parent].display.keyboardLabels }"
      class="keyboard-mapping-label"
    >
      {{ key.keyboard }}
    </span>
    <span
      :class="{ hidden: !store.instruments[key.parent].display.noteLabels }"
      class="note-label"
    >
      {{ key.note }}
    </span>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useStore } from '../store'
  const store = useStore()

  // Props
  const key = defineProps({
    note: { type: String, required: true },
    midi: { type: Number, required: true },
    keyboard: { type: String },
    frequency: { type: Number, required: true },
    isUpper: { type: Boolean, default: false, required: true },
    isBlack: { type: Boolean, default: false, required: true },
    isActive: { type: Boolean, default: false },
    isPassive: { type: Boolean, default: false },
    parent: { type: String, required: true }
  })

  // Bubble-up
  const emit = defineEmits(['press', 'release'])

  // Press state
  const pressed = ref(false)
  let activePointerId = null

  function onPointerDown(e) {
    // If it's a mouse, only accept left button (0). Touch/pen don't set button.
    if (e.button !== undefined && e.button !== 0) return

    activePointerId = e.pointerId;
    pressed.value = true;

    // Capture ensures we get the corresponding pointerup/cancel even if the
    // pointer leaves the element.
    e.currentTarget.setPointerCapture(e.pointerId);

    emit('press', key.midi)
  }

  function onPointerUp(e) {
    if (e.pointerId !== activePointerId) { return };
    if (!pressed.value) { return };

    pressed.value = false;
    activePointerId = null;
    // Release capture after we’re done
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}

    emit('release', key.midi)
  }

  function onPointerCancel(e) {
    if (e.pointerId !== activePointerId) return

    // Treat cancel as a release to avoid stuck notes
    if (pressed.value) emit('release', key.midi)

    pressed.value = false
    activePointerId = null
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}
  }

  function onPointerLeave() {
    // Optional: do nothing. We still receive pointerup thanks to capture.
    // If you want hover/visual feedback, you can manage it here,
    // but do not emit 'release' here.
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
