'use strict';

var test = require('tape');

var decode = require('./decode.js');

test('Apple input', function (t) {
  t.equal(decode('apple', 1), 'zookd');
  t.end();
});

// test('Invalid char', function (t) {
//   t.equal(decode('&|%', 1), Error);
//   t.end();
// });
