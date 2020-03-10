/**
 * Dependencies
 */

const emitter = require('zeroin')


module.exports = (init, map) => {

  let state = current(map || init)

  const machine = emitter()

  const add = function (topic, transition, resolved, rejected){
    return new Promise(resolve => {
      machine.on(topic, (args, cb) => {
        Promise.resolve(transition.call(machine, ...args))
          .then(
            (...attrs) => machine.state(resolved, ...attrs),
            (...attrs) => machine.state(rejected, ...attrs)
          ).then(cb)
      })
    })
  }

  machine.add = function (before, condition, transition, resolved, rejected) {
    if (typeof condition === 'function') {
      add(before, condition, transition, resolved)
    } else {
      if (typeof transition === 'string') {
        resolved = transition
        transition = (...args) => Promise.resolve(args)
      }
      add(state + ' ' + condition, transition, resolved, rejected)
    }
  }

  machine.trigger = function (condition, ...args) {
    return new Promise(resolve => {
      machine.emit(state + ' ' + condition, args, resolve)
    })
  }

  machine.state = function (str, ...args) {
    if (str) {
      state = str
      machine.emit(state, args)
      return state
    } else return state
  }

  initialize(machine, map || init)
  machine.state(state)
  return machine
}

/**
 * Add map states to the state machine.
 *
 * @param {Object} machine
 * @param {Object} map
 * @private
 */

function initialize (machine, map = {}) {
  if (typeof map === 'object') Object.keys(map).map(key => machine.add(key, ...map[key]))
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
  if (type === 'string') return state
  else return Object.keys(state)[0]
}
