import Convert from '../utils/Convert.js';

export default class Player {
	constructor (store) {
		this.$store=store;
	}

	PressNote(midi) {
		console.log('pressNote')
  		this.$store.performance.noteOn(midi);
  		const frequency= Convert.midiToHz(midi);
  		this.$store.audio.playTone(frequency);
	}

	ReleaseNote(midi){

		if (this.$store.config.sustain){ return };
		this.$store.performance.noteOff(midi);
	}
}