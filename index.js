/**
 * Dependencies
 */

var emitter = require('zeroin')

module.exports = function (initial, obj) {
  const machine = emitter({})

  /**
   * Current state.
   * @type {String}
   */

  machine.current = ''
  
  return machine
}
