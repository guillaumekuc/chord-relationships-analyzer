<template>


  <div class="analyzer">
  
    <h1></h1>
    <div class="cr-container">
      <span :class="store.performance.passive.chord?.name ? 'passive' : ''">{{store.performance.passive.chord?.name ?? ""}}</span>
      <span :class="store.performance.passive.chord?.name && store.performance.active.chord?.name ? 'separator' : ''"></span>
      <span class="cr">{{store.performance.active?.cr ?? ""}}</span>
      <span :class="store.performance.passive.chord?.name && store.performance.active.chord?.name ? 'separator' : ''"></span>
      <span :class="store.performance.active.chord?.name ? 'active' : ''">{{store.performance.active.chord?.name ?? ""}}</span>
      
    </div>
  </div>
</template>

<script setup>

  import { useStore } from '../store';
  const store = useStore();

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
    height: 120px;
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