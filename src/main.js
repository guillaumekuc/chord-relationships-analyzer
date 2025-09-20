console.log('main.js loaded');

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { useStore } from './store';

import AudioEngine from './audio/AudioEngine.js';
import Player from './utils/Player.js';

const app = createApp(App)
const pinia = createPinia();

app.use(pinia);
app.mount('#app');


const store = useStore();

store.audio = new AudioEngine();
store.player = new Player(store);

// optional: expose globally for console
window.API={};
window.API.store=store;