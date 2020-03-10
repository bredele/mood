/**
 * Dependencies
 */

const emitter = require('zeroin')


module.exports = (init, map) => {

  let state = current(map || init)

  const machine = emitter({
    /**
     * Add state.
     *
     * @private
     */

    add (before, condition, transition, resolved, rejected) {
      if (typeof condition === 'function') {
        machine.on(before, (...args) => {
          Promise.resolve(condition.call(machine, ...args))
            .then(
              (...attrs) => this.state(transition, ...attrs),
              (...attrs) => this.state(resolved, ...attrs)
            )
        })
      } else {
        machine.on(state + ' ' + condition, (...args) => {
          transition.call(machine, ...args)
        })
      }
    },

    trigger (condition, ...args) {
      return new Promise(resolve => {
        machine.emit(state + ' ' + condition, ...args)
        resolve(state)
      })
    },

    /**
     * Set or get current state.
     *
     * @param {String?} str
     * @return {String}
     * @public
     */

    state(str, ...args) {
      if (str) {
        state = str
        machine.emit(state, ...args)
      } else return state
    }
  })
  add(machine, map || init)
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

function add (machine, map = {}) {
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
