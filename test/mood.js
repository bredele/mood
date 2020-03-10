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

test('should have resolved state', assert => {
  assert.plan(2)
  const machine = mood({
    'before': [function () {
      return 'something'
    }, 'resolved'],
    'resolved': [function () {
      assert.ok('executed')
      // @note should speify in documentation that should use this. to avoid initialization issues
      assert.equal(this.state(), 'resolved')
    }]
  })
})

test('should have resolved state and pass the returned value of the transition function', assert => {
  assert.plan(1)
  const machine = mood({
    'before': [function () {
      return 'something'
    }, 'resolved'],
    'resolved': [function (arg) {
      assert.equal(arg, 'something')
    }]
  })
})

test('should have resolved state and resolve transitions as promises', assert => {
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

test('should have rejection state', assert => {
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

test('should reject transition', assert => {
  assert.plan(1)
  const machine = mood({
    'before': [function () {
      return Promise.reject('something')
    }, 'resolved']
  })
  setTimeout(() => {
    assert.equal(machine.state(), 'before')
  }, 30)
})

test('should have rejection state and and reject transitions as promises', assert => {
  assert.plan(1)
  const machine = mood({
    'before': [function () {
      return Promise.reject('something')
    }, 'resolved', 'rejected'],
    'rejected': [function (arg) {
      assert.equal(arg, 'something')
    }]
  })
})
