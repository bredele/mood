var states = require('..'),
    assert = require('assert');

describe("API", function() {
  var mood;
  beforeEach(function() {
    mood = states();
  });
  
  it("should inherit from emitter", function() {
    assert(mood.on);
    assert(mood.once);
    assert(mood.emit);
    assert(mood.off); 
  });

  it("should have a add handler", function() {
    assert(mood.add);
  });
  
});

describe("Intial state", function() {
  it("should be empty by default", function() {
    var mood = states();
    assert.equal(mood.current, '');
  });

  it("should initalize state in constructor", function() {
    var mood = states('open');
    assert.equal(mood.current, 'open');    
  });
  
});

describe("Add transition", function() {
  var mood;
  beforeEach(function() {
    mood = states('open');
  });

  it("should add transition", function(done) {
    mood.add('open', 'lock', function() {
      done();
    }, 'locked');
    mood.emit('lock');
  });

  it("should set current state", function() {
    mood.add('open', 'lock', function(){}, 'locked');
    mood.emit('lock');
    assert.equal(mood.current, 'locked');
  });

  it('should not change current state', function() {
    mood.add('open', 'lock', function(){});
    mood.emit('lock');
    assert.equal(mood.current, 'open');
  });

  it('should always change state', function() {
    mood.add('open', 'lock', null, 'locked');
    mood.emit('lock');
    assert.equal(mood.current, 'locked');
  });

  it('should perform transition without callback', function() {
    mood.add('open', 'lock', 'locked');
    mood.emit('lock');
    assert.equal(mood.current, 'locked');
  });

  it('should be a regular emit', function(done) {
    mood.on('lock', function() {
      done();
    });
    mood.add('open', 'lock', 'locked');
    mood.emit('lock');
  });

  it('should pass data', function(done) {
    mood.add('open', 'lock', function(hello, world){
      if(hello === 'hello' && world === 'world') done();
    }, 'locked');
    mood.emit('lock', 'hello', 'world');
  });
  
});

describe("Add transitions", function() {
  var mood, fn;
  beforeEach(function() {
    fn = function(){};
    mood = states('open');
    mood.add({
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
    mood.emit('break');
    assert.equal(mood.current, 'open');
    mood.emit('lock');
    assert.equal(mood.current, 'locked');
    mood.emit('open');
    assert.equal(mood.current, 'locked');
    mood.emit('break');
    assert.equal(mood.current, 'open');
    mood.emit('close');
    assert.equal(mood.current, 'closed');
  });

  it('should add transitions from constructor', function() {
    var mood = states('open', {
      'open' : [
        ['lock', fn, 'locked'],
        ['close', fn, 'closed']
      ],
      'locked': [
        ['close', 'closed'],
        ['break', 'open']
      ]
    });
    mood.emit('break');
    assert.equal(mood.current, 'open');
    mood.emit('lock');
    assert.equal(mood.current, 'locked');
    mood.emit('open');
    assert.equal(mood.current, 'locked');
    mood.emit('break');
    assert.equal(mood.current, 'open');
    mood.emit('close');
    assert.equal(mood.current, 'closed');
  });
});


