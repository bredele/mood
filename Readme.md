# Mood

  > Give some mood to your code.

 Finite state machine based on [emitter](http://github.com/component/emitter).

## Installation

 Install with [component](http://component.io):

    $ component install bredele/mood

 Install with [nodejs](http://nodejs.org):

    $ npm install mood

 Standalone:

```html
<script src="mood.js"></script>
```

## API

Create a finite state machine with an initial state and add optional transitions : 

```js
var states = require('mood');
var mood = states('open', transitions);
```

is the equivalent of:

```js
states('open')
  .add(transitions);
```

 > the current state is available under `mood.current`

### .add(state, event, cb, next)

 Add transition (change from one state to an other triggered by an event) with callback:

```js
mood.add('open','lock', function() {
  //do something
}, 'locked');
```
 or without:

```js
mood.add('open','lock','locked');
```

 Add multiple transitions:

```js
mood.add({
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
mood.emit('lock');
//state is now 'locked'
```

  `mood` inherits from [emitter](http://github.com/component/emitter) and can be used as a regular emitter.


## Note

`states` is part of a collection of asynchronous patterns based on [emitter](http://github.com/component/emitter):
  - **[promise](http://github.com/bredele/promise)**
  - **[doors](http://github.com/bredele/doors)**
  - **[emitter-queue](http://github.com/bredele/emitter-queue)**


## License

  The MIT License (MIT)

  Copyright (c) 2014 <copyright holders>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
