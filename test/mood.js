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

//
// test('it should initialize current state', assert => {
//   assert.plan(1)
//   var states = mood('open')
//   assert.equal(states.current, 'open')
// })
//
//
// test('it should initialize current state from a function', assert => {
//   assert.plan(1)
//   var states = mood(() => 'open')
//   assert.equal(states.current, 'open')
// })
//
// test('it should add a transition', assert => {
//   assert.plan(1)
//   var locked = false
//   var states = mood('open')
//   states.add('open', 'lock', function() {
//     locked = true
//   }, 'locked')
//   states.emit('lock')
//   assert.equal(locked, true)
// })
//
// test('it should change current state when transition added', assert => {
//   assert.plan(1)
//   var states = mood('open')
//   states.add('open', 'lock', function() {}, 'locked')
//   states.emit('lock')
//   assert.equal(states.current, 'locked')
// })
//
// test('it should still change state if transition function is undefined or null', assert => {
//   assert.plan(1)
//   var states = mood('open')
//   states.add('open', 'lock', null, 'locked')
//   states.emit('lock')
//   assert.equal(states.current, 'locked')
// })
//
// test('it should still change state if transition function does not exist', assert => {
//   assert.plan(1)
//   var states = mood('open')
//   states.add('open', 'lock', 'locked')
//   states.emit('lock')
//   assert.equal(states.current, 'locked')
// })
//
// test('it should not change current state if not new state passed', assert => {
//   assert.plan(1)
//   var states = mood('open')
//   states.add('open', 'lock', function() {})
//   states.emit('lock')
//   assert.equal(states.current, 'open')
// })
//
// test('it should pass data in the transition callback', assert => {
//   assert.plan(1)
//   var states = mood('open')
//   states.add('open', 'lock', function(data) {
//     assert.equal(data, 'hello world')
//   })
//   states.emit('lock', 'hello world')
// })
//
//
// test('should add multiple transition from the add handler', assert => {
//   assert.plan(6)
//   var cb = function() {}
//   var states = mood('open')
//   states.add({
//     'open' : [
//       ['lock', 'locked'],
//       ['close', 'closed']
//     ],
//     'locked': [
//       ['close', 'closed'],
//       ['break', cb, 'open']
//     ],
//     'closed' : ['knock', 'open']
//   })
//   states.emit('break')
//   assert.equal(states.current, 'open')
//   states.emit('lock')
//   assert.equal(states.current, 'locked')
//   states.emit('open')
//   assert.equal(states.current, 'locked')
//   states.emit('break')
//   assert.equal(states.current, 'open')
//   states.emit('close')
//   assert.equal(states.current, 'closed')
//   states.emit('knock')
//   assert.equal(states.current, 'open')
// })
//
//
// test('should add multiple transition from the constructor', assert => {
//   assert.plan(5)
//   var cb = function() {}
//   var states = mood('open', {
//     'open' : [
//       ['lock', 'locked'],
//       ['close', 'closed']
//     ],
//     'locked': [
//       ['close', 'closed'],
//       ['break', cb, 'open']
//     ]
//   })
//   states.emit('break')
//   assert.equal(states.current, 'open')
//   states.emit('lock')
//   assert.equal(states.current, 'locked')
//   states.emit('open')
//   assert.equal(states.current, 'locked')
//   states.emit('break')
//   assert.equal(states.current, 'open')
//   states.emit('close')
//   assert.equal(states.current, 'closed')
// })
//
// test('should current event', assert => {
//   assert.plan(1)
//   var states = mood('open', {
//     'open' : ['lock', 'locked']
//   })
//   var emit = states.dispatch('lock')
//   emit()
//   assert.equal(states.current, 'locked')
// })
