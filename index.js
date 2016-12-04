/**
 * Dependencies.
 */

var gobs = require('gobs')


module.exports = function(state) {
  var store = {}
  return {
    add: function(before, conditions, transition, after) {
      var clone = conditions.slice(0)
      var arr = store[before] = (store[before] || [])
      arr.push(gobs([].concat(conditions), function() {
        transition.apply(null, arguments)
        state = after
        conditions.concat(clone)
      }))
    },

    emit: function() {
      var transition = store[state][0]
      transition.apply(null, arguments)
    }
  }
}
