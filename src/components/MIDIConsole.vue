<template>
  <div class="midi-console">
    <div class="controls">
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

    
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useStore } from '../store';
const store = useStore();


const isWebMidi = typeof navigator !== 'undefined' && 'requestMIDIAccess' in navigator;
const isConnected = ref(false);
const log = ref('');
const access = ref(null);
const input = ref(null);
const inputs = ref([]);        // [{ id, name, manufacturer }]
const selectedId = ref('');

function write(...parts) {
  log.value += parts.join(' ') + '\n';
}   

async function connect() {
  if (!isWebMidi || isConnected.value) return;

  try {
    access.value = await navigator.requestMIDIAccess({ sysex: false });
    isConnected.value = true;
    write('MIDI ready');

    refreshInputs();
    access.value.onstatechange = refreshInputs; // hot-plug updates
  } catch (e) {
    write('Failed to get MIDI access:', String(e));
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
    write(`Listening on: ${input.value.name || 'Unknown device'}`);
  } else {
    write('No input selected.');
  }
}

function onMessage(e) {
  const [status, data1 = 0, data2 = 0] = e.data;
  const type = status & 0xf0;
  const channel = (status & 0x0f) + 1;

  if (type === 0x90) {
    if (data2 === 0) write(`Note Off  ch=${channel} note=${data1}`);
    else write(`Note On   ch=${channel} note=${data1} vel=${data2}`);
    console.log(store);
    store.player.PressNote(data1);
  } else if (type === 0x80) {
    write(`Note Off  ch=${channel} note=${data1} vel=${data2}`);
  } else {
    write(`MIDI ${e.data.join(',')}`);
  }
}

onBeforeUnmount(() => {
  if (input.value) input.value.onmidimessage = null;
  if (access.value) access.value.onstatechange = null;
});
</script>

<style scoped>
.midi-console { display: grid; gap: .75rem; max-width: 640px; }
.controls { display: flex; gap: .5rem; align-items: center; flex-wrap: wrap; }
button {
  padding: .5rem .8rem; border: 1px solid #ccc; border-radius: .375rem;
  background: #f7f7f7; cursor: pointer;
}
button:disabled { opacity: .6; cursor: not-allowed; }
select {
  padding: .4rem .5rem; border: 1px solid #ccc; border-radius: .375rem; min-width: 260px;
}

</style>
