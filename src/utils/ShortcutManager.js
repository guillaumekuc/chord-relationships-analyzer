import Convert from './Convert.js';
import keymap from '../config/keymap.js';

export default class ShortcutManager {
	constructor(stores) {
		this.stores = stores;
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
	  	this.stores.performance.validate(this.stores.config);
	  }

	  if (e.key==='Escape' || e.key==='Esc' ){
	    console.log('escape');
	    this.stores.performance.reset();
	  }
	  if (e.key==='Backspace' || e.key==="Delete"){
	    console.log('backspace');
	    //clearLastActive();
	    this.stores.performance.clearLast(this.stores.config);
	  }

	  const map = keymap[this.stores.config.keymap];
	  const midi = Convert.keyToMidi(e.key.toLowerCase(), map);
	  if (!midi){return}

	  console.log(e);

		this.stores.player.pressNote(midi);
	}

	handleKeyUp = (e) => {
	  const map = keymap[this.stores.config.keymap];
	  const midi = Convert.keyToMidi(e.key.toLowerCase(), map);
	  if (!midi){return}
	  if (this.stores.config.sustain){ 
	  	console.log('sustain active');
	  	return 
	  } 
	  this.stores.player.releaseNote(midi);
	}
}