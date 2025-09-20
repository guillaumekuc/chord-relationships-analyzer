import Convert from './Convert.js';

export default class ShortcutManager {
	constructor(store) {
		this.$store=store;
		console.log(this.$store);
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

	  const midi = Convert.keyToMidi(e.key.toLowerCase());
	  if (!midi){return}

	  console.log(e);

		this.$store.player.PressNote(midi);
	}

	handleKeyUp = (e) => {
	  const midi = Convert.keyToMidi(e.key.toLowerCase());
	  if (!midi){return}
	  this.$store.player.ReleaseNote(midi);
	}
}