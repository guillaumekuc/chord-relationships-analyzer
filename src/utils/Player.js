import Convert from '../utils/Convert.js';

export default class Player {
	constructor(stores) {
		this.stores = stores;
		this.hp = 100;
		this.position = { x: 0, y: 0 };
	}

	pressNote(midi) {
		switch (this.stores.config.sustain) {
			case true:
				
				if (this.stores.performance.active.notes.has(midi)) {
					this.stores.performance.noteOff(midi, this.stores.config);
				} else {
					this.stores.performance.noteOn(midi, this.stores.config);
					const frequency = Convert.midiToHz(midi);
					this.stores.audio.playTone(frequency);
				}
				break;
			case false:
				this.stores.performance.noteOn(midi, this.stores.config);
				const frequency = Convert.midiToHz(midi);
				this.stores.audio.playTone(frequency);
				break;
		}
		console.log('pressNote');
	}

	releaseNote(midi) {
		console.log('release note');
		if (this.stores.config.sustain) { return; } 
		this.stores.performance.noteOff(midi, this.stores.config);
		
	}
}