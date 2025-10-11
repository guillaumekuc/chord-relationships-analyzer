import { defineStore } from 'pinia';
import { useConfigStore } from './config.js';
import Triads from "../../theory/Triads.js";
import Intervals from "../../theory/Intervals.js";
import * as Common from "../../theory/common.js";
import Helpers from "../../utils/Helpers.js";

export const usePerformanceStore = defineStore('performance', {
  state: () => ({
    active: {
      notes: {},
      chord: null,
      cr: undefined,
    },
    passive: {
      notes: {},
      chord: null,
      timeout: null,
    },
  }),
  actions: {
    noteOn(note) {
      const config= useConfigStore();
      this.active.notes[note] = true;

      computeChord(this);
      if (config.autotrigger){
        this.validate();
      }   

    },
    noteOff(note) {
      const config= useConfigStore();

      delete this.active.notes[note];
      computeChord(this);

      if (config.autotrigger){
        this.validate();
      }

    },

    validate() {
      if (this.active.chord) {
        copyActiveToPassive(this);
        clearActive(this);
      } else {
        console.log('invalid chord');
      }
    },

    reset() {
      clearActive(this);
      clearPassive(this);
    },

    clearLast() {
      const config=useConfigStore();

      const lastKey = Object.keys(this.active.notes).pop(); 
      delete this.active.notes[lastKey]; 

      computeChord(this);

      if(config.autotrigger){
        this.validate();
      }
    }
  }
})

  function computeChord(performance) {
    //identify triad, then check for chord relationship between passive and active
    const chord=Triads.fromNotes(Object.keys(performance.active.notes));
    performance.active.chord=chord;
    if (performance.active.chord && performance.passive.chord){
      console.log(performance.active.chord, performance.passive.chord);
      const cr = computeCR(performance.active.chord, performance.passive.chord);
      performance.active.cr=cr;
    } else {
      performance.active.cr=null;
    }
  }

  function computeCR(activeChord, passiveChord) {
    Helpers.assert(
      activeChord.quality != null
      && activeChord.root != null
      && passiveChord.quality != null
      && passiveChord.root != null
      , activeChord);
    const interval=Intervals.romans[Common.modulo12(activeChord.root - passiveChord.root)];
    const quickString=`${passiveChord.quality} ${interval} ${activeChord.quality}`;
    return quickString;
  }



function copyActiveToPassive(performance){
  const config=useConfigStore();


  console.log('copyActiveToPassive');
  console.log(performance.active);
  performance.passive.chord = performance.active.chord;

  performance.passive.notes = { ...performance.active.notes };
  performance.active.chord = null; 

  if (config.fadeout){
    setPassiveTimeout(performance, config.fadeoutDuration);
  }
}

function setPassiveTimeout(performance, duration) {
  if (performance.passive.timeout) {
        clearTimeout(performance.passive.timeout)
        performance.passive.timeout = null
  }
  performance.passive.timeout = setTimeout(() => {
    if (!performance.active.chord){
     clearPassive(performance);     
   } else {
    setPassivetimeout(performance);
   }

  }, duration)
}

function clearActive(performance){
  performance.active.notes = {}
  performance.active.cr=null;
}

function clearPassive(performance){ 
  performance.passive.notes = {}
  performance.passive.chord = null
  performance.passive.timeout = null

}

