var states = require('..'),
		assert = require('assert');

describe("API", function() {
	var machine;
	beforeEach(function() {
		machine = states();
	});
	
	it("should inherit from emitter", function() {
		assert(machine.on);
		assert(machine.once);
		assert(machine.emit);
		assert(machine.off);		
	});

	it("should have a add handler", function() {
		assert(machine.add);
	});
	
	
});
