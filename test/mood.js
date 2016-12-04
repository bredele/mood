/**
 * Test dependencies.
 */

var test = require('tape')
var mood = require('..')

test('it should initialize current state', assert => {
  assert.plan(1)
  var states = mood('open')
  assert.equal(states.current, 'open')
})


test('triggers a state transition with a single condition', assert => {
  assert.plan(1)
  var states = mood('init')
  states.add('init', 'hello', () => assert.pass('simple condition'))
  states.emit('hello')
})


test('it should not change current state if transition state does not exist', assert => {
  assert.plan(3)
  var states = mood('open')
  states.add('open', 'lock', () => assert.pass('transition called'))
  states.emit('lock')
  assert.equal(states.current, 'open')
  states.emit('lock')
})

test('it should still change state if transition function is undefined or null', assert => {
  assert.plan(1)
  var states = mood('open')
  states.add('open', 'lock', null, 'locked')
  states.emit('lock')
  assert.equal(states.current, 'locked')
})


test('triggers a transition and change current state', assert => {
  assert.plan(1)
  var states = mood('init')
  states.add('init', 'hello', function() {

  }, 'world')
  states.emit('hello')
  assert.equal(states.current, 'world')
})

test('triggers a state transition with a multiple conditions', assert => {
  assert.plan(3)
  var states = mood('init')
  states.add('init', ['hello', 'world'], () => assert.pass('multiple conditions'), 'world')
  states.emit('hello')
  states.emit('hello again')
  assert.equal(states.current, 'init')
  states.emit('world')
  assert.equal(states.current, 'world')
})

test('transition callback is optional', assert => {
  assert.plan(1)
  var states = mood('init')
  states.add('init', 'hello', 'world')
  states.emit('hello')
  assert.equal(states.current, 'world')
})

test('add multiple transitions with single condition', assert => {
  assert.plan(1)
  var states = mood('init')
  states.add({
    'init': ['hello', 'world'],
    'world': ['welcome', () => assert.pass('add multiple states')]
  })
  states.emit('hello')
  states.emit('welcome')
})

test('add multiple transitions with multiple conditions', assert => {
  assert.plan(3)
  var states = mood('init')
  states.add({
    'init': [['hello', 'ola'], 'world'],
    'world': [['welcome', 'welcome'], () => assert.pass('add multiple states')]
  })
  states.emit('hello')
  states.emit('welcome')
  assert.equal(states.current, 'init')
  states.emit('ola')
  assert.equal(states.current, 'world')
  states.emit('welcome')
  states.emit('welcome')
})

test('should reset conditions', assert => {
  assert.plan(4)
  var states = mood('init')
  states.add({
    'init': [['hello', 'ola'], 'world'],
    'world': ['welcome', 'init']
  })
  states.emit('hello')
  states.emit('ola')
  assert.equal(states.current, 'world')
  states.emit('welcome')
  assert.equal(states.current, 'init')
  console.log('conditions should be reseted')
  states.emit('hello')
  assert.equal(states.current, 'init')
  states.emit('ola')
  assert.equal(states.current, 'world')
})
