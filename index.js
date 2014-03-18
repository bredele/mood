
/**
 * Dependencies
 * @api private
 */

var Emitter = require('component-emitter');
var emit = Emitter.prototype.emit;


/**
 * Expose 'States'
 */

module.exports = States;


/**
 * States constructor.
 * @api public
 */

function States(current, obj) {
  if(!(this instanceof States)) return new States(current, obj);
  this.current = current || '';
  this.transitions = {};
  if(obj) this.add(obj);
}


//NOTE: States mixin could be great
Emitter(States.prototype);


/**
 * Add transition(s).
 * example:
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

States.prototype.add = function(state, event, fn, next) {
	if(typeof state === 'object') {
		for(var name in state) {
			var topic = state[name];
			for(var i = 0, l = topic.length; i < l; i++) {
				this.add.apply(this, [name].concat(topic[i]));
			}
		}
	} else {
		if(typeof fn === 'string') {
			next = fn;
			fn = null;
		}
		this.transitions[event] = this.transitions[event] || {};
		this.transitions[event][state] = [fn, next];
	}
	return this;
};


/**
 * Emit event and apply transition.
 * 
 * @param  {String} name 
 * @api public
 */

States.prototype.emit = function(name) {
	var transition = this.transitions[name];
	if(transition) {
		var state = transition[this.current];
		if(state) {
			var fn = state[0];
			fn && fn.apply(null, [].slice.call(arguments, 1));
			this.current = state[1] || this.current;
		}
	}
	emit.apply(this, arguments);
	return this;
};