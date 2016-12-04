/**
 * Test dependencies.
 */

var test = require('tape')
var mood = require('..')


test('it should trigger a state transition with a single condition', assert => {
  assert.plan(1)
  var states = mood('init')
  states.add('init', 'hello', () => assert.pass('simple condition'))
  states.emit('hello')
})

test('it should trigger a state transition with a multiple conditions', assert => {
  assert.plan(1)
  var states = mood('init')
  states.add('init', ['hello', 'world'], () => assert.pass('multiple conditions'))
  states.emit('hello')
  states.emit('hello again')
  states.emit('world')
})
