/**
 * 2017-9-4 18:58:06
 *
 * Given an Array of strings, use Array#reduce to create an object that
 * contains the number of times each string occured in the array.
 * Return the object directly (no need to console.log).
 * */

function countWords(inputWords: string[]) {
  return inputWords.reduce((previousValue, currentValue) => {
    previousValue[ currentValue ] = ++previousValue[ currentValue ] || 1;
    return previousValue;
  }, {} as any)
}

module.exports = countWords;
