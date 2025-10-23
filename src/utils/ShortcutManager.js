import Convert from './Convert.js';
import keymap from '../config/keymap.js';

export default class ShortcutManager {
	constructor(store) {
		this.$store=store;
	}

	init (){
		window.addEventListener("keydown", this.handleKeyDown);
  		window.addEventListener("keyup", this.handleKeyUp);
	}

	destroy(){
	  	window.removeEventListener("keydown", this.handleKeyDown);
		window.removeEventListener("keyup", this.handleKeyUp);
	}

	handleKeyDown = (e) =>  {
	  if (e.repeat) { return };

	  if (e.key==="Enter") {
	  	this.$store.performance.validate(this.$store.config);
	  }

	  if (e.key==='Escape' || e.key==='Esc' ){
	    console.log('escape');
	    this.$store.performance.reset();
	  }
	  if (e.key==='Backspace' || e.key==="Delete"){
	    console.log('backspace');
	    //clearLastActive();
	    this.$store.performance.clearLast(this.$store.config);
	  }

	  const map = keymap[this.$store.config.keymap];
	  const midi = Convert.keyToMidi(e.key.toLowerCase(), map);
	  if (!midi){return}

	  console.log(e);

		this.$store.audio.player.PressNote(midi);
	}

	handleKeyUp = (e) => {
	  const map = keymap[this.$store.config.keymap];
	  const midi = Convert.keyToMidi(e.key.toLowerCase(), map);
	  if (!midi){return}
	  if (this.$store.config.sustain){ 
	  	console.log('sustain active');
	  	return 
	  } 
	  this.$store.audio.player.ReleaseNote(midi);
	}
}