
/**
 * Dependencies
 * @api private
 */

var Emitter = require('component-emitter');
var emit = Emitter.emit;


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
}

//NOTE: States mixin could be great
Emitter(States.prototype);


States.prototype.add = function(state, event, fn, next) {
	// body...
};