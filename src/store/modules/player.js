import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    player: null,
  }),
  
  actions: {
    initializePlayer(playerInstance) {
      this.player = playerInstance;
    },
    
    pressNote(midi) {
      if (this.player) {
        this.player.pressNote(midi);
      }
    },
    
    releaseNote(midi) {
      if (this.player) {
        this.player.releaseNote(midi);
      }
    }
  }
})
