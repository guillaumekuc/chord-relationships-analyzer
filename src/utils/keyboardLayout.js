import MIDI_CONSTANTS from '../constants/midi.js'

function generateKeyboardSlots(octaveStart, octaveEnd, pattern, colorPattern, midiToKey) {
  const slots = []
  const octaveCount = octaveEnd - octaveStart
  
  if (octaveCount <= 0) {
    console.error('Invalid octave range')
    return []
  }

  for (let o = 0; o < octaveCount; o++) {
    const octave = octaveStart + o
    let offset = 0

    for (let i = 0; i < pattern.length; i++) {
      const octaveMidi = MIDI_CONSTANTS.SEMITONES_PER_OCTAVE * (octaveStart + o + 1)
      const lowerMidi = octaveMidi + offset
      
      const lower = { 
        note: `${pattern[i].l}${octave}`, 
        midi: Number(lowerMidi),
        color: colorPattern[offset],
        keyboard: midiToKey[lowerMidi],
      }
      offset++

      let upper = null
      if (pattern[i].u) {
        const upperMidi = octaveMidi + offset
        upper = { 
          note: `${pattern[i].u}${octave}`,
          midi: Number(upperMidi),
          color: colorPattern[offset],
          keyboard: midiToKey[upperMidi],
        }
        offset++
      }

      slots.push({ lower, upper })
    }
  }

  // Add the final note of the last octave
  const octaveEndMidi = MIDI_CONSTANTS.SEMITONES_PER_OCTAVE * (octaveEnd + 1)
  const lastNote = `${pattern[0].l}${octaveEnd}`

  slots.push({
    lower: {
      note: lastNote, 
      midi: octaveEndMidi,
    }, 
    upper: null
  })

  return slots
}

export default generateKeyboardSlots;
