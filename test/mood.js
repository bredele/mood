/**
 * Test dependencies.
 */

var test = require('tape')
var mood = require('..')

test('shoud initialize state machine with state', assert => {
  assert.plan(1)
  const machine = mood('init')
  assert.equal(machine.state(), 'init')
})

test('should initialize state machine with state map', assert => {
  assert.plan(1)
  const machine = mood({
    'init': [],
    'something': []
  })
  assert.equal(machine.state(), 'init')
})
