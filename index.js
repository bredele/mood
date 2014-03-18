
/**
 * Expose 'States'
 */

module.exports = States;


/**
 * States constructor.
 * @api public
 */

function States() {
  if(!(this instanceof States)) return new States();
}

require('component-emitter')(States.prototype);

States.prototype.add = function() {
	// body...
};