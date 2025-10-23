import Convert from '../utils/Convert.js';

export default class Player {
	constructor (store) {
		this.$store=store;
		this.hp= 100;
		this.position = {x:0, y:0};
	}

	PressNote(midi) {
		switch(this.$store.config.sustain){
			case true:
				
				if (this.$store.performance.active.notes.has(midi)){
					this.$store.performance.noteOff(midi, this.$store.config);
				} else {
					this.$store.performance.noteOn(midi, this.$store.config);
					const frequency=Convert.midiToHz(midi);
					this.$store.audio.audio.playTone(frequency);
				}
				break
			case false:
				this.$store.performance.noteOn(midi, this.$store.config);
				const frequency= Convert.midiToHz(midi);
				this.$store.audio.audio.playTone(frequency);
				break
		}
		console.log('pressNote')
	}

	ReleaseNote(midi){
		console.log('release note');
		if (this.$store.config.sustain){ return } 
		this.$store.performance.noteOff(midi, this.$store.config);
		
	}
}