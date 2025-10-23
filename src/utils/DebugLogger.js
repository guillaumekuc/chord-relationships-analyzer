/**
 * Simple debug logging utility
 * Just console.log with an on/off switch
 */

// Set this to true/false to enable/disable debug logging
const DEBUG_ENABLED = true;

function debugLog(...args) {
  if (DEBUG_ENABLED) {
    console.log(...args);
  }
}

export default debugLog;
