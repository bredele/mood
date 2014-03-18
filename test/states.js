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

describe("Intial state", function() {
	it("should be empty by default", function() {
		var machine = states();
		assert.equal(machine.current, '');
	});

	it("should initalize state in constructor", function() {
		var machine = states('open');
		assert.equal(machine.current, 'open');		
	});
	
	
});
