<template>


  <article class="analyzer">
    <div class="cr-container">
      <span :class="stores.performance.passive.chord?.name ? 'passive' : ''">{{stores.performance.passive.chord?.name ?? ""}}</span>
      <span :class="stores.performance.passive.chord?.name && stores.performance.active.chord?.name ? 'separator' : ''"></span>
      <span class="cr">{{stores.performance.active?.cr ?? ""}}</span>
      <span :class="stores.performance.passive.chord?.name && stores.performance.active.chord?.name ? 'separator' : ''"></span>
      <span :class="stores.performance.active.chord?.name ? 'active' : ''">{{stores.performance.active.chord?.name ?? ""}}</span>
      
    </div>
  </article>
</template>

<script setup>
// Internal imports
import { useStores } from '../store'

// Store usage
const stores = useStores()
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