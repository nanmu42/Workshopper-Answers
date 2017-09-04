/**
 * 2017-9-4 13:39:23
 *
 * Write a passing assertion for the function isCoolNumber, that will assure that
 * it returns true when passing 42 in it.
 *
 * The path of the module exporting the function will be provided through
 * process.argv[2].
 * */
let moduleLocation = process.argv[2];

const assert = require('assert');
const isCoolNumber = require(moduleLocation);

assert.strictEqual(isCoolNumber(42), true, 'Input 42 should yield boolean true.');
