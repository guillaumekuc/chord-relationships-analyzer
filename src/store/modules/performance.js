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
        if (this.active.chord) {
          copyActiveToPassive(this);
          clearActive(this);
        }
      }   

    },
    noteOff(note) {
      if (this.active.chord) {
        copyActiveToPassive(this);

      }

      delete this.active.notes[note];

      if (Object.keys(this.active.notes).length === 0) {
        this.active.cr = null;
      }
    },

    reset() {
      if (this.active.chord) {
        copyActiveToPassive(this);
      }

      clearActive(this);
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
  console.log('copyActiveToPassive');
  console.log(performance.active);
  performance.passive.chord = performance.active.chord;

  performance.passive.notes = { ...performance.active.notes };
  performance.active.chord = null; 

  setPassiveTimeout(performance);
}

function setPassiveTimeout(performance) {
  const config=useConfigStore();

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

  }, config.passiveTimeout)
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

