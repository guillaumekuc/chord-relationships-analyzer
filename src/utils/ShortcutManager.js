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

	  if (e.key==='Escape' || e.key==='Esc' || e.key==="Enter" ){
	    console.log('escape');
	    //clearActiveNotes();
	    console.log(this.$store);
	    this.$store.performance.reset();
	  }
	  if (e.key==='Backspace' || e.key==="Delete"){
	    console.log('backspace');
	    //clearLastActive();
	    this.$store.performance.reset();
	  }

	  const map = keymap[this.$store.config.keymap];
	  const midi = Convert.keyToMidi(e.key.toLowerCase(), map);
	  if (!midi){return}

	  console.log(e);

		this.$store.player.PressNote(midi);
	}

	handleKeyUp = (e) => {
	  const map = keymap[this.$store.config.keymap];
	  const midi = Convert.keyToMidi(e.key.toLowerCase(), map);
	  if (!midi){return}
	  if (this.$store.config.sustain){ 
	  	console.log('sustain active');
	  	return 
	  } 
	  this.$store.player.ReleaseNote(midi);
	}
}