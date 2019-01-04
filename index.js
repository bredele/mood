/**
 * Dependencies
 */

var emitter = require('zeroin')

/**
 * Mood constructor.
 *
 * @param {String|Function} initial
 * @param {Object?} transitions 
 * @api public
 */

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
   * @param {String} before
   * @param {String} event
   * @param {Function?|String} transition
   * @param {String?} after
   * @api private
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
   * Examples:
   *
   *  machine.add('open', 'lock', 'locked')
   *  machine.add('open', 'lock', fn, 'locked')
   *  machine.add('open', 'lock', null, 'locked')
   *  machine.add('open', 'lock', promise, 'locked')
   *  machine.add('open', 'lock', () => promise, 'locked')
   *  machine.add({
   *    open: [['lock', 'locked'], ['unlock', fn, 'open']]
   *  })
   *
   * @param {String} before
   * @param {String} event
   * @param {Function?|String} transition
   * @param {String?} after
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

  /**
   * Trigger transition.
   * All arguments following the event name are passed to a transition.
   *
   * Examples:
   *
   *  machine.trigger('knock')
   *  machine.trigger('knock', data)
   *
   * @param {String} topic
   * @return {Promise}
   * @api public
   */

  machine.trigger = function (topic) {
    var args = [].slice.call(arguments, 1)
    return new Promise(function (resolve) {
      var current = machine.current
      var event = current + ' ' + topic
      if (machine.listenerCount(event) > 0) machine.emit.call(machine, event, args, resolve)
      else resolve(current)
    })
  }

  // add transitions on construct
  if (obj) machine.add(obj)

  return machine
}
