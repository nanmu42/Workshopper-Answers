/**
 * 2017-9-4 15:18:22
 *
 * A function feedCat takes any kind of food as a String argument and returns
 * 'yum' for everything you feed them. However if you try to feed the cat
 * 'chocolate', the function will throw an error.
 *
 * Write tests for feedCat to be sure kittens can be fed yummy food without
 * being harmed.
 *
 * The function will be provided through process.argv[2].
 * */

let moduleLocation = process.argv[ 2 ];

const tape = require('tape');
const feedCat = require(moduleLocation);

tape('Cat should be safe and happy', (t) => {
  t.doesNotThrow(() => {
    feedCat('fish');
  }, 'cat should not be alarmed.');

  t.equal(feedCat('fish'), 'yum', 'cat should be happy.');

  t.throws(() => {
    feedCat('chocolate');
  }, 'run cat! run!');

  t.end(null);
});
