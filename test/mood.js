/**
 * Test dependencies.
 */

var test = require('tape')
var mood = require('..')

test('should be an emitter', assert => {
  assert.plan(4)
  var states = mood()
  assert.equal(typeof states.on, 'function')
  assert.equal(typeof states.off, 'function')
  assert.equal(typeof states.once, 'function')
  assert.equal(typeof states.emit, 'function')
})


test('current state should be empty by default', assert => {
  assert.plan(1)
  var states = mood()
  assert.equal(states.current, '')
})


test('it should initialize current state', assert => {
  assert.plan(1)
  var states = mood('open')
  assert.equal(states.current, 'open')
})


test('it should add a transition', assert => {
  assert.plan(1)
  var locked = false
  var states = mood('open')
  states.add('open', 'lock', function() {
    locked = true
  }, 'locked')
  states.emit('lock')
  assert.equal(locked, true)
})

test('it should changed current state when transition added', assert => {
  assert.plan(1)
  var states = mood('open')
  states.add('open', 'lock', function() {}, 'locked')
  states.emit('lock')
  assert.equal(states.current, 'locked')
})



//
//
// describe("Add transition", function() {
//   var mood;
//   beforeEach(function() {
//     mood = states('open');
//   });
//
//
//   it("should set current state", function() {
//     mood.add('open', 'lock', function(){}, 'locked');
//     mood.emit('lock');
//     assert.equal(mood.current, 'locked');
//   });
//
//   it('should not change current state', function() {
//     mood.add('open', 'lock', function(){});
//     mood.emit('lock');
//     assert.equal(mood.current, 'open');
//   });
//
//   it('should always change state', function() {
//     mood.add('open', 'lock', null, 'locked');
//     mood.emit('lock');
//     assert.equal(mood.current, 'locked');
//   });
//
//   it('should perform transition without callback', function() {
//     mood.add('open', 'lock', 'locked');
//     mood.emit('lock');
//     assert.equal(mood.current, 'locked');
//   });
//
//   it('should be a regular emit', function(done) {
//     mood.on('lock', function() {
//       done();
//     });
//     mood.add('open', 'lock', 'locked');
//     mood.emit('lock');
//   });
//
//   it('should pass data', function(done) {
//     mood.add('open', 'lock', function(hello, world){
//       if(hello === 'hello' && world === 'world') done();
//     }, 'locked');
//     mood.emit('lock', 'hello', 'world');
//   });
//
// });
