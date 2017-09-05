/**
 * 2017-9-5 11:00:06
 *
 * Implement Array#reduce using recursion.
 *
 * To test your reduction works correctly we will use your reduce implementation to execute our solution to
 * the previous basic_reduce problem. i.e. your reduce function will be passed an array of words,
 * and a function, and an initial value which will return an object containing the counts for
 * each word found in the array. You don't need to implement this functionality,
 * it will be supplied to your reduce implementation.
 *
 * For simplicity, your implementation of reduce need not replicate the behaviour of
 * a reduce missing an initial value. You may assume the initial value will always be supplied.
 *
 * */

/**
 * 一个很简陋的reduce
 * 正宗的在这里：
 * @link https://tc39.github.io/ecma262/#sec-array.prototype.slice
 * */
function reduce(inputArray: any[], fn: (prev: any, curr: any, index: number, arrSelf: any[]) => any, initial: any): any {

  let prev = initial;
  (reduce as any).index = (reduce as any).index || 0;

  // 结束条件
  if (inputArray.length <= (reduce as any).index) {
    return prev;
  }

  prev = fn(prev, inputArray[ (reduce as any).index ], (reduce as any).index, inputArray);
  (reduce as any).index++;

  return reduce(inputArray, fn, prev);
}

module.exports = reduce;
