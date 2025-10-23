<template>
    <div class="midi-console">
      <button @click="handleConnect" :disabled="midiStore.isConnected || !midiStore.isWebMidiSupported">
        {{ midiStore.isWebMidiSupported ? (midiStore.isConnected ? 'MIDI Connected' : 'Enable MIDI') : 'Web MIDI not supported' }}
      </button>

      <select
        v-model="midiStore.selectedId"
        @change="handleDeviceSelect"
        :disabled="!midiStore.isConnected || midiStore.inputs.length === 0"
        aria-label="MIDI input device"
      >
        <option v-if="midiStore.inputs.length === 0" disabled value="">No MIDI inputs</option>
        <option v-for="i in midiStore.inputs" :key="i.id" :value="i.id">
          {{ i.name }} ({{ i.manufacturer || 'Unknown' }})
        </option>
      </select>
    </div>
</template>

<script setup>
// Vue imports
import { onBeforeUnmount } from 'vue'

// Store imports
import { useStores } from '../store/index.js'

// Store usage
const stores = useStores()
const midiStore = stores.midi

async function handleConnect() {
  const result = await stores.actions.connectMIDI.execute();
  if (result.success) {
    // Refresh devices after successful connection
    stores.actions.refreshMIDIDevices.execute();
  }
}

function handleDeviceSelect() {
  stores.actions.selectMIDIDevice.execute({ deviceId: midiStore.selectedId });
}

onBeforeUnmount(() => {
  if (midiStore.input) midiStore.input.onmidimessage = null;
  if (midiStore.access) midiStore.access.onstatechange = null;
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
