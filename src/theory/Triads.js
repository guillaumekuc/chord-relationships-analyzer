import * as Common from "./common.js";
import Notes from "./Notes.js";
import Helpers from "../utils/Helpers.js";

export default class Triads {

	static types = {
	  M: {pitchClasses: [0, 4, 7], symbol: "", rootPriority: 1},
	  m: {pitchClasses: [0, 3, 7], symbol: "m", rootPriority: 2},
	  d: {pitchClasses: [0, 3, 6], symbol: "°", rootPriority: 3},
	  A: {pitchClasses: [0, 4, 8], symbol: "+", rootPriority: 4}
	}

	static fromScale(scale){
		//returns all triads contained in a scale
		const triads = [];

		for (let i = 0; i < scale.pitchClasses.length; i++) {
			for (let j = 0; j < scale.pitchClasses.length; j++) {
			  
			  if (i===j){ continue}

			  for (let k = 0; k < scale.pitchClasses.length; k++) {
			  	if (k === i || k === j) { continue }
			    const triadPitchClasses = [scale.pitchClasses[i], scale.pitchClasses[j], scale.pitchClasses[k]];
			    
			    // Normalize to root (0-based)
			    const intervalSet = triadPitchClasses.map(pitchClass => Common.modulo12(pitchClass - triadPitchClasses[0]))

			    // Find matching quality with the interval pattern
			    const match = Object.entries(this.types).find(
			      ([qualityName, triad]) =>
			        triad.pitchClasses.length === intervalSet.length &&
			        triad.pitchClasses.every((intervalValue, index) => intervalValue === intervalSet[index])
			    );

			    if (match) {
			      const [qualityName] = match;
			      triads.push({
			        rootPitchClass: triadPitchClasses[0],
			        quality: qualityName,
			      });
			    }

			  } // end for k
			} // end for j
		}// end for i

		return triads;		
	}

	static fromNotes(notes){
		Helpers.assert(Array.isArray(notes), "Expected an array"); 
		if (notes.length !== 3) {
			return null;
		}

		//return a chord object if the provided notes match a known triad type
		let chord={
			root: undefined,
			quality: undefined,
			name: undefined,
		};


		const pitchClasses=notes.map(note=> Common.modulo12(note));

		//check each inversion of the chord against known Triads types
		let found;

		for (let i=0; i< pitchClasses.length && !found; i++){ 
		  const rootPC=pitchClasses[i];
		  const normalized=pitchClasses.map(PC => Common.modulo12(PC-rootPC));

		  // Sort ascending
		  normalized.sort((a, b) => a - b);

		  found=Object.keys(this.types).some(type => {
		    if (Helpers.arraysEqual(this.types[type].pitchClasses, normalized)) {    
		      chord.root = rootPC;
		      chord.rootName= Notes.fromPitchClass(chord.root);
		      chord.quality = type;
		      chord.name = chord.rootName + this.types[chord.quality].symbol;
		      chord.pitchClasses= pitchClasses;

		      return true
		    }
		    return false;
		  });
		}

		return found ? chord : null;

	}


}

