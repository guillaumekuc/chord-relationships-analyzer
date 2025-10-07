<template>
	<section class="ConfigInspector">
Keymap: <button @click="cycleKeymaps">{{store.config.keymap}} </button>
Sustain <button @click="store.config.sustain= !store.config.sustain"> {{store.config.sustain}}</button>

	</section>

</template>

<style scoped>
	.ConfigInspector{
		margin-top: 1rem;
		height: 3rem;
		
	}
</style>

<script setup>
	import keymaps from '../config/keymap.js';

	import {useStore} from '../store';
	const store= useStore();
	
	function cycleKeymaps() {
	  const keymap=store.config.keymap;
	  const allKeymaps=Object.keys(keymaps);
	  console.log(keymap);
	  console.log(allKeymaps);
	  if (allKeymaps.includes(keymap)){
	    const index=allKeymaps.indexOf(keymap);
	    const nextIndex = (index + 1) % allKeymaps.length;
	    store.config.keymap = allKeymaps[nextIndex];
	  } else {
	    store.config.keymap = allKeymaps[0];
	  }
	  
	}

</script>