<template>


  <article class="analyzer">
    <div class="cr-container">
      <span :class="hasPassiveChord ? 'passive' : ''">{{ passiveChordName }}</span>
      <span :class="showSeparator ? 'separator' : ''"></span>
      <span class="cr">{{ activeCR }}</span>
      <span :class="showSeparator ? 'separator' : ''"></span>
      <span :class="hasActiveChord ? 'active' : ''">{{ activeChordName }}</span>
      
    </div>
  </article>
</template>

<script setup>
// Vue imports
import { computed } from 'vue'

// Internal imports
import { useStores } from '../store'

// Store usage
const stores = useStores()

// Computed properties for derived states
const passiveChordName = computed(() => stores.performance.passive.chord?.name ?? "")
const activeChordName = computed(() => stores.performance.active.chord?.name ?? "")
const activeCR = computed(() => stores.performance.active?.cr ?? "")
const hasPassiveChord = computed(() => !!stores.performance.passive.chord?.name)
const hasActiveChord = computed(() => !!stores.performance.active.chord?.name)
const showSeparator = computed(() => hasPassiveChord.value && hasActiveChord.value)
</script>

<style scoped>
  .passive, .active {
    height: 1.66rem;
    width: 1.66rem;
    border-radius: 5px;    
    padding: 5px;
    color: white;
  }

  .passive {
    background-color: var(--color-passive);
  }

  .active {
    background-color: var(--color-active);
  }

  .analyzer {
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-left:auto;
    margin-right: auto;
  }

  .cr-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: sans-serif;
    width: 30rem;

  }

  .cr-container span {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    vertical-align: middle;
  }

  .cr {
    font-size: 4rem;
    height: 2rem;

  }

  .separator:before {
    content: "·";
  }

</style>