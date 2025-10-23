import "@picocss/pico/css/pico.min.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles/variables.css';

import { useStores } from './store';
import AudioEngine from './audio/AudioEngine.js';

const app = createApp(App)
const pinia = createPinia();

app.use(pinia);
app.mount('#app');

// Initialize stores
const stores = useStores();

// Initialize audio
const audioEngine = new AudioEngine();

// Set up stores
stores.audio.initializeAudio(audioEngine);


// optional: expose globally for console
window.API = {
  stores,
};
