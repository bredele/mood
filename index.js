

module.exports = (init, map) => {
  let state = current(map || init)
  return {
    state() {
      return state
    }
  }
}

/**
 * Get current state from
 *
 * @param {String|Function|Object} state
 * @return {String} (null if not passed)
 * @private
 */

function current (state) {
  const type = typeof state
  switch (type) {
    case 'string':
      return state
    case 'object':
      return Object.keys(state)[0]
  }
}
