
<p align="center">
  <img src="https://github.com/bredele/mood/blob/master/mood.png" width="200" height="200" alt="mitt">
  <br>
  <a href="https://www.npmjs.org/package/mood"><img src="https://img.shields.io/npm/v/mood.svg?style=flat" alt="npm"></a>
  <a href="https://travis-ci.org/bredele/mood"><img src="https://travis-ci.org/bredele/mood.svg?branch=master" alt="travis"></a>
  <a href="https://david-dm.org/bredele/mood"><img src="https://david-dm.org/bredele/mood/status.svg" alt="dependencies Status"></a>
  <a href='https://github.com/bredele/contributing-guide/blob/master/guidelines.m'><img src="https://bredele.github.io/contributing-guide/community-pledge.svg"></a>
</p>


# Mood

Mood is an elegant [state machine](https://en.wikipedia.org/wiki/Finite-state_machine#Concepts_and_terminology) you can use to model large number of problems, among which are UI state management, communication protocol design, language parsing, artificial intelligence and other engineering applications.

  - **Finite state machine**: Use mood to perform predetermined sequence of actions depending on a sequence of events with which they are presented.
  - **Asynchronous**:  Mood plays well with your favourite libraries and use promises to transition from one state to an other.


## Usage

```js
import mood from 'mood'

// add transitions from constructor
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

// add new transition
// if transition returns promise, wait for promise to be resolved to trigger state change
door.add('closed', 'knock', function () {
  return new Promise(resolve => setTimeout(resolve, 1000))
}, 'open')

// trigger open-lock transition
door.trigger('lock')

// trigger locked-break transition
door.trigger('break').then(state => {
  // do something with new state
})
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
