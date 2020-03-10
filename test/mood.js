/**
 * Test dependencies.
 */

var test = require('tape')
var mood = require('..')

test('initialize state machine with state', assert => {
  assert.plan(1)
  const machine = mood('init')
  assert.equal(machine.state(), 'init')
})

test('initialize state machine with state resolution map', assert => {
  assert.plan(1)
  const machine = mood({
    'init': [],
    'something': []
  })
  assert.equal(machine.state(), 'init')
})

/**
 * Without condition
 */

test('execution transition without condition', assert => {
  assert.plan(1)
  const machine = mood({
    'before': [function () {
      assert.ok('executed')
    }]
  })
})

test('execute transition and does not change current state', assert => {
  assert.plan(2)
  const machine = mood({
    'before': [function () {
      assert.ok('executed')
    }]
  })
  setTimeout(() => {
    assert.equal(machine.state(), 'before')
  }, 30)
})

test(`transition to 'resolution' state`, assert => {
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

test('pass transition result to next state', assert => {
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

test('resolve transition and pass result to resolution state', assert => {
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

test(`transition to 'rejection' state`, assert => {
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

test('reject transition and does not change current state', assert => {
  assert.plan(2)
  const machine = mood({
    'before': [function () {
      assert.ok('executed')
      return Promise.reject('something')
    }, 'resolved']
  })
  setTimeout(() => {
    assert.equal(machine.state(), 'before')
  }, 30)
})

test('reject transition and pass result to rejected state', assert => {
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

/**
 * With condition
 */

test('transition with condition', assert => {
  assert.plan(1)
  const machine = mood({
    'before': ['condition', function () {
      assert.ok('executed')
    }]
  })
  machine.trigger('condition')
})

test('execute transition with condition and does not change current state', assert => {
  assert.plan(3)
  let i = 0
  const machine = mood({
    'before': ['condition', function () {
      assert.equal(i++, 0)
    }]
  })
  machine.trigger('condition').then(state => {
    assert.equal(i, 1)
    assert.equal(state, 'before')
  })
})

test(`transition to 'resolution' state with condition`, assert => {
  assert.plan(1)
  const machine = mood({
    'before': ['condition', function () {
      return 'something'
    }, 'resolved']
  })
  machine.trigger('condition').then(state => {
    assert.equal(state, 'resolved')
  })
})

test('pass arguments to the transition function', assert => {
  assert.plan(1)
  const machine = mood({
    'before': ['condition', function (arg) {
      assert.equal(arg, 'something')
    }]
  })
  machine.trigger('condition', 'something')
})

test(`transition to 'resolution' state with condition and only once transition is resolved`, assert => {
  assert.plan(1)
  const machine = mood({
    'before': ['condition', function () {
      return new Promise(resolve => setTimeout(resolve, 30))
    }, 'resolved']
  })
  machine.trigger('condition').then(state => {
    assert.equal(state, 'resolved')
  })
})
//
// test(`transition to 'rejection' state`, assert => {
//   assert.plan(1)
//   const machine = mood({
//     'before': [function () {
//       return Promise.reject('something')
//     }, 'resolved', 'rejected'],
//     'resolved': [function (arg) {
//       assert.fail('should not be after')
//     }],
//     'rejected': [function (arg) {
//       assert.ok('resjected state')
//     }]
//   })
// })
//
// test('reject transition and does not change current state', assert => {
//   assert.plan(2)
//   const machine = mood({
//     'before': [function () {
//       assert.ok('executed')
//       return Promise.reject('something')
//     }, 'resolved']
//   })
//   setTimeout(() => {
//     assert.equal(machine.state(), 'before')
//   }, 30)
// })
//
// test('reject transition and pass result to rejected state', assert => {
//   assert.plan(1)
//   const machine = mood({
//     'before': [function () {
//       return Promise.reject('something')
//     }, 'resolved', 'rejected'],
//     'rejected': [function (arg) {
//       assert.equal(arg, 'something')
//     }]
//   })
// })


// do this test after trigger (based on parameters passed)
// test('dynamic state resolution', assert => {
//   assert.plan(2)
//   const machine = mood({
//     'before': [function () {
//       return 'something'
//     }, 'success'],
//     'success': [function () {
//       assert.ok('success')
//     }]
//   })
// })
