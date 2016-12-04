/**
 * Dependencies.
 */

var gobs = require('gobs')


module.exports = function(state) {
  var that = {
    current: state
  }

  var store = {}

  var add = function(before, conditions, transition, after) {
    if(typeof transition == 'string') {
      after = transition
      transition = null
    }
    var states = store[before] = (store[before] || [])
    var arr = [].concat(conditions)
    var clone = arr.slice(0)
    states.push(gobs(arr, function() {
      clone.map(function(item) {
        arr.push(item)
      })
      transition && transition.apply(null, arguments)
      that.current = after || that.current
    }))
  }

  that.add = function(before, conditions, transition, after) {
    if(typeof before == 'object') {
      for(var name in before) {
        add.apply(null, [name].concat(before[name]))
      }
    } else add.apply(null, arguments)
  }

  that.emit = function() {
    var transition = store[that.current][0]
    transition.apply(null, arguments)
  }
  return that
}
