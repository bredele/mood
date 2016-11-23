# Mood tests

Run the tests and get a better appreciation of the following API:

```shell
# run mood tests
$ npm test
```

## constructor

Create a finite state machine with an initial state and add optional transitions:

```js
var mood = require('mood');
var states = mood('open', transitions);
```

is the equivalent of:

```js
mood('open').add(transitions);
```

 > the current state is available under `mood.current`

You also can initialize a state machine with a function as following:

```js
mood(function() {
  // do something
  return 'open'
})
```

### .add(state, event, cb, next)

 Add transition (change from one state to an other triggered by an event) with callback:

```js
states.add('open','lock', function() {
  //do something
}, 'locked');
```
 or without:

```js
states.add('open','lock','locked');
```

 Add multiple transitions:

```js
states.add({
  'open' : [
    ['lock', fn, 'locked'],
    ['close', fn, 'closed']
  ],
  'locked': [
    ['close', 'closed'],
    ['break', 'open']
  ]
});
```

### .emit(event, ...)

  Emit an event and trigger a transition  as following:

```js
states.emit('lock');
//state is now 'locked'
```

  `mood` inherits from [emitter](http://github.com/component/emitter) and can be used as a regular emitter.


### .dispatch(event)

Curry emit and return a function that once called trigger a transition:

```js
var states = mood('open', {
  'open' : ['lock', 'locked']
})
var lock = states.dispatch('lock')
lock()
```

## Notes

`states` is part of a collection of asynchronous patterns based on [emitter](http://github.com/component/emitter):
  - **[doors](http://github.com/bredele/doors)**
  - **[emitter-queue](http://github.com/bredele/emitter-queue)**
