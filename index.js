
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

function States(current) {
  if(!(this instanceof States)) return new States(current);
  this.current = current || '';
  this.transitions = {};
}

//NOTE: States mixin could be great
Emitter(States.prototype);


States.prototype.add = function(state, event, fn, next) {
	if(typeof fn === 'string') {
		next = fn;
		fn = null;
	}
	this.transitions[event] = {};
	this.transitions[event][state] = [fn, next];
};

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
};