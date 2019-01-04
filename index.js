/**
 * Dependencies
 */

var emitter = require('zeroin')

module.exports = function (initial, obj) {
  var machine = emitter({})

  /**
   * Current state.
   * @type {String}
   */

  machine.current = (typeof initial === 'function' ? initial() : initial) || ''

  /**
   * Add transition.
   *
   * @api public
   */

  machine.add = function (before, event, transition, after) {
    if (typeof transition === 'string') {
      after = transition
      transition = null
    }
    machine.on(before + ' ' + event, function () {
      transition && transition()
      machine.current = after || machine.current
    })
  }

  machine.trigger = function (topic) {
    return machine.emit.apply(machine, [machine.current + ' ' + topic].concat([].slice.call(arguments, 1)))
  }

  return machine
}
