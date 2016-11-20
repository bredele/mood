# API

## constructor

Create a finite state machine with an initial state and add optional transitions:

```js
var mood = require('mood');
var states = mood('open', transitions);
```

is the equivalent of:

```js
mood('open')
  .add(transitions);
```

 > the current state is available under `mood.current`

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


## Notes

`states` is part of a collection of asynchronous patterns based on [emitter](http://github.com/component/emitter):
  - **[promise](http://github.com/bredele/promise)**
  - **[doors](http://github.com/bredele/doors)**
  - **[emitter-queue](http://github.com/bredele/emitter-queue)**
