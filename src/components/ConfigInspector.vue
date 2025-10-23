<template>
	<details>
		<summary><i class="fas fa-cog"></i> Config</summary>
		<section class="config-inspector">
			Keymap: <button @click="cycleKeymaps">{{ currentKeymap }} </button>
			Sustain <button @click="stores.config.sustain= !stores.config.sustain"> {{ currentSustain }}</button>
			Fadeout: <button @click="stores.config.fadeout = !stores.config.fadeout"> {{ currentFadeout }} </button>
			Autotrigger: <button @click="stores.config.autotrigger = !stores.config.autotrigger"> {{ currentAutotrigger }}</button>

		</section>
	</details>
</template>

<style scoped>
	.config-inspector{
		margin-top: 1rem;
		height: 3rem;
		
	}
</style>

<script setup>
// Vue imports
import { computed } from 'vue'

// Config imports
import keymaps from '../config/keymap.js'

// Internal imports
import { useStores } from '../store'

// Store usage
const stores = useStores()

// Computed properties for derived states
const currentKeymap = computed(() => stores.config.keymap)
const currentSustain = computed(() => stores.config.sustain)
const currentFadeout = computed(() => stores.config.fadeout)
const currentAutotrigger = computed(() => stores.config.autotrigger)

// Methods
function cycleKeymaps() {
	  const keymap = stores.config.keymap;
	  const allKeymaps = Object.keys(keymaps);
	  if (allKeymaps.includes(keymap)) {
	    const index = allKeymaps.indexOf(keymap);
	    const nextIndex = (index + 1) % allKeymaps.length;
	    stores.config.keymap = allKeymaps[nextIndex];
	  } else {
	    stores.config.keymap = allKeymaps[0];
	  }
	}

</script>