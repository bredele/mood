/**
 * Dependencies
 */

const emitter = require('zeroin')

/**
 * Create finite state machine.
 *
 * @param {String?} init state
 * @param {Object?} map 
 * @return {Emitter}
 * @public
 */

module.exports = (init, map) => {
  let state = current(map || init)
  const machine = emitter()

  /**
   * Add transition.
   *
   * @param {String} topic
   * @param {String?} condition
   * @param {Function} transition
   * @param {String} resolved
   * @param {String?} rejected
   * @private
   */

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

  /**
   * Add state machine transition.
   *
   * Examples:
   *
   *  machine.add('before', 'condition', cb, 'after')
   *  machine.add('before', cb)
   *  machine.add('before', cb, 'after')
   *  machine.add('before', 'condition', 'after')
   *  machine.add('before', 'condition', () => {
   *    return Promise.resolve('something')
   *  }, 'resolved')
   *  machine.add('before', 'condition', () => {
   *    return Promise.reject('something')
   *  }, 'resolved', 'rejected')
   *
   * @param {String} topic
   * @param {String | Function} condition
   * @param {Function | String} transition
   * @param {String?} resolved
   * @param {String?} rejected
   * @public
   */

  machine.add = function (topic, condition, transition, resolved, rejected) {
    if (typeof condition === 'function') {
      add(topic, condition, transition, resolved)
    } else {
      if (typeof transition === 'string') {
        resolved = transition
        transition = (...args) => Promise.resolve(args)
      }
      add(state + ' ' + condition, transition, resolved, rejected)
    }
  }

  /**
   * Trigger transition by emitting condition
   * on current state.
   *
   * Transitions are synchronous and this method returns
   * a promise that resolve with new state.
   *
   * Examples:
   *
   *  machine.trigger('condition')
   *    .then(state => console.log(state))
   *
   *
   * @param {String} condition
   * @return {Promise}
   * @public
   */

  machine.trigger = function (condition, ...args) {
    return new Promise(resolve => {
      machine.emit(state + ' ' + condition, args, resolve)
    })
  }

  /**
   * Set state or return current state.
   *
   * Examples:
   *
   *  machine.state('opened')
   *  machine.state()
   *  // => opened
   *
   * @param {String?}
   * @return {String}
   * @public
   */

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
  if (typeof map === 'object') {
    Object.keys(map).map(key => {
      const arr = map[key]
      if (arr[0] instanceof Array) {
        arr.map(item => machine.add(key, ...item))
      } else machine.add(key, ...arr)
    })
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
  if (type === 'string') return state
  else return Object.keys(state)[0]
}
