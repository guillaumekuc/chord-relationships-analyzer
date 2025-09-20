## Features

- 6/6 Piano Keyboard GUI
	- Strict White/Black Keys alternating
	- Isomorphic layout: intervals and chords retain their shapes
- 7/5 Piano Keyboard GUI
- Keyboard Input
- MIDI Input
- Centralized API object
- Sustained notes mode
- Range settings (lowest/highest notes)
- Triads recognition regardless of inversions
	- Chord quality discrimination (Minor, Major, Diminished, Augmented)
- Chord Relationship interpretation
	- Previous chord is stored and compared against current chord
	- Chord Relationships are displayed as \[Root Chord Quality]\[Interval]\[Target Chord Quality]

## Tech Stack

- Vue.js
- Pinia Store
- Vite
