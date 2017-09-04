/**
 * 2017-9-4 18:05:04
 *
 * Implement a function that takes a function as its first argument, a number num as its second argument,
 * then executes the passed in function num times.
 * */

function repeat(operation: () => void, num: number) {
  while (num-- > 0) {
    operation();
  }
}

module.exports = repeat;
