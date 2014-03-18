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

  it('should always change state', function() {
    machine.add('open', 'lock', null, 'locked');
    machine.emit('lock');
    assert.equal(machine.current, 'locked');
  });

  it('should perform transition without callback', function() {
    machine.add('open', 'lock', 'locked');
    machine.emit('lock');
    assert.equal(machine.current, 'locked');
  });

  it('should be a regular emit', function(done) {
    machine.on('lock', function() {
      done();
    });
    machine.add('open', 'lock', 'locked');
    machine.emit('lock');
  });

  it('should pass data', function(done) {
    machine.add('open', 'lock', function(hello, world){
      if(hello === 'hello' && world === 'world') done();
    }, 'locked');
    machine.emit('lock', 'hello', 'world');
  });
  
});

describe("Add transitions", function() {
  var machine, fn;
  beforeEach(function() {
    fn = function(){};
    machine = states('open');
    machine.add({
      'open' : [
        ['lock', fn, 'locked'],
        ['close', fn, 'closed']
      ],
      'locked': [
        ['close', 'closed'],
        ['break', 'open']
      ]
    });
  });

  it("should add multiple transitions", function() {
    machine.emit('break');
    assert.equal(machine.current, 'open');
    machine.emit('lock');
    assert.equal(machine.current, 'locked');
    machine.emit('open');
    assert.equal(machine.current, 'locked');
    machine.emit('break');
    assert.equal(machine.current, 'open');
    machine.emit('close');
    assert.equal(machine.current, 'closed');
  });

  it('should add transitions from constructor', function() {
    var machine = states('open', {
      'open' : [
        ['lock', fn, 'locked'],
        ['close', fn, 'closed']
      ],
      'locked': [
        ['close', 'closed'],
        ['break', 'open']
      ]
    });
    machine.emit('break');
    assert.equal(machine.current, 'open');
    machine.emit('lock');
    assert.equal(machine.current, 'locked');
    machine.emit('open');
    assert.equal(machine.current, 'locked');
    machine.emit('break');
    assert.equal(machine.current, 'open');
    machine.emit('close');
    assert.equal(machine.current, 'closed');
  });
});


