import "@picocss/pico/css/pico.min.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles/variables.css';

import { useStores } from './store';

import AudioEngine from './audio/AudioEngine.js';
import Player from './utils/Player.js';

const app = createApp(App)
const pinia = createPinia();

app.use(pinia);
app.mount('#app');

// Initialize stores
const stores = useStores();

// Initialize audio and player
const audioEngine = new AudioEngine();
const player = new Player(stores);

// Set up audio store
stores.audio.initializeAudio(audioEngine, player);

// optional: expose globally for console
window.API = {
  stores,
  performance: stores.performance,
  config: stores.config,
  audio: stores.audio
};