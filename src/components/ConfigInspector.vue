<template>
	<details>
		<summary><i class="fas fa-cog"></i> Config</summary>
		<section class="ConfigInspector">
			Keymap: <button @click="cycleKeymaps">{{store.config.keymap}} </button>
			Sustain <button @click="store.config.sustain= !store.config.sustain"> {{store.config.sustain}}</button>
			Fadeout: <button @click="store.config.fadeout = !store.config.fadeout"> {{store.config.fadeout}} </button>
			Autotrigger: <button @click="store.config.autotrigger = !store.config.autotrigger"> {{ store.config.autotrigger }}</button>

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
import { useStore } from '../store'

// Store usage
const store = useStore()

// Methods
function cycleKeymaps() {
	  const keymap=store.config.keymap;
	  const allKeymaps=Object.keys(keymaps);
	  if (allKeymaps.includes(keymap)){
	    const index=allKeymaps.indexOf(keymap);
	    const nextIndex = (index + 1) % allKeymaps.length;
	    store.config.keymap = allKeymaps[nextIndex];
	  } else {
	    store.config.keymap = allKeymaps[0];
	  }
	}

</script>