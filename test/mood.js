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
