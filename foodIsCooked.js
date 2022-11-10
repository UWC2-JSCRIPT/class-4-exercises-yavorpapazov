/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // Write function HERE
  if(kind === 'chicken' && internalTemp > 165) {
    return true
  } else if(kind === 'beef') {
    if(doneness === 'rare' && internalTemp > 125 && internalTemp <= 135) {
      return true
    }
    if(doneness === 'medium' && internalTemp > 135 && internalTemp <= 155) {
      return true
    }
    if(doneness === 'well' && internalTemp > 155) {
      return true
    }
    return false
  } else {
    return false
  }
}

// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true