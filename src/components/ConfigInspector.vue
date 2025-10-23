<template>
	<details>
		<summary><i class="fas fa-cog"></i> Config</summary>
		<section class="config-inspector">
			Keymap: <button @click="cycleKeymaps">{{ configStore.keymap }} </button>
			Sustain <button @click="configStore.toggleSustain()"> {{ configStore.sustain }}</button>
			Fadeout: <button @click="configStore.toggleFadeout()"> {{ configStore.fadeout }} </button>
			Autotrigger: <button @click="configStore.toggleAutotrigger()"> {{ configStore.autotrigger }}</button>
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
import { useConfigStore } from '../store/modules/config.js'
import keymaps from '../config/keymap.js'

const configStore = useConfigStore()

function cycleKeymaps() {
  const keymap = configStore.keymap
  const allKeymaps = Object.keys(keymaps)
  if (allKeymaps.includes(keymap)) {
    const index = allKeymaps.indexOf(keymap)
    const nextIndex = (index + 1) % allKeymaps.length
    configStore.setKeymap(allKeymaps[nextIndex])
  } else {
    configStore.setKeymap(allKeymaps[0])
  }
}
</script>