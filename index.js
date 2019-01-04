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

  var add = function (before, event, transition, after) {
    if (typeof transition === 'string') {
      after = transition
      transition = null
    }
    machine.on(before + ' ' + event, function (args, cb) {
      Promise.resolve(
        typeof transition === 'function'
          ? transition.apply(null, args)
          : transition
      ).then(() => {
        return cb((machine.current = after || machine.current))
      })
    })
  }

  /**
   * Add transition.
   *
   * @api public
   */

  machine.add = function (before, event, transition, after) {
    if (typeof before === 'object') {
      Object.keys(before).map(function (key) {
        [].concat(before[key]).map(function (sequence) {
          add.apply(null, [key].concat(sequence))
        })
      })
    } else add(before, event, transition, after)
  }

  machine.trigger = function (topic) {
    var args = [].slice.call(arguments, 1)
    return new Promise(function (resolve) {
      var current = machine.current
      var event = current + ' ' + topic
      if (machine.listenerCount(event) > 0) machine.emit.call(machine, event, args, resolve)
      else resolve(current)
    })
  }

  return machine
}
