/**
 * Dependencies.
 */

var gobs = require('gobs')


module.exports = function(state) {
  var store = {}
  var that = {
    current: state,
    add: function(before, conditions, transition, after) {
      var clone = conditions.slice(0)
      var arr = store[before] = (store[before] || [])
      arr.push(gobs([].concat(conditions), function() {
        transition.apply(null, arguments)
        that.current = after
        conditions.concat(clone)
      }))
    },

    emit: function() {
      var transition = store[that.current][0]
      transition.apply(null, arguments)
    }
  }
  return that
}
