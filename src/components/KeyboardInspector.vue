<template>
  <section class="KeyboardInspector">
    <span>Layout: <button @click="cycleLayouts">{{store.instruments[props.parent].layout}}</button></span>
    <span>Colors: <button @click="cycleColors">{{store.instruments[props.parent].colors}}</button></span>
    <span><button @click="store.instruments[props.parent].display.keyboardLabels= !store.instruments[props.parent].display.keyboardLabels"> Keyboard Labels</button></span>
    <span><button @click="store.instruments[props.parent].display.noteLabels= !store.instruments[props.parent].display.noteLabels"> Note Labels</button></span>
  </section>
</template>


<style scoped>
  .KeyboardInspector {
    height: fit-content;
    width:100%;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    margin-bottom: 0.5rem;
  }

  span{
    margin-left: 0.5rem;
  }




</style>

<script setup>

  import { useStore } from '../store';
  const store = useStore(); 

  import keyboardColorPatterns from "../config/keyboardColorPatterns.js";
  import keyboardRowPatterns from "../config/keyboardRowPatterns.js";

  const props = defineProps({
    parent: {type: String, required: true},
  });

  function cycleColors() {
    const colors=store.instruments[props.parent].colors;
    const allColors=Object.keys(keyboardColorPatterns);
    if (allColors.includes(colors)){
      const index=allColors.indexOf(colors);
      const nextIndex = (index + 1) % allColors.length;
      store.instruments[props.parent].colors = allColors[nextIndex];
    } else {
      store.instruments[props.parent].colors = allColors[0];
    }
    console.log('cycle Colors');
    console.log(allColors);
  }

  function cycleLayouts() {
    const layout=store.instruments[props.parent].layout;
    const allLayouts=Object.keys(keyboardRowPatterns);
    if (allLayouts.includes(layout)){
      const index=allLayouts.indexOf(layout);
      const nextIndex = (index + 1) % allLayouts.length;
      store.instruments[props.parent].layout = allLayouts[nextIndex];
    } else {
      store.instruments[props.parent].layout = allLayouts[0];
    }
    
  }

</script>