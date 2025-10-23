<template>
    <div class="midi-console">
      <button @click="connect" :disabled="isConnected || !isWebMidi">
        {{ isWebMidi ? (isConnected ? 'MIDI Connected' : 'Enable MIDI') : 'Web MIDI not supported' }}
      </button>

      <select
        v-model="selectedId"
        @change="bindSelected"
        :disabled="!isConnected || inputs.length === 0"
        aria-label="MIDI input device"
      >
        <option v-if="inputs.length === 0" disabled value="">No MIDI inputs</option>
        <option v-for="i in inputs" :key="i.id" :value="i.id">
          {{ i.name }} ({{ i.manufacturer || 'Unknown' }})
        </option>
      </select>
    </div>
</template>

<script setup>
// Vue imports
import { ref, onBeforeUnmount } from 'vue'

// Internal imports
import { useStore } from '../store'

// Store usage
const store = useStore()

// Reactive data
const isWebMidi = typeof navigator !== 'undefined' && 'requestMIDIAccess' in navigator
const isConnected = ref(false)
const access = ref(null)
const input = ref(null)
const inputs = ref([])        // [{ id, name, manufacturer }]
const selectedId = ref('')

  async function connect() {
    if (!isWebMidi || isConnected.value) return;

    try {
      access.value = await navigator.requestMIDIAccess({ sysex: false });
      isConnected.value = true;

      refreshInputs();
      access.value.onstatechange = refreshInputs; // hot-plug updates
    } catch (e) {
      console.error('Failed to get MIDI access:', String(e));
    }
  }

  function refreshInputs() {
    if (!access.value) return;

    inputs.value = Array.from(access.value.inputs.values()).map(i => ({
      id: i.id,
      name: i.name,
      manufacturer: i.manufacturer
    }));

    if (!inputs.value.find(i => i.id === selectedId.value)) {
      selectedId.value = inputs.value[0]?.id || '';
    }

    bindSelected();
  }

  function bindSelected() {
    if (!access.value) return;

    if (input.value) input.value.onmidimessage = null;

    input.value = selectedId.value ? access.value.inputs.get(selectedId.value) : null;

    if (input.value) {
      input.value.onmidimessage = onMessage;
    }
  }

  function onMessage(e) {
    const [status, data1 = 0, data2 = 0] = e.data;
    const type = status & 0xf0;
    const channel = (status & 0x0f) + 1;

    if (type === 0x90) {
      if (data2 === 0) {
        // Note Off
        store.player.ReleaseNote(data1);
      } else {
        // Note On
        store.player.PressNote(data1);
      }
    } else if (type === 0x80) {
      // Note Off
      store.player.ReleaseNote(data1);
    }
  }

  onBeforeUnmount(() => {
    if (input.value) input.value.onmidimessage = null;
    if (access.value) access.value.onstatechange = null;
  });
</script>

<style scoped>

  button {
    display: inline-block;
    white-space: nowrap;

  }

  select {
    margin-bottom: 0px;
  }


  .midi-console { 
    display: flex;
    gap: 0.5rem;
    width: 600px;
    margin-bottom: var(--pico-spacing);
  }



  button:disabled { opacity: .6; cursor: not-allowed; }


</style>
