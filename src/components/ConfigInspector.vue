<template>
	<details>
		<summary><i class="fas fa-cog"></i> Config</summary>
		<section class="config-inspector">
			Keymap: <button @click="stores.actions.cycleKeymap.execute()">{{ configStore.keymap }} </button>
			Sustain <button @click="stores.actions.toggleSustain.execute()"> {{ configStore.sustain }}</button>
			Fadeout: <button @click="stores.actions.toggleFadeout.execute()"> {{ configStore.fadeout }} </button>
			Autotrigger: <button @click="stores.actions.toggleAutotrigger.execute()"> {{ configStore.autotrigger }}</button>
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
import { useStores } from '../store/index.js'

const stores = useStores()
const configStore = stores.config
</script>