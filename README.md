# Chord Relationships Analyzer

## Live

https://guillaumekuc.github.io/chord-relationships-analyzer/

## About

This project is a piano GUI and chord interpreter. 
It can render an isomorphic 6/6 piano layout in addition to the standard 7/5 piano layout. 
6/6 isomorphic keyboard maintain the shapes of their intervals across the length of the instrument, making them suitable for theory analysis, improv and composition. 
The chords played are also analysed within a framework of relative harmony named Chord Relationships. Chord Relationships are defined as the movement from one chord to the next and written as the quality of the start Chord, an interval, and the quality of the end Chord. 

This framework was explained in detail by composer Jjay Berthume in [this video](https://www.youtube.com/watch?v=Zr8S98v5vhU).
More information about isomorphic keyboards can be found [here](http://www.balanced-keyboard.org/)

## Usage

Play triads (Minor, Major, Diminished, Augmented chords)
Press enter while a triad is playing to validate it. 
Now the next triads you will play will be evaluated against the validated chord (now displayed in grey): the analyzer will display the chord relationship formed by the passive (greyed out chord) and active chord (triad you are currently playing).

## Known limitations

- Azerty keyboards are not yet supported.
- UX problem when autotrigger is turned on in config: because the chord are immediately validated, the chord relationship that was identified is never displayed (active immediately was moved to passive with no inbetween).
- Lack of in app explanations (for example the Enter key shortcut is not explained anywhere, nor is the escape shortcut to reset the UI).
- Overall, UI/UX iterations needed 
- Computer keyboards can't simultaneously hold down any 2 or 3 keys: some combinations can't be used as chords. This is a hardware limitation and can't really be bypassed. Current work around is to set Sustain to true in config and play the notes of a chord one by one. 

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
