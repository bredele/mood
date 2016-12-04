/**
 * Test dependencies.
 */

var test = require('tape')
var mood = require('..')


test('it should add a state', assert => {
  assert.plan(1)
  var states = mood('init')
  states.add('init', 'hello', () => assert.pass())
  states.emit('hello')
})
