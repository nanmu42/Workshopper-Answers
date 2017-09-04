/**
 * 2017-9-4 13:43:14
 *
 * Write tests that output TAP, that tests the following properties of a function
 * fancify. The function will be provided in process.argv[2].
 *
 * 1 fancify(str) returns the str wrapped in ~*~
 * Example: fancify('Hello') returns ~*~Hello~*~
 * 2 It takes an optional second argument that converts the string into ALLCAPS
 * Example: fancify('Hello', true) returns ~*~HELLO~*~
 * 3 It takes a third optional argument that determines the character in the middle
 * Example: fancify('Hello', false, '!') returns ~!~Hello~!~
 * */

let moduleLocation = process.argv[2];

const fancify = require(moduleLocation);
const tape = require('tape');

tape('Function fancify should work', (t) => {
  t.equal(fancify('Hello'), '~*~Hello~*~', 'Word properly wrapped.');
  t.equal(fancify('Hello', true), '~*~HELLO~*~', 'Word optionally capitalized.');
  t.equal(fancify('Hello', false, '!'), '~!~Hello~!~', 'Character optionally set.');
  t.end(null);
});
