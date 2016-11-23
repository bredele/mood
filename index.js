
/**
 * Dependencies
 * @api private
 */

var Emitter = require('component-emitter')
var emit = Emitter.prototype.emit


/**
 * Expose 'Mood'
 */

module.exports = Mood


/**
 * Mood constructor.
 *
 * Create a finite state machine with an intial
 * state.
 *
 * @param {String} current Mood
 * @param {Object} transitions
 * @api public
 */

function Mood(current, obj) {
  if(!(this instanceof Mood)) return new Mood(current, obj)
  if(typeof current == 'function') current = current()
  this.current = current || ''
  this.transitions = {}
  if(obj) this.add(obj)
}


//NOTE: Mood mixin could be great
Emitter(Mood.prototype)


/**
 * Add transition(s).
 *
 * Examples:
 *
 *   .add('open', 'lock', fn, 'locked');
 *   .add('open', 'lock', 'locked');
 *   .add({
 *     'open' : [
 *       ['lock', fn, 'locked'],
 *       ['close', 'closed']
 *     ],
 *     'locked' : [
 *       ['break', 'open']
 *     ]
 *   });
 *
 * @param {String|Object}   state
 * @param {String}   event
 * @param {Function} fn  optional
 * @param {String} next
 * @api public
 */

Mood.prototype.add = function(state, event, fn, next) {
  if(typeof state == 'object') {
    for(var name in state) {
      var topic = state[name]
      if(typeof topic[0] == 'string') {
        this.add.apply(this, [name].concat(topic))
      } else {
        for(var i = 0, l = topic.length; i < l; i++) {
          this.add.apply(this, [name].concat(topic[i]))
        }
      }
    }
  } else {
    if(typeof fn == 'string') {
      next = fn
      fn = null
    }
    this.transitions[event] = this.transitions[event] || {}
    this.transitions[event][state] = [fn, next]
  }
  return this
}


/**
 * Emit event and apply transition.
 *
 * @param  {String} name
 * @api public
 */

Mood.prototype.emit = function(name) {
  var transition = this.transitions[name]
  if(transition) {
    var state = transition[this.current]
    if(state) {
      var fn = state[0]
      fn && fn.apply(null, [].slice.call(arguments, 1))
      this.current = state[1] || this.current
    }
  }
  emit.apply(this, arguments)
  return this
}


/**
 * Curry event and apply transition on call.
 *
 * @param  {String} name
 * @return {Function}
 * @api public
 */

Mood.prototype.dispatch = function(name) {
  var that = this
  var send = that.emit.bind(that, name)
  return function() {
    send.apply(that, [].slice.call(arguments))
  }
}
