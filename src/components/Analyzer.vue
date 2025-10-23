<template>
  <article class="analyzer">
    <div class="cr-container">
      <span :class="performanceStore.passive.chord?.name ? 'passive' : ''">{{ performanceStore.passive.chord?.name ?? "" }}</span>
      <span :class="performanceStore.passive.chord?.name && performanceStore.active.chord?.name ? 'separator' : ''"></span>
      <span class="cr">{{ performanceStore.active?.cr ?? "" }}</span>
      <span :class="performanceStore.passive.chord?.name && performanceStore.active.chord?.name ? 'separator' : ''"></span>
      <span :class="performanceStore.active.chord?.name ? 'active' : ''">{{ performanceStore.active.chord?.name ?? "" }}</span>
    </div>
  </article>
</template>

<script setup>
import { usePerformanceStore } from '../store/modules/performance.js'

const performanceStore = usePerformanceStore()
</script>

<style scoped>
  .passive, .active {
    height: 1.66rem;
    width: 1.66rem;
    border-radius: 5px;    
    padding: 25px;
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