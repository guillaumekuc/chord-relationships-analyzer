import { defineStore } from 'pinia'

const useAudioStore = defineStore('audio', {
  state: () => ({
    audio: null,
  }),
  
  actions: {
    initializeAudio(audioEngine) {
      this.audio = audioEngine;
    },
    
    playTone(frequency) {
      if (this.audio) {
        this.audio.playTone(frequency);
      }
    }
  }
})

export default useAudioStore;
