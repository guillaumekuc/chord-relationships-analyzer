# Chord Relationships Analyzer

## About

This project is a piano GUI and chord interpreter. 
It can render an isomorphic 6/6 piano layout in addition to the standard 7/5 piano layout. 
6/6 isomorphic keyboard maintain the shapes of their intervals across the length of the instrument, making them suitable for theory analysis, improv and composition. 
The chords played are also analysed within a framework of relative harmony named Chord Relationships. Chord Relationships are defined as the movement from one chord to the next and written as the quality of the start Chord, an interval, and the quality of the end Chord. 

This framework was explained in detail by composer Jjay Berthume in [this video](https://www.youtube.com/watch?v=Zr8S98v5vhU).
More information about isomorphic keyboards can be found [here](http://www.balanced-keyboard.org/)

## Links

- [Balanced Keyboard]( http://www.balanced-keyboard.org/)
- [Harmonic Relativity by Jjay Berthume](https://www.youtube.com/watch?v=Zr8S98v5vhU)


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
