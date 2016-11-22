# Mood

[![Build Status](https://travis-ci.org/bredele/mood.svg?branch=master)](https://travis-ci.org/bredele/mood)
[![NPM](https://img.shields.io/npm/v/mood.svg)](https://www.npmjs.com/package/mood)
[![Downloads](https://img.shields.io/npm/dm/mood.svg)](http://npm-stat.com/charts.html?package=mood)
[![pledge](https://bredele.github.io/contributing-guide/community-pledge.svg)](https://github.com/bredele/contributing-guide/blob/master/guidelines.md)

Mood is an elegant [state machine](https://en.wikipedia.org/wiki/Finite-state_machine#Concepts_and_terminology) you can use to model large number of problems, among which are UI state management, communication protocol design, language parsing, artificial intelligence and other engineering applications.

* **Finite state machine**: Use mood to perform predetermined sequence of actions depending on a sequence of events with which they are presented.
* **Event emitter**: Mood is based on the [event emitter](http://github.com/component/emitter) pattern that is widely used in the browser and nodejs. Mood is well tested and can be used with nodejs processes, streams and way more.

[Try it online!](http://requirebin.com/?code=79074d59c1525895625c)

## Usage

```js
import mood from 'mood'

const door = mood('open', {
  'open' :
    ['lock', () => {
      // do something when the current state is 'open'
      // and on the 'lock' event
    },'locked'],
  'locked': [
    ['close', 'closed'],
    ['break', () => {
      // do something when the current state is 'locked'
      // and on the 'break' event
    }, 'open']
  ]
})

door.emit('lock')
door.emit('break')
```

Check out our [API](/test) for more information.

## Installation

```shell
npm install mood --save
```

[![NPM](https://nodei.co/npm/mood.png)](https://nodei.co/npm/mood/)


## Question

For questions and feedback please use our [twitter account](https://twitter.com/bredeleca). For support, bug reports and or feature requests please make sure to read our
<a href="https://github.com/bredele/contributing-guide/blob/master/guidelines.md" target="_blank">community guideline</a> and use the issue list of this repo and make sure it's not present yet in our reporting checklist.

## Contribution

Mood is an open source project and would not exist without its community. If you want to participate please make sure to read our <a href="https://github.com/bredele/contributing-guide/blob/master/guidelines.md" target="_blank">guideline</a> before making a pull request. If you have any mood-related project, component or other let everyone know in our wiki.

## License

The MIT License (MIT)

Copyright (c) 2016 Olivier Wietrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
