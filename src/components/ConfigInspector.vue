<template>
	<details>
		<summary><i class="fas fa-cog"></i> Config</summary>
		<section class="ConfigInspector">
			Keymap: <button @click="cycleKeymaps">{{stores.config.keymap}} </button>
			Sustain <button @click="stores.config.sustain= !stores.config.sustain"> {{stores.config.sustain}}</button>
			Fadeout: <button @click="stores.config.fadeout = !stores.config.fadeout"> {{stores.config.fadeout}} </button>
			Autotrigger: <button @click="stores.config.autotrigger = !stores.config.autotrigger"> {{ stores.config.autotrigger }}</button>

		</section>
	</details>
</template>

<style scoped>
	.ConfigInspector{
		margin-top: 1rem;
		height: 3rem;
		
	}
</style>

<script setup>
// Config imports
import keymaps from '../config/keymap.js'

// Internal imports
import { useStores } from '../store'

// Store usage
const stores = useStores()

// Methods
function cycleKeymaps() {
	  const keymap=stores.config.keymap;
	  const allKeymaps=Object.keys(keymaps);
	  if (allKeymaps.includes(keymap)){
	    const index=allKeymaps.indexOf(keymap);
	    const nextIndex = (index + 1) % allKeymaps.length;
	    stores.config.keymap = allKeymaps[nextIndex];
	  } else {
	    stores.config.keymap = allKeymaps[0];
	  }
	}

</script>