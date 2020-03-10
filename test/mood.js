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

test('should add state entry transition', assert => {
  assert.plan(1)
  const machine = mood({
    'before': [function () {
      assert.ok('executed')
    }]
  })
})

test('should add state entry transition and transition state', assert => {
  assert.plan(2)
  const machine = mood({
    'before': [function () {
      return 'something'
    }, 'after'],
    'after': [function () {
      assert.ok('executed')
      // @note should speify in documentation that should use this. to avoid initialization issues
      assert.equal(this.state(), 'after')
    }]
  })
})

test('should pass transition result to the next state', assert => {
  assert.plan(1)
  const machine = mood({
    'before': [function () {
      return 'something'
    }, 'after'],
    'after': [function (arg) {
      assert.equal(arg, 'something')
    }]
  })
})

test('should resolve transition and pass value to the next state', assert => {
  assert.plan(1)
  const machine = mood({
    'before': [function () {
      return Promise.resolve('something')
    }, 'resolved'],
    'resolved': [function (arg) {
      assert.equal(arg, 'something')
    }]
  })
})

test('should reject transition and transition to rejection state', assert => {
  assert.plan(1)
  const machine = mood({
    'before': [function () {
      return Promise.reject('something')
    }, 'resolved', 'rejected'],
    'resolved': [function (arg) {
      assert.fail('should not be after')
    }],
    'rejected': [function (arg) {
      assert.ok('resjected state')
    }]
  })
})
