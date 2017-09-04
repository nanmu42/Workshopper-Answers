/**
 * 2017-9-4 14:35:01
 *
 * Write a test for a function repeatCallback(n, cb), that calls the callback
 * cb exactly n times. n can be any number you want in your test code.
 *
 * As before the functions location will be provided through process.argv[2].
 * */

let moduleLocation = process.argv[ 2 ];

const tape = require('tape');
const repeatCallback = require(moduleLocation);

tape('repeatCallback should work.', (t) => {
  t.plan(3);
  process.nextTick(() => {
    repeatCallback(3, () => {
      t.pass('Callback called for once.');
    });
  });
});
