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

describe("Add transition", function() {
	var machine;
	beforeEach(function() {
		machine = states('open');
	});

	it("should add transition", function(done) {
		machine.add('open', 'lock', function() {
			done();
		}, 'locked');
		machine.emit('lock');
	});

	it("should set current state", function() {
		machine.add('open', 'lock', function(){}, 'locked');
		machine.emit('lock');
		assert.equal(machine.current, 'locked');
	});

	it('should not change current state', function() {
		machine.add('open', 'lock', function(){});
		machine.emit('lock');
		assert.equal(machine.current, 'open');
	});

	
});

