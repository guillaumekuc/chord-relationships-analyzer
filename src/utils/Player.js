import Convert from '../utils/Convert.js';

export default class Player {
	constructor (store) {
		this.$store=store;
	}

	PressNote(midi) {
		switch(this.$store.config.sustain){
			case true:
				
				if (this.$store.performance.active.notes.has(midi)){
					this.$store.performance.noteOff(midi);
				} else {
					this.$store.performance.noteOn(midi);
					const frequency=Convert.midiToHz(midi);
					this.$store.audio.playTone(frequency);
				}
				break
			case false:
				this.$store.performance.noteOn(midi);
				const frequency= Convert.midiToHz(midi);
				this.$store.audio.playTone(frequency);
				break
		}
		console.log('pressNote')
	}

	ReleaseNote(midi){
		console.log('release note');
		if (this.$store.config.sustain){ return } 
		this.$store.performance.noteOff(midi);
		
	}
}